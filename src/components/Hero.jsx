import RegistrationForm from './RegistrationForm.jsx'
import Ticker from './Ticker.jsx'
import CountUp from './CountUp.jsx'
import { Check, ArrowRight } from './icons.jsx'
import { hero } from '../data/content.js'

export default function Hero() {
  return (
    <section className="hero" id="register">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      <div className="container hero-inner">
        <div className="hero-copy reveal">
          <span className="eyebrow">{hero.eyebrow}</span>
          <h1 className="h1">
            {hero.title} <mark>{hero.titleMark}</mark>
          </h1>
          <p className="lead">{hero.lead}</p>

          <ul className="hero-checks">
            {hero.checks.map((c) => (
              <li key={c}>
                <span className="tick"><Check /></span> {c}
              </li>
            ))}
          </ul>

          <div className="hero-cta">
            <a className="btn btn-primary" href="#register">
              Register Now <ArrowRight />
            </a>
            <a className="btn btn-ghost" href="#how">How It Works</a>
          </div>

          <div className="hero-stats">
            {hero.stats.map((s) => (
              <div className="hero-stat" key={s.value}>
                <CountUp className="stat-num" value={s.value} duration={1600} />
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Registration form — kept identical in flow to zephgain.com */}
        <div className="form-wrap reveal">
          <div className="form-ring"></div>

          <div className="chip chip-1">
            <span className="ico" style={{ background: 'var(--grad)' }}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M11 3.5a3.5 3.5 0 0 1 3 5.25L17.5 15h-15L6 8.75A3.5 3.5 0 0 1 11 3.5Z" fill="#fff" /></svg>
            </span>
            <div><b>4.8 / 5</b><span>1,247 reviews</span></div>
          </div>

          <div className="chip chip-2">
            <span className="ico" style={{ background: 'linear-gradient(114deg,#56863E,#8FC473)' }}>
              <Check />
            </span>
            <div><b>AU Verified</b><span>Secure sign-up</span></div>
          </div>

          <div className="reg-card">
            <h3>Register Now</h3>
            <p className="sub">Getting started takes less than 2 minutes</p>
            <RegistrationForm />
          </div>
        </div>
      </div>

      <Ticker />
    </section>
  )
}
