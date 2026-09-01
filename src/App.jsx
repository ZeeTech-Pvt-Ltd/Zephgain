import { useEffect, useState } from 'react'
import useReveal from './hooks/useReveal.js'
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
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Terms from './components/Terms.jsx'
import Privacy from './components/Privacy.jsx'
import RiskDisclosure from './components/RiskDisclosure.jsx'
import NotFound from './components/NotFound.jsx'

// Clean-path routing: "/" -> home, "/about" -> About, anything unknown -> 404.
// Fragment anchors like "#register" keep working as in-page scroll links.
const KNOWN_ROUTES = ['about', 'contact', 'terms', 'privacy', 'disclosure']

const getRoute = (path = location.pathname) => {
  const clean = path.split('?')[0].replace(/\/+$/, '')
  if (!clean || clean === '/') return 'home'
  const first = clean.slice(1)
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

  if (route === 'about') {
    return (
      <>
        <Header route="about" />
        <main>
          <About />
        </main>
        <Footer />
      </>
    )
  }

  if (route === 'contact') {
    return (
      <>
        <Header route="contact" />
        <main>
          <Contact />
        </main>
        <Footer />
      </>
    )
  }

  if (route === 'terms') {
    return (
      <>
        <Header route="terms" />
        <main>
          <Terms />
        </main>
        <Footer />
      </>
    )
  }

  if (route === 'privacy') {
    return (
      <>
        <Header route="privacy" />
        <main>
          <Privacy />
        </main>
        <Footer />
      </>
    )
  }

  if (route === 'disclosure') {
    return (
      <>
        <Header route="disclosure" />
        <main>
          <RiskDisclosure />
        </main>
        <Footer />
      </>
    )
  }

  // Unknown path -> 404 page
  if (route === '404') {
    return (
      <>
        <Header route="404" />
        <main>
          <NotFound />
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />

      <main>
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
          text="At Zephgain, we're a team of innovators, analysts, and engineers focused on advancing the world of automated trading. Join thousands of verified traders across Australia today."
          cta="Register Now"
        />

        <Testimonials />
        <Portfolio />
        <Faq />
        <Capabilities />
        <FinalCta />
      </main>

      <Footer />
    </>
  )
}
