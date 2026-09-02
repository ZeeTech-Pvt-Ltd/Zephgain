import { lazy, Suspense, useEffect, useState } from 'react'
import useReveal from './hooks/useReveal.js'
import Seo from './components/Seo.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Metrics from './components/Metrics.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Experience from './components/Experience.jsx'
import Priorities from './components/Priorities.jsx'
import Features from './components/Features.jsx'
import Precision from './components/Precision.jsx'
import CtaBanner from './components/CtaBanner.jsx'
import Testimonials from './components/Testimonials.jsx'
import Portfolio from './components/Portfolio.jsx'
import Faq from './components/Faq.jsx'
import Capabilities from './components/Capabilities.jsx'
import FinalCta from './components/FinalCta.jsx'
import Footer from './components/Footer.jsx'

// Route pages are code-split: each lazy chunk only loads when its route is
// visited, so the home page (the landing page) ships a smaller initial bundle.
// Home sections (Hero…FinalCta) stay eager — they're above/below the fold on
// the page most visitors land on first.
const About = lazy(() => import('./components/About.jsx'))
const Contact = lazy(() => import('./components/Contact.jsx'))
const Terms = lazy(() => import('./components/Terms.jsx'))
const Privacy = lazy(() => import('./components/Privacy.jsx'))
const RiskDisclosure = lazy(() => import('./components/RiskDisclosure.jsx'))
const NotFound = lazy(() => import('./components/NotFound.jsx'))
const ThankYou = lazy(() => import('./components/ThankYou.jsx'))

// Clean-path routing: "/" -> home, "/about" -> About, anything unknown -> 404.
// Fragment anchors like "#register" keep working as in-page scroll links.
const KNOWN_ROUTES = ['about', 'contact', 'terms', 'privacy', 'disclosure', 'thank-you', 'how-it-works', 'why-invest']

// Legacy case-variant paths redirect to their canonical lowercase form
// (the page used to live at /How-It-Works).
const LEGACY_PATHS = { '/How-It-Works': '/how-it-works' }

const getRoute = (path = location.pathname) => {
  const clean = path.split('?')[0].replace(/\/+$/, '')
  if (!clean || clean === '/') return 'home'
  const first = LEGACY_PATHS[clean] ? LEGACY_PATHS[clean].slice(1) : clean.slice(1)
  return KNOWN_ROUTES.includes(first) ? first : '404'
}

export default function App() {
  const [route, setRoute] = useState(getRoute)
  useReveal(route)

  // Migrate old "#/about"-style links (shared before clean URLs) to clean paths.
  useEffect(() => {
    const h = location.hash
    if (h.startsWith('#/')) {
      const p = h.slice(2).split('?')[0]
      history.replaceState(null, '', p || '/')
      setRoute(getRoute())
    }
  }, [])

  // Legacy case-variant paths (e.g. /How-It-Works) rewrite to lowercase in the URL bar.
  useEffect(() => {
    const clean = location.pathname.replace(/\/+$/, '')
    const target = LEGACY_PATHS[clean]
    if (target) {
      history.replaceState(null, '', target)
      setRoute(getRoute())
    }
  }, [])

  // Back/forward navigation between clean paths (pushState entries).
  useEffect(() => {
    const onPop = () => {
      const next = getRoute()
      setRoute(next)
      if (next !== 'home') window.scrollTo(0, 0)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // SPA link handling: "/about"-style links navigate without a page reload;
  // section anchors (#register, #how…) scroll on the current page but keep the
  // URL clean — no "#" fragment appears. On route pages they go home first,
  // since those sections only exist on home.
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href]')
      if (!a) return
      const href = a.getAttribute('href')
      if (!href) return

      // Placeholder links (footer socials) — keep URL clean, do nothing.
      if (href === '#') {
        e.preventDefault()
        return
      }

      // In-page scroll links carry a clean "/" href (so the URL bar and the
      // hover preview stay hash-free) plus a data-scroll target. On route
      // pages they go home first, since those sections only exist on home.
      const scrollTo = a.getAttribute('data-scroll')
      if (scrollTo) {
        e.preventDefault()
        const doScroll = () => {
          if (scrollTo === '#top') window.scrollTo(0, 0)
          else document.querySelector(scrollTo)?.scrollIntoView()
        }
        if (route === 'home') doScroll()
        else {
          history.pushState(null, '', '/')
          setRoute('home')
          setTimeout(doScroll, 100)
        }
        return
      }

      if (href.startsWith('#')) {
        e.preventDefault()
        const doScroll = () => {
          if (href === '#top') window.scrollTo(0, 0)
          else document.querySelector(href)?.scrollIntoView()
        }
        if (route === 'home') doScroll()
        else {
          history.pushState(null, '', '/')
          setRoute('home')
          setTimeout(doScroll, 100)
        }
        return
      }

      if (/^(https?:)?\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')) return

      if (href.startsWith('/')) {
        const next = getRoute(href)
        if (next === route) {
          // Same page — just scroll to top, no reload.
          e.preventDefault()
          window.scrollTo(0, 0)
          return
        }
        e.preventDefault()
        history.pushState(null, '', href)
        setRoute(next)
        window.scrollTo(0, 0)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [route])

  // Brief branded placeholder shown while a code-split route chunk loads.
  // min-height keeps the page stable so the header/footer don't jump.
  const PageFallback = () => (
    <div className="route-loading" role="status" aria-label="Loading page">
      <span className="route-spinner" aria-hidden="true" />
    </div>
  )

  // Shared page shell — SEO head metadata, header, main, footer.
  // Suspense wraps only the page content: the header/footer stay mounted
  // (no flash) while a lazy route chunk is still downloading.
  const Layout = ({ routeName, children }) => (
    <>
      <Seo route={routeName} />
      <Header route={routeName} />
      <main>
        <Suspense fallback={<PageFallback />}>{children}</Suspense>
      </main>
      <Footer />
    </>
  )

  if (route === 'about') return <Layout routeName="about"><About /></Layout>
  if (route === 'contact') return <Layout routeName="contact"><Contact /></Layout>
  if (route === 'terms') return <Layout routeName="terms"><Terms /></Layout>
  if (route === 'privacy') return <Layout routeName="privacy"><Privacy /></Layout>
  if (route === 'disclosure') return <Layout routeName="disclosure"><RiskDisclosure /></Layout>
  if (route === 'thank-you') return <Layout routeName="thank-you"><ThankYou /></Layout>
  if (route === 'how-it-works') return <Layout routeName="how-it-works"><HowItWorks asPage /></Layout>
  if (route === 'why-invest') return <Layout routeName="why-invest"><Priorities asPage /></Layout>
  if (route === '404') return <Layout routeName="404"><NotFound /></Layout>

  return (
    <Layout routeName="home">
      <Hero />
      <Metrics />
      <HowItWorks />
      <Experience />
      <Priorities />
      <Features />
      <Precision />

      <CtaBanner
        eyebrow="Driven by Innovation"
        title="Built for Every Trader"
        text="Zephgain is built by a team of innovators, analysts, and engineers who are committed to advancing the world of automated trading. Join thousands of verified traders across Australia today."
        cta="Register Now"
      />

      <Testimonials />
      <Portfolio />
      {/* Spec table first, then FAQ last so the final doubt-handling flows
          straight into the final sign-up CTA (no dry table in between). */}
      <Capabilities />
      <Faq />
      <FinalCta />
    </Layout>
  )
}
