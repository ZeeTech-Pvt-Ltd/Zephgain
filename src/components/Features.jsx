import { Icon } from './icons.jsx'
import { features } from '../data/content.js'

export default function Features() {
  return (
    <section className="section feat" id="features">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Built to perform</span>
          <h2 className="h2">Streamlined Trading Powered by <mark>Intelligence</mark> and <mark>Security</mark></h2>
          <p className="lead">Everything you need to trade with confidence — wherever you are in Australia.</p>
        </div>

        <div className="feat-grid">
          {features.map((f) => (
            <article className="feat-card reveal" key={f.title}>
              <div className={`feat-ico ${f.green ? 'green' : ''}`}>
                <Icon name={f.icon} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
