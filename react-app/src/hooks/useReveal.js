import { useEffect } from 'react'

/**
 * useReveal — scroll-reveal animations.
 *
 * Observes every element with the `.reveal` class and adds `.in` when it
 * scrolls into view (threshold 12%), exactly like the static site. Call once
 * at the top of App. Pass a `dep` so it re-observes elements when the route
 * changes (About page). Falls back to showing everything without an
 * IntersectionObserver.
 */
export default function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach((el) => el.classList.add('in'))
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
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
