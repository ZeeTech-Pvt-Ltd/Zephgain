import { Icon, Check, ArrowRight } from './icons.jsx'
import { steps, trustStrip } from '../data/content.js'

// `asPage` is set when this section renders as the full /how-it-works page,
// so its heading becomes the page's single H1 (styling stays identical).
export default function HowItWorks({ asPage = false }) {
  const Heading = asPage ? 'h1' : 'h2'
  return (
    <section className="section how" id="how">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Simple by design</span>
          <Heading className="h2">Get Started in <mark>3 Easy Steps</mark></Heading>
          {asPage ? (
            <p className="lead">A clear, guided path from sign-up to your first trade — built for traders across Australia, with no jargon, no complications, and nothing extra to figure out.</p>
          ) : (
            <p className="lead">A clear, guided path from sign-up to your first trade — with no jargon, no complications, and nothing extra to figure out.</p>
          )}
        </div>

        <div className="steps">
          {steps.map((step) => (
            <article className="step reveal" key={step.title}>
              <span className="step-no">{step.no}</span>
              <div className={`step-ico ${step.green ? 'green' : ''}`}>
                <Icon name={step.icon} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <a className="btn-link" href="/" data-scroll="#register">
                {step.cta} <ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>

        <div className="how-strip reveal">
          {trustStrip.map((t) => (
            <p key={t}>
              <span className="tick"><Check size={16} /></span> {t}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
