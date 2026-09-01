import Logo from './Logo.jsx'
import { footer } from '../data/content.js'

const socials = [
  {
    label: 'X (Twitter)',
    path: 'M18.326 1.904H21.7l-7.37 8.423L23 21.79h-6.789l-5.317-6.952L4.81 21.79H1.434l7.883-9.01L1 1.904h6.961l4.806 6.354 5.56-6.354ZM17.142 19.77h1.87L6.945 3.817H4.94L17.142 19.77Z',
  },
  {
    label: 'Telegram',
    path: 'M20.317 4.156a19.792 19.792 0 0 0-4.885-1.516.074.074 0 0 0-.079.038c-.21.375-.444.864-.608 1.249a18.271 18.271 0 0 0-5.487 0 12.644 12.644 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.737 19.737 0 0 0-4.885 1.516.07.07 0 0 0-.032.027C.533 8.832-.32 13.366.099 17.843a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.029c.462-.63.874-1.295 1.226-1.994.021-.04.001-.09-.041-.105a13.109 13.109 0 0 1-1.872-.893.077.077 0 0 1-.008-.127c.126-.095.252-.193.372-.292a.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.01c.12.098.245.197.372.292.044.032.04.1-.006.127-.598.35-1.22.645-1.873.892a.077.077 0 0 0-.041.106c.36.698.772 1.363 1.225 1.994a.076.076 0 0 0 .084.028 19.834 19.834 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.176-.838-9.673-3.549-13.66a.06.06 0 0 0-.031-.028ZM8.02 15.117c-1.182 0-2.157-1.086-2.157-2.419S6.82 10.28 8.02 10.28c1.21 0 2.176 1.095 2.157 2.42 0 1.332-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419s.955-2.419 2.157-2.419c1.21 0 2.176 1.095 2.157 2.42 0 1.332-.946 2.418-2.157 2.418Z',
  },
  {
    label: 'YouTube',
    path: 'M23.76 7.2s-.233-1.655-.955-2.381c-.914-.957-1.936-.961-2.405-1.018-3.356-.243-8.395-.243-8.395-.243h-.01s-5.039 0-8.395.243c-.469.057-1.49.061-2.405 1.018-.722.726-.951 2.38-.951 2.38S0 9.146 0 11.087v1.819c0 1.94.24 3.885.24 3.885s.233 1.655.95 2.382c.915.956 2.115.923 2.65 1.026 1.92.183 8.16.24 8.16.24s5.044-.01 8.4-.25c.469-.055 1.49-.06 2.405-1.016.722-.727.956-2.382.956-2.382S24 14.85 24 12.905v-1.82c0-1.94-.24-3.885-.24-3.885ZM9.52 15.112V8.367l6.483 3.384-6.483 3.361Z',
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo onDark />
            <p>{footer.blurb}</p>
            <div className="footer-social">
              {socials.map((s) => (
                <a key={s.label} href="#" aria-label={s.label}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              {footer.company.map((l) => (
                <li key={l.label}><a href={l.href} data-scroll={l.scroll || undefined}>{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Legal</h4>
            <ul>
              {footer.legal.map((l) => (
                <li key={l.label}><a href={l.href} data-scroll={l.scroll || undefined}>{l.label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-legal">
          <nav>
            {footer.legal.slice(0, 3).map((l) => (
              <a key={l.label} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <span>Official domain: zephgain-au.com</span>
        </div>

        <span id="terms"></span>
        <span id="privacy"></span>
        <div className="disclaimer" id="disclosure">
          <b>HIGH RISK WARNING</b>
          <p>{footer.disclaimer}</p>
        </div>

        <div className="footer-legal" style={{ borderTop: 'none', paddingTop: 0, justifyContent: 'center' }}>
          Copyright 2026 © Zephgain, All Right Reserved
        </div>
      </div>
    </footer>
  )
}
