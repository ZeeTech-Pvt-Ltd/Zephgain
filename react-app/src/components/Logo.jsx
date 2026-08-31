export default function Logo({ onDark = false }) {
  return (
    <a className="logo" href="#top" aria-label="Zephgain home">
      <span className="logo-mark">Z</span>
      <span className={`logo-text ${onDark ? 'on-dark' : ''}`}>
        Zeph<span>gain</span>
      </span>
    </a>
  )
}
