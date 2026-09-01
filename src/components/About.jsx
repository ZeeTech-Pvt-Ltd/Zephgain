import CtaBanner from './CtaBanner.jsx'
import TradingVisual from './TradingVisual.jsx'
import { Check, ArrowRight, Icon } from './icons.jsx'

const stats = [
  { num: '4M+', lbl: 'Registered users' },
  { num: '98+', lbl: 'Supported countries' },
  { num: '65+', lbl: 'Currencies available' },
  { num: '$500M+', lbl: 'Customer deposits' },
  { num: '24/7', lbl: 'Trading access' },
  { num: '256-bit', lbl: 'Encryption standard' },
]

const pillars = [
  {
    icon: 'bot',
    title: 'AI-Powered Analysis',
    text: 'Automated market analysis that works around the clock and acts with precision — so opportunities never pass you by.',
  },
  {
    icon: 'shield',
    title: 'Bank-Grade Security',
    text: 'Strong encryption and layered account protections that help keep your funds safe at every step of the journey.',
  },
  {
    icon: 'user',
    title: 'Support, Your Way',
    text: 'A dedicated team ready to help in your language — from your very first trade to your hundredth.',
  },
]

const mission = [
  {
    title: 'Accessible',
    text: "Trading shouldn't be reserved for experts. Zephgain is built to feel intuitive and welcoming, so anyone can start with confidence — whatever their background or experience level.",
  },
  {
    title: 'Transparent',
    text: 'No hidden fees, no unclear terms. Every trade, every charge, and every rule is visible to you before you make a decision.',
  },
  {
    title: 'Innovative',
    text: 'We constantly refine the platform with the latest AI and algorithmic trading tools, so our users always have access to the most advanced technology available.',
  },
  {
    title: 'Responsible',
    text: 'We take our duties seriously. Risks are communicated honestly and responsible trading is promoted at every turn.',
  },
  {
    title: 'Built to Last',
    text: 'Zephgain was designed for the long term — dependable technology, consistent support, and a genuine commitment to growing alongside our users.',
  },
]

const story = [
  {
    step: '01',
    title: 'The Beginning',
    text: 'Six fintech and algorithmic trading specialists came together with a single ambition: make crypto trading as straightforward as online banking.',
  },
  {
    step: '02',
    title: 'First Launch',
    text: 'The platform went live with 12 cryptocurrencies. More than 10,000 users signed up in the very first month — a clean interface and automated tools set us apart from day one.',
  },
  {
    step: '03',
    title: 'Growing the Community',
    text: 'Within a year we passed 500,000 users. We added more currencies and introduced round-the-clock customer support in multiple languages.',
  },
  {
    step: '04',
    title: 'Going International',
    text: 'We expanded into dozens of markets worldwide, introduced local payment methods, and rolled out two-factor authentication across every account.',
  },
  {
    step: '05',
    title: 'Today',
    text: 'With 4M+ registered users and 65+ currencies, Zephgain keeps growing every day. Our mission remains the same: make crypto trading accessible to everyone.',
  },
]

const badges = ['SSL Certified', 'GDPR Compliant', '256-bit Encryption', 'Available in 98+ Countries', 'Regular Security Audits']

const security = [
  { icon: 'shield', title: 'Your Funds Stay Safe', text: 'Your cryptocurrency stays in your account at all times. Zephgain is only authorised to trade on your behalf.' },
  { icon: 'lock', title: 'Bank-Grade Encryption', text: 'All data is protected with 256-bit SSL encryption. API keys are encrypted both at rest and in transit.' },
  { icon: 'zap', title: 'Two-Factor Authentication', text: 'Secure your account with 2FA, biometric login, and withdrawal confirmations.' },
  { icon: 'user', title: 'Data Privacy Standards', text: 'We apply strict data-privacy and account-security practices across every market we serve.' },
]

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="about-hero">
        <div className="container about-hero-inner">
          <div className="about-hero-copy reveal">
            <span className="eyebrow">About Zephgain</span>
            <h1 className="h1">
              Automated trading, <mark>without the complexity</mark>
            </h1>
            <p className="lead">
              Zephgain studies the market around the clock and turns what it finds into clear, actionable
              opportunities. Our goal is simple — give every trader the tools to invest with confidence and full
              transparency.
            </p>
            <div className="about-cta">
              <a className="btn btn-primary" href="/" data-scroll="#register">
                Register Now <ArrowRight />
              </a>
              <a className="btn btn-ghost" href="/how-it-works">How It Works</a>
            </div>
          </div>

          <div className="about-visual reveal">
            <TradingVisual />
            <span className="about-chip one">
              <span className="ico"><Icon name="chart" size={16} /></span>
              24/7 Automated Analysis
            </span>
            <span className="about-chip two">
              <span className="ico"><Icon name="user" size={16} /></span>
              4M+ Traders Worldwide
            </span>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="about-stats">
        <div className="container about-stats-grid reveal">
          {stats.map((s) => (
            <div className="about-stat" key={s.lbl}>
              <div className="num">{s.num}</div>
              <div className="lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What sets us apart */}
      <section className="section about-section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">What Sets Us Apart</span>
            <h2 className="h2">Technology, safety, and personal guidance</h2>
            <p className="lead">
              Our platform pairs automated market analysis with human support — so you never have to make decisions alone.
            </p>
          </div>

          <div className="about-pillars">
            {pillars.map((p) => (
              <article className="about-pillar reveal" key={p.title}>
                <span className="about-pillar-ico"><Icon name={p.icon} size={26} /></span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section about-section alt">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Our Mission</span>
            <h2 className="h2">What we believe and why we built Zephgain</h2>
          </div>

          <div className="about-mission">
            {mission.map((m, i) => (
              <div className="about-mission-item reveal" key={m.title}>
                <span className="num">0{i + 1}</span>
                <div>
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section about-section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Our Story</span>
            <h2 className="h2">From a simple idea to a platform trusted by millions</h2>
          </div>

          <div className="about-story">
            {story.map((s, i) => (
              <div className={`about-story-row ${i % 2 ? 'reverse' : ''} reveal`} key={s.step}>
                <div className="about-story-media">
                  <span className="about-story-fallback" aria-hidden="true">{s.step}</span>
                  <img
                    src={`/about/story-${i + 1}.jpg`}
                    alt={`${s.title} — Zephgain`}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                </div>
                <div className="about-story-copy">
                  <span className="about-story-step">{s.step}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="section about-section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Security & Data Protection</span>
            <h2 className="h2">Built on a safer trading experience</h2>
            <p className="lead">We apply a range of security and data-protection measures designed to support safer trading.</p>
            <div className="about-badges">
              {badges.map((b) => (
                <span key={b}><Check size={12} /> {b}</span>
              ))}
            </div>
          </div>

          <div className="about-security">
            {security.map((s) => (
              <article className="about-sec-card reveal" key={s.title}>
                <span className="about-pillar-ico"><Icon name={s.icon} size={26} /></span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Ready to start trading?"
        title="Join thousands of traders"
        text="Access the market tools and automation you need through Zephgain — and take control of your trading in minutes."
        cta="Register Now"
      />
    </>
  )
}
