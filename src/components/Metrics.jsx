import { metrics } from '../data/content.js'

export default function Metrics() {
  return (
    <section className="section-tight metrics">
      <div className="container metrics-grid reveal">
        {metrics.map((m) => (
          <div className={`metric ${m.solid ? 'solid' : ''}`} key={m.label}>
            <span className="deco-dot"></span>
            <span className="num">{m.value}</span>
            <div className="lbl">{m.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
