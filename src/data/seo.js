// =========================================================
// Per-route SEO configuration for Zephgain.
// Single source of truth for <title>, meta description, meta
// keywords, canonical URLs, robots rules, Open Graph, Twitter
// cards, and JSON-LD structured data — consumed by <Seo/>.
// Nothing here invents facts: all claims come from content.js.
// =========================================================
import { faq } from './content.js'

const SITE = 'https://zephgain-au.com'
export const OG_IMAGE = `${SITE}/og-image.png`

// ---------- JSON-LD builders (real site content only) ----------

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'Zephgain',
  url: SITE,
  logo: `${SITE}/favicon.svg`,
  description:
    'Zephgain is an AI-powered automated trading platform for users in Australia — automated strategies, live market signals, and dependable security in one place.',
  email: 'support@zephgain-au.com',
  inLanguage: 'en-AU',
  areaServed: 'Australia',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Melbourne',
    addressRegion: 'Victoria',
    addressCountry: 'AU',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'support@zephgain-au.com',
    availableLanguage: 'en',
    hoursAvailable: 'Mo-Su 00:00-24:00',
  },
}

// The platform described as a schema.org Service, geo-scoped to Australia —
// all fields reflect claims already on the site (Melbourne base, 24/7
// support, AU$250 minimum deposit), nothing invented.
function serviceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE}/#service`,
    name: 'Zephgain Automated Trading Platform',
    serviceType: 'Automated trading platform',
    description:
      'AI-powered automated trading platform for users in Australia — automated strategies, live market signals, and dependable security in one place.',
    provider: { '@id': `${SITE}/#organization` },
    areaServed: 'Australia',
    audience: { '@type': 'Audience', audienceType: 'Traders in Australia' },
    offers: {
      '@type': 'Offer',
      description: 'Minimum deposit to activate a trading account',
      price: '250',
      priceCurrency: 'AUD',
    },
  }
}

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  name: 'Zephgain',
  url: SITE,
  publisher: { '@id': `${SITE}/#organization` },
  inLanguage: 'en-AU',
}

function webPage(name, url, description) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { '@id': `${SITE}/#website` },
    publisher: { '@id': `${SITE}/#organization` },
    inLanguage: 'en-AU',
  }
}

function breadcrumb(name, path) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name, item: `${SITE}${path}` },
    ],
  }
}

// FAQ schema is generated from the same FAQ content rendered on the
// homepage — never duplicated or invented.
function faqPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

const homeDescription =
  'Zephgain — AI-powered automated trading platform for Australia. 24/7 automated strategies, live signals, bank-grade security. Start with just AU$250.'

