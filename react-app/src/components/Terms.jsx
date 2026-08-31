// Terms of Use — layout follows the gemwealth-holm terms reference; all copy is
// rewritten for Zephgain in its own words. Brand colors/fonts unchanged.
const sections = [
  {
    n: '01',
    t: 'Acceptance of Terms',
    p: [
      "These Terms of Use (\"Terms\") govern your access to and use of the Zephgain website and platform (the \"Service\"). By creating an account or otherwise using the Service, you confirm that you have read, understood, and agree to be bound by these Terms, together with our Privacy Policy and Risk Disclosure.",
      'If you do not agree to these Terms, you must not register for or use the Service.',
    ],
  },
  {
    n: '02',
    t: 'Eligibility',
    p: [
      'The Service is available to individuals who are at least 18 years old and able to form legally binding contracts under applicable law. By using the Service, you confirm that you meet these requirements and that your use of the Service is lawful in your jurisdiction of residence.',
    ],
  },
  {
    n: '03',
    t: 'Nature of the Service',
    p: [
      'Zephgain provides technology and information tools, including AI-assisted market analysis, trading signals, and related content. The Service is provided for informational purposes only.',
      'Zephgain is not a licensed financial adviser, broker, or investment manager. Nothing on the Service constitutes personalised investment advice, a recommendation, an offer, or a solicitation to buy or sell any asset. Any decision you make — and its outcome — remains your responsibility.',
    ],
  },
  {
    n: '04',
    t: 'Account Registration and Security',
    p: [
      'You agree to provide accurate, current, and complete information when registering and to keep that information up to date. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. Please notify us immediately if you suspect any unauthorised use of your account.',
    ],
  },
  {
    n: '05',
    t: 'Deposits and Withdrawals',
    p: [
      'Details of payment methods, minimum amounts, and processing times are displayed within the platform. Deposits and withdrawals are processed in accordance with our internal procedures and applicable law. We may require additional identity verification before processing a withdrawal.',
    ],
  },
  {
    n: '06',
    t: 'Fees',
    p: [
      'Where applicable, fees are disclosed before you commit to any action. By proceeding, you authorise the deduction of such fees. We may adjust fees from time to time, with notice where required by law. Zephgain does not charge registration or subscription fees.',
    ],
  },
  {
    n: '07',
    t: 'Acceptable Use',
    p: [
      'You agree not to misuse the Service, including by attempting to gain unauthorised access, interfering with its operation, using automated means to extract data, or using the Service for any unlawful purpose.',
    ],
  },
  {
    n: '08',
    t: 'Intellectual Property',
    p: [
      'The Service and all content, software, and materials made available through it are owned by or licensed to Zephgain and are protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works from any part of the Service without our prior written consent.',
    ],
  },
  {
    n: '09',
    t: 'Third-Party Services',
    p: [
      'The Service may link to or integrate with third-party services. We are not responsible for the content, availability, or practices of any third party. Your use of third-party services is subject to their own terms.',
    ],
  },
  {
    n: '10',
    t: 'Disclaimers',
    p: [
      "The Service is provided on an \"as is\" and \"as available\" basis. To the maximum extent permitted by law, we disclaim all warranties, whether express or implied, including fitness for a particular purpose, accuracy, and non-infringement. We do not guarantee uninterrupted, error-free, or secure operation of the Service.",
    ],
  },
  {
    n: '11',
    t: 'Limitation of Liability',
    p: [
      'To the maximum extent permitted by law, Zephgain, its affiliates, officers, and employees shall not be liable for any indirect, incidental, special, or consequential damages, or for any loss of profits, data, or goodwill, arising out of or in connection with your use of the Service.',
    ],
  },
  {
    n: '12',
    t: 'Suspension and Termination',
    p: [
      'We may suspend or terminate your access to the Service at any time, with or without notice, including where we reasonably believe you have breached these Terms or applicable law.',
    ],
  },
  {
    n: '13',
    t: 'Changes to These Terms',
    p: [
      "We may update these Terms from time to time. The updated version will be posted on this page with a new \"Last updated\" date. Continued use of the Service after changes take effect constitutes acceptance of the revised Terms.",
    ],
  },
  {
    n: '14',
    t: 'Governing Law',
    p: [
      'These Terms are governed by the laws of Australia. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of New South Wales, Australia.',
    ],
  },
]

export default function Terms() {
  return (
    <>
      {/* Hero */}
      <section className="terms-hero">
        <div className="container terms-hero-inner reveal">
          <span className="eyebrow">Legal</span>
          <h1 className="h1">
            Terms of <mark>Use</mark>
          </h1>
          <p className="lead">The rules that govern your use of the Zephgain platform.</p>
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
