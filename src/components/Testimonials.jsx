import { testimonials } from '../data/content.js'

export default function Testimonials() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{testimonials.eyebrow}</span>
          <h2 className="h2">{testimonials.title}<mark>{testimonials.titleMark}</mark></h2>
          <p className="lead">{testimonials.lead}</p>
        </div>

        <div className="tst-grid">
          {testimonials.items.map((t) => (
            <article className="tst-card reveal" key={t.name}>
              <div className="tst-stars">★★★★★</div>
              <blockquote>"{t.quote}"</blockquote>
              <div className="tst-person">
                <span className="tst-avatar">{t.initials}</span>
                <div>
                  <b>{t.name}</b>
                  <span className="verified">✓ {t.verified}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="tst-summary reveal">
          {testimonials.summary.map((s, i) => (
            <div className="row" key={s.big}>
              <div className="big">{s.big}</div>
              <div>
                <div className="tst-stars">{s.stars}</div>
                <div className="muted" style={{ fontSize: 13.5 }}>{s.note}</div>
              </div>
              {i === 0 && <span className="divider"></span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
