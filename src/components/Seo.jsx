import { useEffect } from 'react'
import { seo, OG_IMAGE } from '../data/seo.js'

const SITE = 'https://zephgain-au.com'

/**
 * Seo — per-route head management for the Zephgain SPA.
 *
 * Syncs <title>, meta description/keywords/robots, canonical link,
 * Open Graph + Twitter tags, and JSON-LD structured data into
 * document.head. Implemented imperatively (no external dependency)
 * so each route gets its own metadata without adding React Helmet.
 *
 * index.html ships the homepage defaults statically; this component
 * finds those elements and updates them in place (no duplicates).
 */
const upsertMeta = (attr, name, content) => {
  let el = document.head.querySelector(`[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
  return el
}

const removeMeta = (attr, name) => {
  document.head.querySelector(`[${attr}="${name}"]`)?.remove()
}

export default function Seo({ route }) {
  useEffect(() => {
    const conf = seo[route] || seo['404']

    // ---- <title> ----
    let title = document.head.querySelector('title')
    if (!title) {
      title = document.createElement('title')
      document.head.appendChild(title)
    }
    title.textContent = conf.title

    // ---- meta description / keywords / robots ----
    upsertMeta('name', 'description', conf.description)
    if (conf.keywords) upsertMeta('name', 'keywords', conf.keywords)
    else removeMeta('name', 'keywords')
    upsertMeta('name', 'robots', conf.robots)

    // ---- canonical ----
    let link = document.head.querySelector('link[rel="canonical"]')
    if (conf.canonical) {
      if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
      }
      link.href = conf.canonical
    } else {
      link?.remove()
    }

    // ---- Open Graph ----
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
      let el = document.head.querySelector(`meta[property="${k}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('property', k)
        document.head.appendChild(el)
      }
      el.setAttribute('content', v)
    }

    // ---- Twitter / X cards ----
    const tw = {
      'twitter:card': 'summary_large_image',
      'twitter:title': conf.title,
      'twitter:description': conf.description,
      'twitter:image': OG_IMAGE,
    }
    for (const [k, v] of Object.entries(tw)) {
      let el = document.head.querySelector(`meta[name="${k}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('name', k)
        document.head.appendChild(el)
      }
      el.setAttribute('content', v)
    }

    // ---- JSON-LD structured data (replaced per route) ----
    document.head.querySelectorAll('script[data-seo-jsonld]').forEach((s) => s.remove())
    ;(conf.schema || []).forEach((data) => {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.dataset.seoJsonld = 'true'
      s.textContent = JSON.stringify(data)
      document.head.appendChild(s)
    })
  }, [route])

  return null
}
