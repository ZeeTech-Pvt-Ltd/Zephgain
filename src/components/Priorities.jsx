import { Check } from './icons.jsx'
import { priorities } from '../data/content.js'

export default function Priorities() {
  return (
    <section className="section prio" id="priorities">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{priorities.eyebrow}</span>
          <h2 className="h2">{priorities.title}<mark>{priorities.titleMark}</mark></h2>
          <p className="lead">{priorities.lead}</p>
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
                <div className="prio-title">{card.title}</div>
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
