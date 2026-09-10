// Zephgain Review - long-form review page at /zephgain-review.
// Copy is published by the Zephgain team on the official site and is kept
// factual on purpose (the page states it is not an independent rating).
// FAQ text is single-sourced from reviewFaq in content.js so the rendered
// accordion and the FAQPage JSON-LD (src/data/seo.js) can never drift apart.
// No Review/AggregateRating schema is emitted anywhere on this domain.
import { useRef, useState } from 'react'
import { Check, ChevronDown } from './icons.jsx'
import { reviewFaq } from '../data/content.js'

const glanceRows = [
  ['Platform type', 'AI-assisted automated trading'],
  ['Available to', 'Verified residents of Australia'],
  ['Minimum deposit', 'AU$250'],
  ['Subscription fee', 'None'],
  ['Markets', 'Equities, forex, crypto, commodities, indices'],
  ['Deposit methods', 'Credit and debit cards, bank transfer, PayPal, e-wallets'],
  ['Withdrawal time', 'Most requests processed within 24 hours'],
  ['Account security', 'Two-factor authentication, 256-bit SSL, 95% of funds in cold storage'],
  ['Support', '24/7'],
  ['Trading modes', 'Fully automated or manual'],
]

const securityPoints = [
  'Two-factor authentication on every account, with biometric login available',
  '256-bit SSL encryption on all data in transit, with API keys encrypted at rest',
  '95% of client funds held in cold storage, away from internet-connected systems',
  'Withdrawal confirmation steps before any money leaves the account',
  'Regular security audits and GDPR-aligned data-privacy practices',
]

const goodFit = [
  'Want automated trading without learning to read charts',
  'Can comfortably set aside AU$250 or more that you are prepared to lose',
  'Prefer one dashboard over juggling several tools',
  'Are a verified resident of Australia',
]

const notGoodFit = [
  'Are looking for guaranteed or fixed returns - no trading platform can offer these',
  'Want a licensed adviser to manage your money and answer to you personally',
  'Are trading with money you need for rent, bills, or emergencies',
  'Live outside Australia, as access is currently limited to Australian residents',
]

const stepsCopy = [
  {
    label: 'Create your account.',
    text: ' Name, email, phone number. It takes about two minutes, and two-factor authentication is switched on from the moment the account exists.',
  },
  {
    label: 'Fund your account.',
    text: ' The Zephgain minimum deposit is AU$250. Cards, bank transfers, PayPal, and leading e-wallets are all supported, and deposits usually land within minutes.',
  },
  {
    label: 'Trade.',
    text: ' Turn on automated mode and let the AI run, or trade manually. Your balance, open positions, and signal history update in real time on one dashboard.',
  },
]

