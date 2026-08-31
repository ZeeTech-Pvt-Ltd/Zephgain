// Risk Disclosure — layout follows the gemwealth-holm reference; all copy is
// rewritten for Zephgain in its own words. Brand colors/fonts unchanged.
// Reuses the shared legal-page styles (.terms-*) from index.css.
const sections = [
  {
    n: '01',
    t: 'General Risk Statement',
    p: [
      'Trading and investing in financial markets involves significant risk and can result in the loss of part or all of your capital. You should carefully consider whether trading is appropriate for you in light of your experience, objectives, and financial circumstances.',
    ],
  },
  {
    n: '02',
    t: 'Market Volatility',
    p: [
      'Prices of cryptocurrencies, forex, commodities, indices, and other assets can fluctuate rapidly and unpredictably. Sudden price movements can occur at any time, including outside regular trading hours, and may result in losses greater than you anticipated.',
    ],
  },
  {
    n: '03',
    t: 'No Investment Advice',
    p: [
      'Zephgain provides technology and information tools. Nothing on the platform — including AI-generated analysis, signals, or other content — constitutes personalised investment advice, a recommendation, or a solicitation to trade. All content is provided for informational purposes only.',
    ],
  },
  {
    n: '04',
    t: 'Limitations of AI Tools',
    p: [
      'AI-assisted analysis and signals are based on historical and real-time data and statistical models. Models can be wrong, may not reflect all market conditions, and do not guarantee accurate predictions. Signals should never be relied upon in isolation, and automated outputs are no substitute for your own judgement.',
    ],
  },
  {
    n: '05',
    t: 'Past Performance',
    p: [
      'Any past performance shown on the platform, whether simulated or actual, is not a reliable indicator of future results. Hypothetical or backtested performance has inherent limitations and may overstate results achievable in live markets.',
    ],
  },
  {
    n: '06',
    t: 'Liquidity and Execution',
    p: [
      'Market conditions may affect the speed and price at which orders are executed. Low liquidity can lead to slippage, wider spreads, and difficulty entering or exiting positions at expected prices.',
    ],
  },
  {
    n: '07',
    t: 'Technology and Cybersecurity Risks',
    p: [
      'Online platforms are subject to technology failures, outages, and security threats, including unauthorised access, phishing, and other attacks. We employ security measures to protect the Service, but no online system is completely immune to risk.',
    ],
  },
  {
    n: '08',
    t: 'Regulatory Risks',
    p: [
      'The legal and regulatory treatment of digital assets and trading platforms varies by jurisdiction and continues to evolve. Changes in law or regulation may affect the availability, value, or legality of certain assets or features.',
    ],
  },
  {
    n: '09',
    t: 'Your Responsibility',
    p: [
      'You are solely responsible for your own trading and investment decisions and for verifying any information before acting on it. Never trade with money you cannot afford to lose.',
    ],
  },
  {
    n: '10',
    t: 'Seek Independent Advice',
    p: [
      'Before using the Service or engaging in any trading activity, you should seek independent professional advice tailored to your personal circumstances.',
    ],
  },
]

export default function RiskDisclosure() {
  return (
    <>
      {/* Hero */}
      <section className="terms-hero">
        <div className="container terms-hero-inner reveal">
          <span className="eyebrow">Legal</span>
          <h1 className="h1">
            Risk <mark>Disclosure</mark>
          </h1>
          <p className="lead">The risks you should understand before using the Zephgain platform.</p>
          <span className="terms-updated">Last updated: 31 August 2026</span>
        </div>
      </section>

      {/* Sections */}
      <section className="section terms-body">
        <div className="container terms-wrap">
          {sections.map((s) => (
            <div className="terms-block reveal" key={s.n}>
              <div className="terms-num">{s.n}</div>
              <div className="terms-block-body">
                <h2>{s.t}</h2>
                {s.p.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
