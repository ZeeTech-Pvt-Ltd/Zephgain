import { useRef, useState } from 'react'
import { ChevronDown } from './icons.jsx'
import { faq } from '../data/content.js'

// Dedicated FAQ page. The full question list lives in `faq` (content.js) -
// the same single source of truth that feeds the FAQPage JSON-LD, so the
// structured data never drifts from the rendered answers.
export default function FaqPage() {
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
      <section className="terms-hero">
        <div className="container terms-hero-inner reveal">
          <span className="eyebrow">Help Centre</span>
          <h1 className="h1">
            Frequently Asked <mark>Questions</mark>
          </h1>
          <p className="lead">
            Straight answers to the most common questions about Zephgain - how the platform works, what it costs, and how to stay safe.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="faq">
            {faq.map((item, i) => (
              <div className={`faq-item ${openIndex === i ? 'open' : ''} reveal`} key={item.q}>
                <button
                  className="faq-q"
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                >
                  {item.q}
                  <span className="chev"><ChevronDown /></span>
                </button>
                <div
                  className="faq-a"
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  ref={(el) => (answerRefs.current[i] = el)}
                >
                  <p>
                    {item.a}
                    {item.link && (
                      <>
                        {' '}
                        <a className="faq-more" href={item.link.href}>{item.link.text}</a>
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
