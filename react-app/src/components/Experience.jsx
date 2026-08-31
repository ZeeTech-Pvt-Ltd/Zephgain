import { experience } from '../data/content.js'

export default function Experience() {
  const { eyebrow, titleA, titleMark, lead, rows } = experience

  return (
    <section className="section exp-sec" id="experience">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="h2">{titleA}<mark>{titleMark}</mark></h2>
          <p className="lead">{lead}</p>
        </div>

        {rows.map((row, i) => (
          <div className={`exp-row reveal ${i % 2 ? 'reverse' : ''}`} key={row.title}>
            <div className="exp-copy">
              <h3 className="h3">{row.title}</h3>
              <p>{row.text}</p>
            </div>

            <div className="exp-visual">
              <div className={`exp-card ${row.solid ? 'exp-card-2' : ''}`}>
                <div className="exp-card-head">
                  <span className="exp-brand"><span className="exp-brand-dot"></span> Zephgain AI</span>
                  <span className="exp-live"><span className="dot"></span> Live</span>
                </div>
                <div className="exp-card-body">
                  <div className="mini-label">
                    <span>{row.label}</span>
                    <span>{row.sub}</span>
                  </div>
                  <div className="mini-bal">
                    {row.balance}
                    {row.balanceNote && <span>{row.balanceNote}</span>}
                  </div>
                  <div className="bar-chart">
                    {row.bars.map((h, i) => (
                      <i
                        key={i}
                        style={{
                          height: `${h}%`,
                          animationDelay: `${i * 60}ms`,
                          ...(row.solid ? { opacity: 0.95 } : {}),
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className={`exp-badge ${row.pos}`}>
                <span className="dot"></span> {row.badge}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
