import useCountUp from '../hooks/useCountUp.js'

/**
 * CountUp — counts a number up when it scrolls into view.
 * Accepts a value string like "$500M+", "4.8★", "98+"; non-numeric
 * strings (e.g. "24/7") render statically.
 */
export default function CountUp({ value, className = '', duration }) {
  const m = value.match(/^(\$?)(\d+\.?\d*)(.*)$/)
  if (!m) return <span className={className}>{value}</span>
  const [, prefix, num, suffix] = m
  const { ref, display } = useCountUp(parseFloat(num), { prefix, suffix, duration })
  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
