import { capabilities } from '../data/content.js'

export default function Capabilities() {
  return (
    <section className="section caps">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">At a glance</span>
          <h2 className="h2">Core <mark>Capabilities</mark> of the Zephgain Trading Platform</h2>
        </div>

        <div className="caps-grid">
          {capabilities.map((c) => (
            <div className="cap-row reveal" key={c.k}>
              <span className="k">{c.k}</span>
              <span className="v">{c.v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
