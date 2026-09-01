import { useEffect } from 'react'

/**
 * useReveal — scroll-reveal animations.
 *
 * Observes every element with the `.reveal` class and sets a `data-revealed`
 * attribute when it scrolls into view (threshold 12%). The attribute is used
 * instead of a class so that React re-renders (which rewrite the `className`
 * attribute) never wipe out the revealed state — a class toggled imperatively
 * on a React-managed element gets clobbered, which made FAQ items disappear.
 *
 * A MutationObserver watches the DOM so elements that mount *after* the hook
 * runs (code-split route pages loaded via React.lazy) still get revealed
 * instead of staying invisible. Falls back to showing everything without an
 * IntersectionObserver.
 */
export default function useReveal(dep) {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      const revealAll = () =>
        document.querySelectorAll('.reveal').forEach((el) => el.setAttribute('data-revealed', 'true'))
      revealAll()
      const mo = new MutationObserver(revealAll)
      mo.observe(document.body, { childList: true, subtree: true })
      return () => mo.disconnect()
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute('data-revealed', 'true')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    const observe = (el) => {
      if (el.classList?.contains('reveal')) obs.observe(el)
    }

    document.querySelectorAll('.reveal').forEach(observe)

    // Reveal elements that appear later — e.g. lazy-loaded route pages.
    const mo = new MutationObserver((records) => {
      for (const rec of records) {
        for (const node of rec.addedNodes) {
          if (node.nodeType !== 1) continue
          if (node.classList?.contains('reveal')) obs.observe(node)
          else node.querySelectorAll?.('.reveal').forEach(observe)
        }
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      obs.disconnect()
      mo.disconnect()
    }
  }, [dep])
}
