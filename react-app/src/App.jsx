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

// Lightweight hash routing: "#/about" -> About page, anything else -> home.
// Plain anchors like "#register" keep working as in-page scroll links.
const getRoute = () => (location.hash.startsWith('#/') ? location.hash.slice(2).split('?')[0] : 'home')

// Routes with their own pages — anything else under "#/…" shows the 404 page.
// Note: "#/" (empty route) and any non-hash location resolve to home.
const KNOWN_ROUTES = ['about', 'contact', 'terms', 'privacy', 'disclosure']

export default function App() {
  const [route, setRoute] = useState(getRoute)
  useReveal(route)

  useEffect(() => {
    const onHash = () => {
      setRoute(getRoute())
      if (getRoute() !== 'home') window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // On route pages (about/contact), section-anchor links (#how, #faq…) must go
  // home first, then scroll — those sections only exist on the home page.
  useEffect(() => {
    if (route === 'home') return
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const href = a.getAttribute('href')
      if (!href || href.startsWith('#/')) return
      e.preventDefault()
      location.hash = '#/'
      setTimeout(() => document.querySelector(href)?.scrollIntoView(), 80)
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

  // Unknown "#/…" route -> 404 page
  if (route !== 'home' && route !== '' && !KNOWN_ROUTES.includes(route)) {
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
