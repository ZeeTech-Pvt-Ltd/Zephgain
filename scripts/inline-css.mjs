// Post-build step: inline the single CSS file into index.html so the first
// paint has no render-blocking stylesheet round-trip, and preload the entry
// module so its download starts during HTML parsing.
import { readFileSync, readdirSync, writeFileSync, rmSync } from 'fs'
import path from 'path'

const dist = 'dist'
const assetsDir = path.join(dist, 'assets')
const htmlPath = path.join(dist, 'index.html')

let html = readFileSync(htmlPath, 'utf8')

// 1) Inline CSS (expected: exactly one stylesheet for this app).
const cssFiles = readdirSync(assetsDir).filter((f) => f.endsWith('.css'))
if (cssFiles.length !== 1) {
  console.error(`Expected exactly 1 CSS file, found ${cssFiles.length}: ${cssFiles.join(', ')}`)
  process.exit(1)
}
const cssFile = cssFiles[0]
const css = readFileSync(path.join(assetsDir, cssFile), 'utf8')
const link = `<link rel="stylesheet" crossorigin href="/assets/${cssFile}">`
if (!html.includes(link)) {
  console.error(`Stylesheet link not found in HTML:\n  ${link}`)
  process.exit(1)
}
html = html.replace(link, `<style>\n${css}\n</style>`)
rmSync(path.join(assetsDir, cssFile))
console.log(`Inlined ${cssFile} (${css.length} bytes) into index.html`)

// 2) Preload the entry module (starts the JS download during HTML parsing).
const entry = html.match(/<script type="module" crossorigin src="([^"]+\.js)">/)
if (!entry) {
  console.error('Entry module script not found in HTML')
  process.exit(1)
}
const entryUrl = entry[1]
if (!html.includes(`href="${entryUrl}"`)) {
  html = html.replace(
    /(<link rel="modulepreload"[^>]*>\n?)/,
    `<link rel="modulepreload" crossorigin href="${entryUrl}">\n`,
  )
  console.log(`Added modulepreload for ${entryUrl}`)
}

writeFileSync(htmlPath, html)
console.log('index.html updated.')