export const seo = {
  home: {
    title: 'Zephgain — AI-Powered Automated Trading Platform in Australia',
    description: homeDescription,
    keywords:
      'automated trading platform australia, AI trading platform, automated crypto trading, Zephgain, AI trading Australia',
    canonical: `${SITE}/`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'Zephgain — AI-powered automated trading platform for Australia',
    schema: [organization, website, webPage('Zephgain — AI-Powered Automated Trading Platform in Australia', `${SITE}/`, homeDescription), faqPageSchema(), serviceSchema()],
  },

  about: {
    title: 'About Zephgain — Automated Trading Without the Complexity',
    description:
      'Learn about Zephgain, the AI trading platform trusted by 4M+ users — automated analysis, bank-grade security, and 24/7 support for Australian traders.',
    keywords: 'about Zephgain, Zephgain trading platform, automated trading platform australia, AI trading company',
    canonical: `${SITE}/about`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'About Zephgain — automated trading without the complexity',
    schema: [
      webPage('About Zephgain', `${SITE}/about`, 'About the Zephgain AI-driven automated trading platform — automated market analysis, bank-grade security, and 24/7 support.'),
      breadcrumb('About Us', '/about'),
    ],
  },

  contact: {
    title: 'Contact Zephgain — 24/7 Support for Australian Traders',
    description:
      'Have a question about Zephgain or automated trading? Contact our 24/7 support team by email or the registration form — we usually reply within a few hours.',
    keywords: 'contact Zephgain, Zephgain support, automated trading help, Zephgain Australia support',
    canonical: `${SITE}/contact`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'Contact Zephgain support — 24/7 assistance for Australian traders',
    schema: [
      webPage('Contact Zephgain', `${SITE}/contact`, 'Contact the Zephgain support team — email and registration form, available around the clock.'),
      breadcrumb('Contact Us', '/contact'),
    ],
  },

  'how-it-works': {
    title: 'How Zephgain Works — Get Started in 3 Easy Steps',
    description:
      'Getting started with Zephgain takes about two minutes. Create your account, deposit from just AU$250, and let the AI trade around the clock — no hidden fees.',
    keywords: 'how to start automated trading, Zephgain sign up, AI trading steps, automated trading for beginners',
    canonical: `${SITE}/how-it-works`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'How Zephgain works — create your account, deposit, and start automated trading',
    schema: [
      webPage('How Zephgain Works', `${SITE}/how-it-works`, 'How to get started with Zephgain automated trading in three easy steps — create an account, deposit, and start trading.'),
      breadcrumb('How It Works', '/how-it-works'),
    ],
  },

  'why-invest': {
    title: 'Why Invest with Zephgain — Security & Simplicity',
    description:
      'Why 4M+ verified users choose Zephgain — 95% cold storage, 2FA, 256-bit SSL, transparent pricing, and automated AI trading for every level.',
    keywords: 'why invest with Zephgain, secure automated trading, Zephgain security, automated trading benefits',
    canonical: `${SITE}/why-invest`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'Why invest with Zephgain — security, simplicity, and transparency',
    schema: [
      webPage('Why Invest with Zephgain', `${SITE}/why-invest`, 'Why traders choose Zephgain — security, simplicity, and transparency in automated AI trading.'),
      breadcrumb('Why Invest', '/why-invest'),
    ],
  },

  terms: {
    title: 'Terms of Use — Zephgain Automated Trading Platform',
    description:
      'Read the Zephgain Terms of Use — the rules that govern use of the Zephgain AI-powered automated trading platform and its services for users in Australia.',
    keywords: 'Zephgain terms of use, automated trading terms, platform terms',
    canonical: `${SITE}/terms`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'Zephgain terms of use',
    schema: [
      webPage('Terms of Use', `${SITE}/terms`, 'The Zephgain Terms of Use — the rules governing use of the platform.'),
      breadcrumb('Terms of Use', '/terms'),
    ],
  },

  privacy: {
    title: 'Privacy Policy — Zephgain Automated Trading Platform',
    description:
      'Read the Zephgain Privacy Policy — how Zephgain collects, uses, and protects your personal information on the automated trading platform.',
    keywords: 'Zephgain privacy policy, data protection, trading platform privacy',
    canonical: `${SITE}/privacy`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'Zephgain privacy policy',
    schema: [
      webPage('Privacy Policy', `${SITE}/privacy`, 'The Zephgain Privacy Policy — how personal information is collected and protected.'),
      breadcrumb('Privacy Policy', '/privacy'),
    ],
  },

  disclosure: {
    title: 'Risk Disclosure — Zephgain Automated Trading Platform',
    description:
      'Read the Zephgain Risk Disclosure — important information about the risks of trading FX, CFDs, and cryptocurrencies on the automated trading platform.',
    keywords: 'Zephgain risk disclosure, trading risk warning, CFD crypto risk',
    canonical: `${SITE}/disclosure`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'Zephgain risk disclosure',
    schema: [
      webPage('Risk Disclosure', `${SITE}/disclosure`, 'The Zephgain Risk Disclosure — information about the risks of trading FX, CFDs, and cryptocurrencies.'),
      breadcrumb('Risk Disclosure', '/disclosure'),
    ],
  },

  'thank-you': {
    title: 'Thank You — Zephgain Registration',
    description:
      'Your Zephgain registration has been received. Our team will review your details and contact you shortly to activate your account.',
    keywords: '',
    canonical: `${SITE}/thank-you`,
    robots: 'noindex, nofollow',
    type: 'website',
    ogImageAlt: 'Thank you — Zephgain registration',
    schema: [],
  },

  404: {
    title: 'Page Not Found — Zephgain',
    description: "The page you're looking for doesn't exist or has been moved. Return to the Zephgain homepage or contact support.",
    keywords: '',
    canonical: null, // 404 page carries no canonical — it is noindexed
    robots: 'noindex, nofollow',
    type: 'website',
    ogImageAlt: 'Page not found — Zephgain',
    schema: [],
  },
}
