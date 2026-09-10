// Build-time SSG entry - rendered by `vite build --ssr`, then executed by
// build.mjs in Node. For each route it renders the exact same React tree the
// client would produce (renderRoute from src/renderRoute.jsx) to static
// markup, so the baked HTML hydrates without mismatches. renderRoute
// deliberately bypasses <App/> (which reads location.pathname during render -
// impossible in Node).
import { renderToString } from 'react-dom/server'
import { renderRoute } from '../src/renderRoute.jsx'

const ROUTES = [
  'home',
  'about',
  'contact',
  'terms',
  'privacy',
  'disclosure',
  'thank-you',
  'zephgain-review',
  '404',
]

export default function prerender() {
  const pages = {}
  for (const route of ROUTES) {
    pages[route] = renderToString(renderRoute(route))
  }
  return pages
}
