// =========================================================
// Per-route SEO configuration for Zephgain.
// Single source of truth for <title>, meta description, meta
// keywords, canonical URLs, robots rules, Open Graph, Twitter
// cards, and JSON-LD structured data - consumed by <Seo/>.
// Nothing here invents facts: all claims come from content.js.
// =========================================================
import { faq, reviewFaq, zephgainAppFaq } from './content.js'

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
    'Zephgain is an AI-powered automated trading platform for users in Australia - automated strategies, live market signals, and dependable security in one place.',
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

// The platform described as a schema.org Service, geo-scoped to Australia -
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
      'AI-powered automated trading platform for users in Australia - automated strategies, live market signals, and dependable security in one place.',
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

// FAQ schema is always generated from the same FAQ content that is rendered
// on the page it describes - never duplicated or invented.
function buildFaqPage(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      // When an answer carries a trailing read-more link (item.link), the same
      // sentence is appended here so the structured text matches the rendered
      // answer exactly (anchor text only, no markup).
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.link ? `${f.a} ${f.link.text}` : f.a,
      },
    })),
  }
}

// FAQ schema - mirrors the FAQ accordion on the /faq route.
function faqPageSchema() {
  return buildFaqPage(faq)
}

// /zephgain-review FAQ schema - mirrors the review page's own accordion.
function reviewFaqPageSchema() {
  return buildFaqPage(reviewFaq)
}

// /zephgain-app FAQ schema - mirrors the page's own accordion.
function zephgainAppFaqPageSchema() {
  return buildFaqPage(zephgainAppFaq)
}

const homeDescription =
  'Zephgain - AI-powered automated trading platform for Australia. 24/7 automated strategies, live signals, bank-grade security. Start with just AU$250.'

