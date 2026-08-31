// Original mobile-mockup visual — a phone showing a trading chart on screen.
// Built from scratch in Zephgain's brand colours; only the generic
// device-mockup / trading-graphic style is used as inspiration, no
// third-party artwork is copied. Each variant shows a different chart stage
// of the company story (the chart paths are hand-drawn originals).
const VARIANTS = {
  1: {
    line: 'M0 128 C40 124 70 108 100 112 C130 116 160 98 190 92 C220 86 250 90 280 76 C300 66 310 60 320 52',
    end: [320, 52],
    label: 'Portfolio',
    bal: '$12,480',
    pct: '+12.4%',
  },
  2: {
    line: 'M0 122 C30 120 60 98 90 90 C120 82 150 92 180 72 C200 60 220 44 250 38 C280 32 300 40 320 34',
    end: [320, 34],
    label: 'Launch Day',
    bal: '$28,120',
    pct: '+120.0%',
  },
  3: {
    line: 'M0 138 C50 134 100 118 150 106 C200 94 250 84 280 66 C300 52 312 44 320 38',
    end: [320, 38],
    label: 'Community',
    bal: '$96,410',
    pct: '+34.8%',
  },
  4: {
    line: 'M0 104 C40 108 70 84 100 88 C130 92 150 64 180 60 C210 56 240 42 270 38 C290 34 305 32 320 28',
    end: [320, 28],
    label: 'Global Markets',
    bal: '$142,830',
    pct: '+52.2%',
  },
  5: {
    line: 'M0 146 C40 144 70 128 100 122 C130 116 160 100 190 92 C220 84 250 68 280 56 C300 48 312 42 320 36',
    end: [320, 36],
    label: 'Live Portfolio',
    bal: '$248,521',
    pct: '+18.4%',
  },
}

export default function PhoneMockup({ variant = 1 }) {
  const v = VARIANTS[variant]
  const gid = `pmGrad${variant}`

  return (
    <div className="pm" aria-hidden="true">
      <div className="pm-glow"></div>
      <span className="pm-chip pm-chip-tl">
        <span className="pm-dot"></span> {v.pct} · 24h
      </span>
      <span className="pm-chip pm-chip-br">AI Signal · BUY</span>

      <div className="pm-phone">
        <div className="pm-notch"></div>
        <div className="pm-screen">
          <div className="pm-status">
            <span>9:41</span>
            <span className="pm-bars">
              <i></i><i></i><i></i><i></i>
            </span>
          </div>

          <div className="pm-bal">
            <span>{v.label}</span>
            <b>{v.bal}</b>
            <em>{v.pct}</em>
          </div>

          <svg className="pm-chart" viewBox="0 0 320 150" role="img" aria-label={`${v.label} trading chart`}>
            <defs>
              <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#2679FF" stopOpacity="0.3" />
                <stop offset="1" stopColor="#2679FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g stroke="rgba(23,91,221,.12)" strokeDasharray="2 5">
              <path d="M0 38 H320" />
              <path d="M0 76 H320" />
              <path d="M0 114 H320" />
            </g>
            <path d={`${v.line} L320 150 L0 150 Z`} fill={`url(#${gid})`} />
            <path d={v.line} className="pm-line" />
            <circle cx={v.end[0]} cy={v.end[1]} r="3.5" className="pm-end" />
          </svg>

          <div className="pm-foot">
            <span>
              Win rate <b>92%</b>
            </span>
            <span>
              Pairs <b>65+</b>
            </span>
            <span>
              <b>24/7</b>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
