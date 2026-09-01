import { useRef, useState } from 'react'
import { ChevronDown } from './icons.jsx'
import { faq } from '../data/content.js'

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null)
  const answerRefs = useRef([])

  const toggle = (index) => {
    const a = answerRefs.current[index]
    if (!a) return

    // close others
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
    <section className="section" id="faq">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Need help?</span>
          <h2 className="h2">Frequently Asked <mark>Questions</mark></h2>
        </div>

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
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
