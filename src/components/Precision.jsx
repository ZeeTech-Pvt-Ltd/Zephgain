import { Icon } from './icons.jsx'
import { precision } from '../data/content.js'

export default function Precision() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Standout technology</span>
          <h2 className="h2">Precision, Speed, and <mark>Security</mark> — All in One System</h2>
          <p className="lead">Here's what makes Zephgain stand out.</p>
        </div>

        <div className="feat-grid">
          {precision.map((f) => (
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
