import { useRef, useState } from 'react'
import { ChevronDown, ArrowRight, Icon } from './icons.jsx'
import { zephgainAppFaq } from '../data/content.js'

const steps = [
  { no: '01', icon: 'pin', title: 'Open the site', text: "Open zephgain-au.com in your phone's browser. Type the address yourself rather than following a link from an ad or a message." },
  { no: '02', icon: 'user', title: 'Sign in or register', text: 'Sign in to your account, or register if you do not have one.' },
  { no: '03', icon: 'zap', title: 'Add to Home Screen', text: "To reach it faster next time, use your browser's Add to Home Screen option. On iPhone it is in the Share menu in Safari; on Android it is in the Chrome menu. This puts an icon on your home screen that opens the platform directly." },
]

const warnings = [
  { icon: 'lock', text: 'An APK file offered for direct download. We do not distribute one.' },
  { icon: 'mail', text: 'A download link sent by SMS, WhatsApp, Telegram, or email.' },
  { icon: 'pin', text: 'A site with a similar name a different ending, an extra word, a hyphen moved.' },
  { icon: 'shield', text: 'An app asking for your seed phrase, wallet keys, or remote access to your screen.' },
  { icon: 'chart', text: 'Anything promising guaranteed or fixed returns. No trading product can offer that.' },
]

export default function ZephgainApp() {
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
    <>
      {/* Hero */}
      <section className="about-hero zapp-hero">
        <div className="container about-hero-inner">
          <div className="about-hero-copy reveal">
            <span className="eyebrow">Security</span>
            <h1 className="h1">
              Is There a <mark>Zephgain App?</mark>
            </h1>
            <p className="lead">
              No. There is no Zephgain mobile app, and we have not published one on the App Store, Google Play, or anywhere else.
            </p>
            <div className="about-cta">
              <a className="btn btn-primary" href="/" data-scroll="#register">
                Register Now <ArrowRight />
              </a>
              <a className="btn btn-ghost" href="/faq">Read the FAQ</a>
            </div>
          </div>

          <div className="about-visual reveal">
            <img
              src="/Zephgainsecuirty.webp"
              alt="Zephgain security - browser-based platform with nothing to install"
              width="1317"
              height="1194"
            />
            <span className="about-chip one">
              <span className="ico"><Icon name="shield" size={16} /></span>
              Nothing to download
            </span>
            <span className="about-chip two">
              <span className="ico"><Icon name="lock" size={16} /></span>
              Runs in your browser
            </span>
          </div>
        </div>
      </section>

      {/* How to Use Zephgain on Your Phone */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Any device, one account</span>
            <h2 className="h2">How to Use Zephgain on <mark>Your Phone</mark></h2>
            <p className="lead">
              The platform is built to work on any device with a browser, phone, tablet and laptop. You get the same dashboard, the same signals, and the same account either way.
            </p>
          </div>

          <div className="steps">
            {steps.map((s) => (
              <article className="step reveal" key={s.no}>
                <span className="step-no">{s.no}</span>
                <div className="step-ico"><Icon name={s.icon} /></div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>

          <p className="zapp-note reveal">
            That icon behaves like an app, but nothing is installed on your device and no permissions are requested. That is deliberate, it is the safer arrangement for an account that holds money.
          </p>
        </div>
      </section>

      {/* Why We Do Not Have a Mobile App */}
      <section className="section zapp-why-sec">
        <div className="container">
          <div className="zapp-why reveal">
            <div className="zapp-why-media">
              <img
                src="/mobileapp.webp"
                alt="Why Zephgain has no mobile app - one browser address to secure"
                width="1254"
                height="1254"
                loading="lazy"
              />
            </div>
            <div className="zapp-why-copy">
              <span className="eyebrow">One address to secure</span>
              <h2 className="h2">Why We Do Not Have a <mark>Mobile App</mark></h2>
              <p>
                Trading platforms are a common target for fake apps. Because a browser-based platform gives us one address to secure and one place for you to verify, there is no installer for anyone to imitate, no APK for anyone to tamper with, and no app-store listing for a copycat to sit beside.
              </p>
              <p>
                If that changes, we will announce it here first, and any official app will be linked from this page and from the Apple App Store or Google Play never from a direct download link.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Spot a Fake Zephgain App */}
      <section className="section">
        <div className="container">
          <div className="zapp-split reveal">
            <div className="zapp-split-content">
              <span className="eyebrow">Red flags</span>
              <h2 className="h2">How to Spot a <mark>Fake Zephgain App</mark></h2>
              <p className="lead">
                Our only official Australian address is zephgain-au.com. Treat anything else as unrelated to us.
              </p>
              <div className="warn-timeline">
                {warnings.map((w, i) => (
                  <div className="warn-item" key={w.text}>
                    <span className="warn-num">{String(i + 1).padStart(2, '0')}</span>
                    <p>{w.text}</p>
                  </div>
                ))}
              </div>
              <p className="zapp-note">
                If you have already installed something claiming to be a Zephgain app, uninstall it, change the password on any account whose details you entered, and contact your bank if you shared payment information. You can also report it to Scamwatch.
              </p>
            </div>
            <div className="zapp-split-media">
              <img
                src="/spot-fake-app.webp"
                alt="How to spot a fake Zephgain app on your phone"
                width="1305"
                height="1206"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Help Centre</span>
            <h2 className="h2">Frequently Asked <mark>Questions</mark></h2>
          </div>
          <div className="faq zapp-faq">
            {zephgainAppFaq.map((item, i) => (
              <div className={`faq-item ${openIndex === i ? 'open' : ''} reveal`} key={item.q}>
                <button
                  className="faq-q"
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                  aria-controls={`zapp-faq-answer-${i}`}
                  id={`zapp-faq-question-${i}`}
                >
                  {item.q}
                  <span className="chev"><ChevronDown /></span>
                </button>
                <div
                  className="faq-a"
                  id={`zapp-faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`zapp-faq-question-${i}`}
                  ref={(el) => (answerRefs.current[i] = el)}
                >
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