export const seo = {
  home: {
    title: 'Zephgain - AI-Powered Automated Trading Platform in Australia',
    description: homeDescription,
    keywords:
      'automated trading platform australia, AI trading platform, automated crypto trading, Zephgain, AI trading Australia',
    canonical: `${SITE}/`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'Zephgain - AI-powered automated trading platform for Australia',
    schema: [organization, website, webPage('Zephgain - AI-Powered Automated Trading Platform in Australia', `${SITE}/`, homeDescription), serviceSchema()],
  },

  about: {
    title: 'About Zephgain - Automated Trading Without the Complexity',
    description:
      'Learn about Zephgain, the AI trading platform trusted by 4M+ users - automated analysis, bank-grade security, and 24/7 support for Australian traders.',
    keywords: 'about Zephgain, Zephgain trading platform, automated trading platform australia, AI trading company',
    canonical: `${SITE}/about`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'About Zephgain - automated trading without the complexity',
    schema: [
      webPage('About Zephgain', `${SITE}/about`, 'About the Zephgain AI-driven automated trading platform - automated market analysis, bank-grade security, and 24/7 support.'),
      breadcrumb('About Us', '/about'),
    ],
  },

  contact: {
    title: 'Contact Zephgain - 24/7 Support for Australian Traders',
    description:
      'Have a question about Zephgain or automated trading? Contact our 24/7 support team by email or the registration form - we usually reply within a few hours.',
    keywords: 'contact Zephgain, Zephgain support, automated trading help, Zephgain Australia support',
    canonical: `${SITE}/contact`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'Contact Zephgain support - 24/7 assistance for Australian traders',
    schema: [
      webPage('Contact Zephgain', `${SITE}/contact`, 'Contact the Zephgain support team - email and registration form, available around the clock.'),
      breadcrumb('Contact Us', '/contact'),
    ],
  },

  'zephgain-review': {
    title: 'Zephgain Review 2026 - Fees, Safety & How It Works',
    description:
      'An official Zephgain review for Australian traders: how the platform works, the AU$250 minimum deposit, withdrawal times, security, and the risks involved.',
    keywords:
      'zephgain review, is zephgain legit, zephgain minimum deposit, zephgain withdrawal, zephgain safe, zephgain review australia',
    canonical: `${SITE}/zephgain-review`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'article',
    ogImageAlt: 'Zephgain review 2026 - fees, safety, and how the platform works for Australian traders',
    schema: [
      webPage('Zephgain Review', `${SITE}/zephgain-review`, 'An official Zephgain review for Australian traders - how the platform works, the AU$250 minimum deposit, withdrawal times, security, and the risks involved.'),
      breadcrumb('Zephgain Review', '/zephgain-review'),
      reviewFaqPageSchema(),
    ],
  },

  faq: {
    title: 'FAQ - Zephgain Automated Trading Platform',
    description:
      'Answers to the most common questions about Zephgain - how the platform works, the AU$250 minimum deposit, security, withdrawals, and how to spot fake Zephgain apps.',
    keywords:
      'Zephgain FAQ, Zephgain help, automated trading questions, is Zephgain legit, Zephgain minimum deposit, Zephgain withdrawal',
    canonical: `${SITE}/faq`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'Zephgain FAQ - frequently asked questions about the automated trading platform',
    schema: [
      webPage('FAQ', `${SITE}/faq`, 'Answers to the most common questions about the Zephgain automated trading platform - deposits, security, withdrawals, and account safety.'),
      breadcrumb('FAQ', '/faq'),
      faqPageSchema(),
    ],
  },

  'zephgain-app': {
    title: 'Is There a Zephgain App? - No, Zephgain Runs in Your Browser',
    description:
      'There is no Zephgain mobile app. Zephgain runs in your web browser - learn how to use it on your phone and how to spot fake Zephgain apps, APK files, and scam sites.',
    keywords:
      'Zephgain app, Zephgain mobile app, fake Zephgain app, Zephgain APK, is there a Zephgain app, Zephgain app store',
    canonical: `${SITE}/zephgain-app`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'Is there a Zephgain app? - no, Zephgain runs in your browser',
    schema: [
      webPage('Is There a Zephgain App?', `${SITE}/zephgain-app`, 'There is no Zephgain mobile app - learn how to use Zephgain in your browser and how to spot fake Zephgain apps.'),
      breadcrumb('Zephgain App', '/zephgain-app'),
      zephgainAppFaqPageSchema(),
    ],
  },

  terms: {
    title: 'Terms of Use - Zephgain Automated Trading Platform',
    description:
      'Read the Zephgain Terms of Use - the rules that govern use of the Zephgain AI-powered automated trading platform and its services for users in Australia.',
    keywords: 'Zephgain terms of use, automated trading terms, platform terms',
    canonical: `${SITE}/terms`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'Zephgain terms of use',
    schema: [
      webPage('Terms of Use', `${SITE}/terms`, 'The Zephgain Terms of Use - the rules governing use of the platform.'),
      breadcrumb('Terms of Use', '/terms'),
    ],
  },

  privacy: {
    title: 'Privacy Policy - Zephgain Automated Trading Platform',
    description:
      'Read the Zephgain Privacy Policy - how Zephgain collects, uses, and protects your personal information on the automated trading platform.',
    keywords: 'Zephgain privacy policy, data protection, trading platform privacy',
    canonical: `${SITE}/privacy`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'Zephgain privacy policy',
    schema: [
      webPage('Privacy Policy', `${SITE}/privacy`, 'The Zephgain Privacy Policy - how personal information is collected and protected.'),
      breadcrumb('Privacy Policy', '/privacy'),
    ],
  },

  disclosure: {
    title: 'Risk Disclosure - Zephgain Automated Trading Platform',
    description:
      'Read the Zephgain Risk Disclosure - important information about the risks of trading FX, CFDs, and cryptocurrencies on the automated trading platform.',
    keywords: 'Zephgain risk disclosure, trading risk warning, CFD crypto risk',
    canonical: `${SITE}/disclosure`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'Zephgain risk disclosure',
    schema: [
      webPage('Risk Disclosure', `${SITE}/disclosure`, 'The Zephgain Risk Disclosure - information about the risks of trading FX, CFDs, and cryptocurrencies.'),
      breadcrumb('Risk Disclosure', '/disclosure'),
    ],
  },

  'thank-you': {
    title: 'Thank You - Zephgain Registration',
    description:
      'Your Zephgain registration has been received. Our team will review your details and contact you shortly to activate your account.',
    keywords: '',
    canonical: `${SITE}/thank-you`,
    robots: 'noindex, nofollow',
    type: 'website',
    ogImageAlt: 'Thank you - Zephgain registration',
    schema: [],
  },

  404: {
    title: 'Page Not Found - Zephgain',
    description: "The page you're looking for doesn't exist or has been moved. Return to the Zephgain homepage or contact support.",
    keywords: '',
    canonical: null, // 404 page carries no canonical - it is noindexed
    robots: 'noindex, nofollow',
    type: 'website',
    ogImageAlt: 'Page not found - Zephgain',
    schema: [],
  },
}
