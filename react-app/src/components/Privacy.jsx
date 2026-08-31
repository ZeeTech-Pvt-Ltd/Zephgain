// Privacy Notice — layout follows the gemwealth-holm privacy reference; all copy
// is rewritten for Zephgain in its own words. Brand colors/fonts unchanged.
// Reuses the shared legal-page styles (.terms-*) from index.css.
const sections = [
  {
    n: '01',
    t: 'Introduction',
    p: [
      "Zephgain (\"we\", \"us\", \"our\") respects your privacy and treats personal information with transparency and integrity. This Privacy Notice explains what information we collect, how we use it, and the choices you have.",
    ],
  },
  {
    n: '02',
    t: 'Information We Collect',
    p: ['We collect information you provide directly to us and information collected automatically:'],
    list: [
      'Identity and contact details: name, email address, phone number, and country.',
      'Account information: login credentials, preferences, and communication history.',
      'Financial information: payment details and transaction records, where required to operate your account.',
      'Technical information: IP address, browser type, device information, and usage data collected through cookies and similar technologies.',
    ],
  },
  {
    n: '03',
    t: 'How We Use Your Information',
    p: ['We use your information to:'],
    list: [
      'Create and manage your account and provide the Service.',
      'Process deposits and withdrawals and comply with our legal obligations.',
      'Personalise and improve the Service, including our AI tools.',
      'Communicate with you about your account, updates, and support requests.',
      'Prevent fraud, abuse, and other harmful activity.',
    ],
  },
  {
    n: '04',
    t: 'Legal Bases for Processing',
    p: [
      'We process personal information where it is necessary to perform our contract with you, to comply with legal obligations, to pursue our legitimate interests (such as improving the Service and preventing fraud), or where you have given consent.',
    ],
  },
  {
    n: '05',
    t: 'Sharing Your Information',
    p: [
      'We do not sell your personal information. We share information only with service providers who help us operate the Service (such as payment processors and hosting providers), with professional advisers, or where required by law.',
      'Service providers are contractually bound to protect your information and may only use it to perform services on our behalf.',
    ],
  },
  {
    n: '06',
    t: 'Data Retention',
    p: [
      'We retain personal information only for as long as necessary to provide the Service, meet legal and regulatory requirements, resolve disputes, and enforce our agreements. When information is no longer needed, we delete or anonymise it.',
    ],
  },
  {
    n: '07',
    t: 'Security',
    p: [
      'We use appropriate technical and organisational measures to protect your information, including encryption of data in transit, managed access controls, and regular security reviews. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    n: '08',
    t: 'Your Rights',
    p: ['Depending on your jurisdiction, you may have the right to:'],
    list: [
      'Access the personal information we hold about you.',
      'Request correction of inaccurate or incomplete information.',
      'Request deletion of your information, subject to legal requirements.',
      'Object to or restrict certain processing activities.',
      'Withdraw consent where processing is based on consent.',
      'Lodge a complaint with your local data protection authority.',
    ],
  },
  {
    n: '09',
    t: 'Cookies and Similar Technologies',
    p: [
      'We use cookies and similar technologies to operate the Service, remember your preferences, and understand how the Service is used.',
    ],
  },
  {
    n: '10',
    t: 'International Transfers',
    p: [
      'Your information may be processed in countries other than your own. Where such transfers occur, we apply appropriate safeguards in accordance with applicable data protection law.',
    ],
  },
  {
    n: '11',
    t: "Children's Privacy",
    p: [
      'The Service is not directed to individuals under the age of 18, and we do not knowingly collect personal information from minors.',
    ],
  },
  {
    n: '12',
    t: 'Changes to This Notice',
    p: [
      "We may update this Privacy Notice from time to time. The updated version will be posted on this page with a new \"Last updated\" date.",
    ],
  },
  {
    n: '13',
    t: 'Contact Us',
    p: [
      'If you have questions about this Privacy Notice or wish to exercise your rights, contact us via the details on our contact page.',
    ],
  },
]

export default function Privacy() {
  return (
    <>
      {/* Hero */}
      <section className="terms-hero">
        <div className="container terms-hero-inner reveal">
          <span className="eyebrow">Legal</span>
          <h1 className="h1">
            Privacy <mark>Policy</mark>
          </h1>
          <p className="lead">How Zephgain collects, uses, and protects your personal information.</p>
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
                {s.list && (
                  <ul className="terms-list">
                    {s.list.map((li, i) => (
                      <li key={i}>{li}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
