// Lightweight inline SVG icon set (stroke = currentColor)
const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function Check({ size = 14, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" className={className}>
      <path d="M2.5 6.2 4.9 8.6 9.5 3.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ArrowRight({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M5 10h10m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ChevronDown({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="m16.6 7.458-5.433 5.434a1.655 1.655 0 0 1-2.333 0L3.4 7.459" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Feature / step icons — pick by name via <Icon name="...">
export function Icon({ name, size = 26, className = '' }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', ...stroke, className }
  switch (name) {
    case 'user':
      return (
        <svg {...common}>
          <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7 8a7 7 0 0 0-14 0" />
        </svg>
      )
    case 'wallet':
      return (
        <svg {...common}>
          <path d="M3 9.5 12 4l9 5.5M5 11v6.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V11m-11 4h4v4.5" />
        </svg>
      )
    case 'chart':
      return (
        <svg {...common}>
          <path d="M3 17 8 11l4 4 6-8m0 0h-4m4 0v4" />
        </svg>
      )
    case 'bot':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M7 15.5 9.6 12l2.4 2 4.9-6" />
        </svg>
      )
    case 'clock':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.2 2" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 3 5 6v6c0 4.5 3 8 7 9 4-1 7-4.5 7-9V6l-7-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    case 'lock':
      return (
        <svg {...common}>
          <path d="M12 3a3 3 0 0 1 3 3v2h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h2V6a3 3 0 0 1 3-3Z" />
          <circle cx="12" cy="13" r="1.6" fill="currentColor" />
        </svg>
      )
    case 'zap':
      return (
        <svg {...common}>
          <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
        </svg>
      )
    case 'gauge':
      return (
        <svg {...common}>
          <path d="M4 19h16M6 19V9m6 10V5m6 14v-7" />
        </svg>
      )
    case 'mail':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4.5 7.5 7.5 5.5 7.5-5.5" />
        </svg>
      )
    case 'pin':
      return (
        <svg {...common}>
          <path d="M12 21s-6.5-4.7-6.5-9.5a6.5 6.5 0 1 1 13 0C18.5 16.3 12 21 12 21Z" />
          <circle cx="12" cy="11.5" r="2.6" />
        </svg>
      )
    default:
      return null
  }
}
