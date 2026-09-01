import { Check } from './icons.jsx'
import { portfolio } from '../data/content.js'

export default function Portfolio() {
  const { eyebrow, title, titleMark, titleEnd, lead, checks, visual } = portfolio

  return (
    <section className="section feat" id="contact">
      <div className="container feat-duo">
        <div className="exp-visual reveal">
          <div className="exp-card">
            <div className="mini-label">
              <span>{visual.label}</span>
              <span>{visual.sub}</span>
            </div>
            <div className="mini-bal">
              {visual.balance} <span>{visual.note}</span>
            </div>
            <div className="bar-chart">
              {visual.bars.map((h, i) => (
                <i key={i} style={{ height: `${h}%`, animationDelay: `${i * 55}ms` }} />
              ))}
            </div>
          </div>
          <div className="exp-badge b2">
            <span className="dot"></span> {visual.badge}
          </div>
        </div>

        <div className="feat-duo-copy reveal">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="h2">{title}<mark>{titleMark}</mark>{titleEnd}</h2>
          <p className="lead">{lead}</p>
          <ul className="hero-checks">
            {checks.map((c) => (
              <li key={c}>
                <span className="tick"><Check /></span> {c}
              </li>
            ))}
          </ul>
          <a className="btn btn-primary" href="#register">Get Started</a>
        </div>
      </div>
    </section>
  )
}
