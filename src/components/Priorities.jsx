import { Check } from './icons.jsx'
import { priorities } from '../data/content.js'

// `asPage` is set when this section renders as the full /why-invest page:
// the heading becomes the page's single H1 and targets the page's search
// intent ("Why Invest with Zephgain") instead of the in-page section title.
export default function Priorities({ asPage = false }) {
  const Heading = asPage ? 'h1' : 'h2'
  // asPage (/why-invest) adds an Australia geo-signal; the in-page home
  // section keeps the original shorter lead.
  const leadText = asPage
    ? 'Why traders across Australia choose Zephgain — security, ease of use, and openness at every step.'
    : priorities.lead
  return (
    <section className="section prio" id="priorities">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{priorities.eyebrow}</span>
          {asPage ? (
            <Heading className="h2">Why Invest with <mark>Zephgain</mark></Heading>
          ) : (
            <Heading className="h2">{priorities.title}<mark>{priorities.titleMark}</mark></Heading>
          )}
          <p className="lead">{leadText}</p>
        </div>

        <div className="prio-grid">
          {priorities.cards.map((card) => (
            <article className={`prio-card ${card.alt ? 'alt' : ''} reveal`} key={card.title}>
              <div className="prio-top">
                <div className="big">
                  {card.big}
                  {card.bigNote && <small>{card.bigNote}</small>}
                </div>
                <div className="cap">{card.cap}</div>
              </div>
              <div className="prio-body">
                <h3 className="prio-title">{card.title}</h3>
                <div className="prio-sub">{card.sub}</div>
                <ul className="prio-list">
                  {card.items.map((item) => (
                    <li key={item}>
                      <span className="tick"><Check /></span> {item}
                    </li>
                  ))}
                </ul>
                <div className="tags">
                  {card.tags.map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
