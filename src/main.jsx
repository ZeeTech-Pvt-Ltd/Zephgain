import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const el = document.getElementById('root')
const tree = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// The build-time prerender ships the full page already inside #root, so
// hydrate React onto that existing markup (no blank-then-paint flash, no
// double render of the prerendered text). In dev - or when #root is empty -
// fall back to a normal client render.
if (el.hasChildNodes()) hydrateRoot(el, tree)
else createRoot(el).render(tree)