// Small accordion, visually identical to the homepage FAQ (same .faq classes)
// so both pages share one interaction pattern.
function ReviewFaq() {
  const [openIndex, setOpenIndex] = useState(null)
  const answerRefs = useRef([])

  const toggle = (index) => {
    const a = answerRefs.current[index]
    if (!a) return
    if (openIndex !== null && openIndex !== index) {
      answerRefs.current[openIndex].style.maxHeight = null
    }
    if (openIndex === index) {
      a.style.maxHeight = null
      setOpenIndex(null)
    } else {
      a.style.maxHeight = a.scrollHeight + 'px'
      setOpenIndex(index)
    }
  }

  return (
    <div className="faq">
      {reviewFaq.map((item, i) => (
        <div className={`faq-item ${openIndex === i ? 'open' : ''} reveal`} key={item.q}>
          <button
            className="faq-q"
            onClick={() => toggle(i)}
            aria-expanded={openIndex === i}
            aria-controls={`rv-faq-answer-${i}`}
            id={`rv-faq-question-${i}`}
          >
            {item.q}
            <span className="chev"><ChevronDown /></span>
          </button>
          <div
            className="faq-a"
            id={`rv-faq-answer-${i}`}
            role="region"
            aria-labelledby={`rv-faq-question-${i}`}
            ref={(el) => (answerRefs.current[i] = el)}
          >
            <p>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ZephgainReview() {
  return (
    <>
      {/* Hero */}
      <section className="rv-hero">
        <div className="container rv-hero-inner reveal">
          <span className="eyebrow">Zephgain Review</span>
          <h1 className="h1">
            Zephgain Review: <mark>How the Platform Works, What It Costs, and What to Watch For</mark>
          </h1>
          <p className="lead">
            Before you put money into any trading platform, you should know exactly what you are signing up
            for. This Zephgain review is published by the Zephgain team on our official site,{' '}
            <a href="/">zephgain-au.com</a>. It is not an independent rating - so we have kept it factual.
            Everything below matches what the platform actually does today, including the parts that will not
            suit everyone.
          </p>
        </div>
      </section>

      {/* Long-form body */}
      <section className="rv-body">
        <div className="container rv-wrap">
          <p className="rv-intro reveal">
            If you would rather see the process itself, our{' '}
            <a href="/" data-scroll="#how">step-by-step guide to how Zephgain works</a> covers the same ground
            in three steps.
          </p>

          <section className="rv-sec reveal">
            <h2>Zephgain at a Glance</h2>
            <dl className="rv-glance">
              {glanceRows.map(([k, v]) => (
                <div className="rv-glance-row" key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="rv-sec reveal">
            <h2>What Zephgain Actually Is</h2>
            <p>
              Zephgain is an automated trading platform built for traders in Australia. The AI monitors live
              market data around the clock, spots patterns, and turns them into trade signals. You choose what
              happens next: let the system place trades for you automatically, or switch to manual and make
              every call yourself.
            </p>
            <p>
              The idea is to remove the two things that stop most people from trading - the jargon and the
              screen time. You do not need to read charts, and you do not need to sit at a desk. What you do
              need is a clear head about the risk, which we cover further down.
            </p>
            <p>
              Zephgain is a technology platform, not a financial adviser. Nothing the AI produces is personal
              advice about your situation. Our full <a href="/disclosure">risk disclosure</a> sets out what
              that means in practice.
            </p>
          </section>

          <section className="rv-sec reveal">
            <h2>Getting Started - Three Steps</h2>
            <ol className="rv-steps">
              {stepsCopy.map((s) => (
                <li key={s.label}>
                  <strong>{s.label}</strong>
                  {s.text}
                </li>
              ))}
            </ol>
            <p>
              The full <a href="/" data-scroll="#how">how it works guide</a> on the homepage walks through the
              same three steps with a live look at each one.
            </p>
          </section>

          <section className="rv-sec reveal">
            <h2>Zephgain Minimum Deposit, Fees, and Withdrawals</h2>
            <p>
              There is no monthly subscription and no registration fee. The Zephgain minimum deposit of AU$250
              is what activates the account, and that money is yours to trade with - it is not a joining fee.
            </p>
            <p>
              A Zephgain withdrawal goes back through the same channel you used to deposit. If you funded by
              card, the money returns to that card. Most withdrawal requests are processed within 24 hours, and
              each one asks for confirmation before it goes through. There is no lock-in period and no notice
              requirement: you can withdraw whenever you choose and close the account when you want to.
            </p>
            <p>
              Be aware that your bank or card provider may apply its own processing times on top of ours. That
              part is outside our control.
            </p>
          </section>

          <section className="rv-sec reveal">
            <h2>Is Zephgain Safe? The Security Setup</h2>
            <p>
              The honest answer to "is Zephgain safe" is that no online platform is risk-free, and anyone who
              tells you otherwise is selling something. What we can tell you is what we do:
            </p>
            <ul className="rv-ticklist">
              {securityPoints.map((pt) => (
                <li key={pt}>
                  <span className="tick"><Check /></span>
                  {pt}
                </li>
              ))}
            </ul>
            <p>
              The <a href="/" data-scroll="#priorities">security, simplicity, and transparency</a> that guide
              the platform are laid out on the homepage.
            </p>
          </section>

          <section className="rv-sec reveal">
            <h2>Is Zephgain Legit? What the Question Usually Means</h2>
            <p>Most people asking "is Zephgain legit" are really asking two separate things.</p>
            <p>
              First: is the platform real and does it pay out? Yes. Accounts are live, trades execute, and
              withdrawals process through the same channels used for deposits, typically within 24 hours.
            </p>
            <p>
              Second: are the sites I am seeing actually Zephgain? This is where people get caught. Zephgain's
              growth has attracted copycat operators who build lookalike sites with similar names and
              near-identical designs, then collect deposits that never reach us. We have no connection to any
              of them and cannot recover funds sent to one.
            </p>
            <p>
              Our only official Australian domain is zephgain-au.com. Check the address bar before you enter
              anything. If a site asks you to deposit through a channel we do not list, or promises guaranteed
              returns, it is not us.
            </p>
          </section>

          <section className="rv-sec reveal">
            <h2>Who Zephgain Suits - and Who It Does Not</h2>
            <div className="rv-fit">
              <div className="rv-fit-card good">
                <h3>A good fit if you:</h3>
                <ul>
                  {goodFit.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rv-fit-card no">
                <h3>Not a good fit if you:</h3>
                <ul>
                  {notGoodFit.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="rv-sec reveal">
            <h2>The Risks, Stated Plainly</h2>
            <p>This is the part most reviews skip, so we will not.</p>
            <p>
              Trading carries real risk of loss, including the loss of your entire deposit. Prices in crypto,
              forex, and commodities can move sharply and without warning, including outside normal hours. AI
              models are built on historical and live data - they can be wrong, and they do not predict the
              future. Past performance, whether real or simulated, tells you nothing reliable about what comes
              next.
            </p>
            <p>
              You are responsible for your own decisions. Never trade with money you cannot afford to lose, and
              consider getting independent professional advice before you start. Our complete{' '}
              <a href="/disclosure">risk disclosure</a> covers this in full.
            </p>
          </section>

          <section className="rv-sec reveal">
            <h2>Zephgain Review - The Short Version</h2>
            <p>
              Zephgain gives Australian traders a straightforward way into automated trading: AU$250 to start,
              no subscription, automated or manual control, withdrawals typically inside 24 hours, and a
              security setup built around 2FA, encryption, and cold storage.
            </p>
            <p>
              What it is not is a shortcut to guaranteed money. The AI does the watching and the placing; the
              risk stays with you. If that trade-off makes sense for you, the{' '}
              <a href="/">registration form</a> takes about two minutes.
            </p>
            <p>
              Questions before you start? Our team is available 24/7 through the <a href="/contact">contact
              page</a>.
            </p>
          </section>

          <section className="rv-sec reveal">
            <h2>Frequently Asked Questions</h2>
            <ReviewFaq />
            <div className="rv-risk">
              <b>Risk warning:</b>
              <p>
                Trading involves significant risk and you may lose some or all of your capital. Zephgain does
                not provide personal financial advice. Read our full <a href="/disclosure">risk disclosure</a>{' '}
                before trading.
              </p>
            </div>
          </section>
        </div>
      </section>
    </>
  )
}
