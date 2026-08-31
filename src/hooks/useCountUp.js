import { useEffect, useRef, useState } from 'react'

/**
 * useCountUp — animates a number from 0 to `end` when its element scrolls
 * into view. Returns { ref, display }. Pass prefix/suffix for $, %, ★, etc.
 */
export default function useCountUp(end, { prefix = '', suffix = '', duration = 1500 } = {}) {
  const ref = useRef(null)
  const started = useRef(false)
  const [display, setDisplay] = useState(prefix + '0' + suffix)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setDisplay(prefix + end + suffix)
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (started.current) return
        entries.forEach((e) => {
          if (e.isIntersecting) {
            started.current = true
            const t0 = performance.now()
            const step = (now) => {
              const p = Math.min((now - t0) / duration, 1)
              const eased = 1 - Math.pow(1 - p, 3)
              const v = (end * eased).toFixed(end % 1 ? 1 : 0)
              setDisplay(prefix + v + suffix)
              if (p < 1) requestAnimationFrame(step)
            }
            requestAnimationFrame(step)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.35 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [end, prefix, suffix, duration])

  return { ref, display }
}
