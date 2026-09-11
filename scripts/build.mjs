// Full production build for Zephgain:
//
//   1. `vite build`          -> client bundle in dist/ (hashed assets, empty
//                               #root, homepage-default head)
//   2. `vite build --ssr`    -> compiles scripts/prerender-entry.jsx (JSX +
//                               React) into .ssr-dist/, so Node can render
//   3. prerender             -> renderRoute(route) -> static HTML for every
//                               route; each route's full HTML document is
//                               written with a baked head (per-route
//                               title/description/keywords/robots/canonical/
//                               Open Graph/Twitter + JSON-LD from src/data/seo.js)
//                               and an inlined <style> (no render-blocking CSS).
//   4. outputs               -> dist/index.html (home),
//                               dist/<route>/index.html per content route,
//                               dist/404.html (noindex; no canonical)
//
// Every head tag mirrors what <Seo/> sets at runtime, so a hydrated page's
// head is identical to what the server shipped.
import { execSync } from 'node:child_process'
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { seo, OG_IMAGE } from '../src/data/seo.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(ROOT, 'dist')
const assetsDir = path.join(dist, 'assets')
const ssrDir = path.join(ROOT, '.ssr-dist')
const SITE = 'https://zephgain-au.com'

const escA = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escT = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Per-route output file, keyed the same way seo.js is keyed.
const OUTPUT = {
  home: 'index.html',
  about: 'about/index.html',
  contact: 'contact/index.html',
  terms: 'terms/index.html',
  privacy: 'privacy/index.html',
  disclosure: 'disclosure/index.html',
  'thank-you': 'thank-you/index.html',
  'zephgain-review': 'zephgain-review/index.html',
  faq: 'faq/index.html',
  'zephgain-app': 'zephgain-app/index.html',
  404: '404.html',
}

// Build the per-route <title>/meta/canonical/OG/Twitter block - mirrors
// Seo.jsx field-for-field (og:url falls back to SITE + '/', e.g. the 404).
function headMeta(conf) {
  const L = []
  L.push(`    <title>${escT(conf.title)}</title>`)
  L.push(`    <meta name="description" content="${escA(conf.description)}" />`)
  if (conf.keywords) L.push(`    <meta name="keywords" content="${escA(conf.keywords)}" />`)
  L.push(`    <meta name="robots" content="${escA(conf.robots)}" />`)
  if (conf.canonical) L.push(`    <link rel="canonical" href="${escA(conf.canonical)}" />`)

  const og = {
    'og:site_name': 'Zephgain',
    'og:title': conf.title,
    'og:description': conf.description,
    'og:url': conf.canonical || `${SITE}/`,
    'og:image': OG_IMAGE,
    'og:image:alt': conf.ogImageAlt,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:type': 'image/png',
    'og:type': conf.type || 'website',
    'og:locale': 'en_AU',
  }
  for (const [k, v] of Object.entries(og)) {
    L.push(`    <meta property="${k}" content="${escA(v)}" />`)
  }

  const tw = {
    'twitter:card': 'summary_large_image',
    'twitter:title': conf.title,
    'twitter:description': conf.description,
    'twitter:image': OG_IMAGE,
  }
  for (const [k, v] of Object.entries(tw)) {
    L.push(`    <meta name="${k}" content="${escA(v)}" />`)
  }
  return L.join('\n')
}

function jsonLd(conf) {
  // Same data-seo-jsonld marker + JSON.stringify output as Seo.jsx, with <
  // escaped so the script content survives HTML parsing intact.
  return (conf.schema || [])
    .map(
      (data) =>
        `    <script type="application/ld+json" data-seo-jsonld="true">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`,
    )
    .join('\n')
}

function docFor(prefix, staticHead, style, moduleTag, body, conf) {
  const meta = headMeta(conf)
  const ld = jsonLd(conf)
  return `${prefix}
${staticHead.trimEnd()}
${meta}
${ld ? `${ld}\n` : ''}    <style>
${style}
    </style>
    ${moduleTag}
  </head>
  <body>
    <div id="root">${body}</div>
  </body>
</html>
`
}

function log(step, msg) {
  console.log(`[build] ${step} - ${msg}`)
}

// ---------------- 1) client build ----------------
rmSync(dist, { recursive: true, force: true })
log('vite', 'client build…')
execSync('npx vite build', { cwd: ROOT, stdio: 'inherit' })

// ---------------- 2) SSR bundle of the prerender entry ----------------
rmSync(ssrDir, { recursive: true, force: true })
log('vite', 'SSR build of prerender entry…')
execSync('npx vite build --ssr scripts/prerender-entry.jsx --outDir .ssr-dist', {
  cwd: ROOT,
  stdio: 'inherit',
})

// ---------------- 3) render every route to markup ----------------
const ssrFile = readdirSync(ssrDir).find((f) => f.startsWith('prerender-entry') && f.endsWith('.js'))
if (!ssrFile) throw new Error('SSR bundle not found in .ssr-dist')
const { default: prerender } = await import(pathToFileURL(path.join(ssrDir, ssrFile)).href)
const pages = prerender()

// ---------------- 4) assemble full HTML documents ----------------
const tpl = readFileSync(path.join(dist, 'index.html'), 'utf8')
const headOpen = tpl.indexOf('<head>')
const marker = '<!-- Primary metadata'
const headStart = headOpen + '<head>'.length
const staticEnd = tpl.indexOf(marker, headStart)
if (headOpen < 0 || staticEnd < 0) throw new Error('Could not locate <head> / title marker in built index.html')

const prefix = tpl.slice(0, headOpen + '<head>'.length) // doctype + <html> + <head>
const staticHead = tpl.slice(headStart, staticEnd) // charset → gtag (everything before the default metadata)

// Module script emitted by Vite for the hashed client bundle.
const entryMatch = tpl.match(/<script type="module"[^>]*src="([^"]+\.js)"/)
if (!entryMatch) throw new Error('Entry module script not found in built index.html')
const entrySrc = entryMatch[1]
const moduleTag = `<link rel="modulepreload" crossorigin href="${entrySrc}">\n    <script type="module" crossorigin src="${entrySrc}"></script>`

// Single CSS asset gets inlined into every page (then the file is deleted).
const cssFiles = readdirSync(assetsDir).filter((f) => f.endsWith('.css'))
if (cssFiles.length !== 1) {
  throw new Error(`Expected exactly 1 CSS file, found ${cssFiles.length}: ${cssFiles.join(', ')}`)
}
const css = readFileSync(path.join(assetsDir, cssFiles[0]), 'utf8')

let wrote = 0
for (const [route, rel] of Object.entries(OUTPUT)) {
  const conf = seo[route]
  const body = pages[route]
  const html = docFor(prefix, staticHead, css, moduleTag, body, conf)
  const out = path.join(dist, rel)
  mkdirSync(path.dirname(out), { recursive: true })
  writeFileSync(out, html)
  wrote++
}

rmSync(path.join(assetsDir, cssFiles[0]))
rmSync(ssrDir, { recursive: true, force: true })

log('done', `wrote ${wrote} prerendered HTML files (CSS inlined, ${cssFiles[0]} deleted)`)
