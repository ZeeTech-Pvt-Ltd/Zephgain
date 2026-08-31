import { useEffect, useMemo, useState } from 'react'
import Logo from './Logo.jsx'
import useScrollSpy from '../hooks/useScrollSpy.js'
import { nav } from '../data/content.js'

export default function Header({ route = 'home' }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const ids = useMemo(() => ['top', 'how', 'experience', 'priorities', 'faq', 'contact'], [])
  const active = useScrollSpy(ids)

  // On the About page the home sections don't exist, so "About Us" is active
  // and the anchor-based links are not.
  const isActive = (item) => {
    if (item.href === '#/about') return route === 'about'
    if (item.href === '#/contact') return route === 'contact'
    return route === 'home' && active === item.href.slice(1)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`} id="header">
      <div className="container header-inner">
        <Logo />

        <nav className="nav" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={isActive(item) ? 'active' : ''}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="btn btn-primary btn-signup" href="#register">Sign Up</a>
          <button
            className={`burger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <nav className={`mobile-menu container ${menuOpen ? 'open' : ''}`} aria-label="Mobile">
        {nav.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
          </a>
        ))}
        <a href="#register" onClick={() => setMenuOpen(false)}>Sign Up</a>
      </nav>
    </header>
  )
}
