// Original trading-dashboard visual, recreated from scratch in Zephgain's
// brand colours. Only the general trading/fintech graphic style (area charts,
// candlesticks, market stat chips) is used as inspiration — no third-party
// artwork is copied. All colours come from the site's CSS variables.
const line =
  'M0 170 C52 154 88 124 132 132 C168 138 198 100 240 92 C282 84 314 110 352 90 C388 72 420 46 462 40 C498 34 530 40 560 24'
const area = `${line} L560 212 L0 212 Z`

// Candlestick strip — each bar is {up, body top/height, wick top/height} in px.
const candles = [
  { up: true, bT: 30, bH: 14, wT: 26, wH: 22 },
  { up: false, bT: 26, bH: 12, wT: 22, wH: 20 },
  { up: true, bT: 28, bH: 16, wT: 24, wH: 24 },
  { up: false, bT: 24, bH: 10, wT: 20, wH: 18 },
  { up: true, bT: 26, bH: 14, wT: 22, wH: 22 },
  { up: true, bT: 20, bH: 18, wT: 16, wH: 26 },
  { up: false, bT: 22, bH: 12, wT: 18, wH: 20 },
  { up: true, bT: 16, bH: 16, wT: 12, wH: 24 },
  { up: true, bT: 14, bH: 18, wT: 10, wH: 26 },
  { up: false, bT: 16, bH: 12, wT: 12, wH: 20 },
  { up: true, bT: 10, bH: 18, wT: 6, wH: 26 },
  { up: true, bT: 8, bH: 20, wT: 4, wH: 28 },
]

export default function TradingVisual() {
  return (
    <div className="tv-card">
      <div className="tv-head">
        <span className="tv-brand">Zephgain AI</span>
        <span className="tv-live">
          <span className="dot"></span> Live
        </span>
      </div>

      <div className="tv-body">
        <div>
          <div className="tv-label">Portfolio Value</div>
          <div className="tv-bal">$248,521.90</div>
        </div>
        <span className="tv-pct">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 10V2.5M2.5 6 6 2.5 9.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          18.4%
        </span>
      </div>

      <div className="tv-chart">
        <svg viewBox="0 0 560 212" role="img" aria-label="Upward trending automated trading chart">
          <defs>
            <linearGradient id="tvGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2679FF" stopOpacity="0.32" />
              <stop offset="1" stopColor="#2679FF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="rgba(23,91,221,.14)" strokeDasharray="2 6">
            <path d="M0 40 H560" />
            <path d="M0 90 H560" />
            <path d="M0 140 H560" />
            <path d="M0 190 H560" />
          </g>
          <path d={area} fill="url(#tvGrad)" />
          <path d={line} className="tv-path" />
          <path d="M462 40 H560" className="tv-target" />
          <circle cx="560" cy="24" r="7" className="tv-halo" />
          <circle cx="560" cy="24" r="4" className="tv-dot" />
        </svg>
        <span className="tv-coin">$</span>
      </div>

      <div className="tv-candles">
        {candles.map((c, i) => (
          <div className={`tv-candle ${c.up ? 'tv-up' : 'tv-dn'}`} key={i}>
            <i className="w" style={{ top: c.wT, height: c.wH }} />
            <i className="b" style={{ top: c.bT, height: c.bH }} />
          </div>
        ))}
      </div>

      <div className="tv-foot">
        <span className="tv-stat">
          AI Signal <b>BUY</b>
        </span>
        <span className="tv-stat">
          Win rate <b>92.4%</b>
        </span>
        <span className="tv-stat">
          Pairs <b>65+</b>
        </span>
        <span className="tv-stat">
          Markets <b>24/7</b>
        </span>
      </div>
    </div>
  )
}
