import { useEffect, useMemo, useRef, useState } from 'react'
import { countries } from '../data/countries.js'

// ISO code -> real flag image (flagcdn.com) — same 20×15 flags as the reference.
// (Emoji flags don't render on Windows — they show as letters like "AU".)
const flagSrc = (code) => `https://flagcdn.com/w20/${code.toLowerCase()}.png`

// Pinned to the top of the list with a divider, like intl-tel-input's preferred countries
const preferredCodes = ['US', 'GB']

/**
 * PhoneNumberInput — ONE combined input field: [ 🇵🇰 +92 | number ]
 * Country selector (flag + calling code) on the left with a vertical divider,
 * phone number input on the right. Clicking the selector opens a searchable
 * country list; selecting a country updates the flag + calling code.
 */
export default function PhoneNumberInput({
  country, onCountryChange,
  value, onValueChange, onBlur,
  invalid, placeholder, id, name, autoComplete,
}) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const rootRef = useRef(null)
  const searchRef = useRef(null)
  const sel = countries.find((c) => c[0] === country) ?? countries[0]

  useEffect(() => {
    if (!open) return
    const onDoc = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    searchRef.current?.focus()
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return countries
    return countries.filter(([code, name, dial]) =>
      name.toLowerCase().includes(s) ||
      code.toLowerCase().includes(s) ||
      String(dial).includes(s.replace('+', '')),
    )
  }, [q])

  // Preferred countries pinned on top (in declared order) — hidden while searching
  const preferred = useMemo(
    () => (q.trim() ? [] : preferredCodes.map((code) => countries.find((c) => c[0] === code)).filter(Boolean)),
    [q],
  )

  const select = (c) => {
    onCountryChange(c[0])
    setOpen(false)
    setQ('')
  }

  const onSearchKey = (e) => {
    if (e.key === 'Enter' && filtered.length) select(filtered[0])
  }

  return (
    <div className={`pn-wrap ${invalid ? 'invalid' : ''}`} ref={rootRef}>
      <button
        type="button"
        className="pn-country"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Selected country ${sel[1]} (+${sel[2]})`}
      >
        <img className="cp-flag" src={flagSrc(sel[0])} alt="" width="20" height="15" />
        <span className="cp-dial">+{sel[2]}</span>
        <svg className="cp-chev" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <input
        className="pn-input"
        type="tel"
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onValueChange(e.target.value)}
        onBlur={onBlur}
        required
      />

      {open && (
        <div className="country-picker-drop">
          <div className="cp-search">
            <svg className="cp-search-ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <input
              ref={searchRef}
              type="search"
              placeholder="Search"
              role="combobox"
              aria-expanded="true"
              aria-label="Search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={onSearchKey}
            />
          </div>

          <ul className="cp-list" role="listbox" aria-label="List of countries">
            {preferred.map(([code, name, dial]) => (
              <li
                key={code}
                role="option"
                aria-selected={code === value}
                className={`cp-pref ${code === country ? 'sel' : ''}`}
                onClick={() => select([code, name, dial])}
              >
                <img className="cp-flag" src={flagSrc(code)} alt="" width="20" height="15" />
                <span className="cp-name">{name}</span>
                <span className="cp-dial">+{dial}</span>
              </li>
            ))}
            {preferred.length > 0 && <li className="cp-divider" role="separator" aria-disabled="true" />}
            {filtered.map(([code, name, dial]) => (
              <li
                key={code}
                role="option"
                aria-selected={code === country}
                className={code === country ? 'sel' : ''}
                onClick={() => select([code, name, dial])}
              >
                <img className="cp-flag" src={flagSrc(code)} alt="" width="20" height="15" />
                <span className="cp-name">{name}</span>
                <span className="cp-dial">+{dial}</span>
              </li>
            ))}
            {filtered.length === 0 && <li className="cp-empty">No results found</li>}
          </ul>
        </div>
      )}
    </div>
  )
}
