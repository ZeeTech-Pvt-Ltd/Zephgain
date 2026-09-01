import { useEffect } from 'react'

/**
 * useReveal — scroll-reveal animations.
 *
 * Observes every element with the `.reveal` class and sets a `data-revealed`
 * attribute when it scrolls into view (threshold 12%). The attribute is used
 * instead of a class so that React re-renders (which rewrite the `className`
 * attribute) never wipe out the revealed state — a class toggled imperatively
 * on a React-managed element gets clobbered, which made FAQ items disappear.
 * Call once at the top of App. Pass a `dep` so it re-observes elements when
 * the route changes (About page). Falls back to showing everything without an
 * IntersectionObserver.
 */
export default function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach((el) => el.setAttribute('data-revealed', 'true'))
      return
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

    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [dep])
}
