// Payment brand marks — lightweight inline SVGs (no external requests)
export function Visa({ w = 38, h = 11 }) {
  return (
    <svg width={w} height={h} viewBox="0 0 38 11" fill="none">
      <text x="0" y="10" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontStyle="italic" fontSize="11" fill="#1A1F71">VISA</text>
    </svg>
  )
}

export function Mastercard({ w = 20, h = 20 }) {
  return (
    <svg width={w} height={h} viewBox="0 0 24 24">
      <circle cx="8.5" cy="12" r="6.5" fill="#EB001B" />
      <circle cx="15.5" cy="12" r="6.5" fill="#F79E1B" />
      {/* overlap lens */}
      <circle cx="8.5" cy="12" r="6.5" fill="#FF5F00" clipPath="url(#mcLens)" />
      <defs>
        <clipPath id="mcLens">
          <circle cx="15.5" cy="12" r="6.5" />
        </clipPath>
      </defs>
    </svg>
  )
}

export function PayPal({ w = 46, h = 12 }) {
  return (
    <svg width={w} height={h} viewBox="0 0 46 12" fill="none">
      <text x="0" y="10.5" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontStyle="italic" fontSize="11" fill="#003087">PayPal</text>
    </svg>
  )
}

export function GooglePay({ w = 52, h = 20 }) {
  return (
    <svg width={w} height={h} viewBox="0 0 52 20" fill="none">
      <path fill="#4285F4" d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.83h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.9-1.75 2.99-4.33 2.99-7.35Z" />
      <path fill="#34A853" d="M10 20c2.7 0 4.96-.9 6.61-2.42l-3.23-2.5c-.9.6-2.04.95-3.38.95-2.6 0-4.8-1.76-5.58-4.12H1.1v2.58A10 10 0 0 0 10 20Z" />
      <path fill="#FBBC05" d="M4.42 11.91a6 6 0 0 1 0-3.82V5.51H1.1a10 10 0 0 0 0 8.98l3.32-2.58Z" />
      <path fill="#EA4335" d="M10 4a5.44 5.44 0 0 1 3.85 1.5l2.88-2.88A9.7 9.7 0 0 0 10 0 10 10 0 0 0 1.1 5.51l3.32 2.58C5.2 5.76 7.4 4 10 4Z" />
      <text x="23" y="16" fontFamily="Arial, Helvetica, sans-serif" fontWeight="600" fontSize="13.5" fill="#5F6368">Pay</text>
    </svg>
  )
}

export function BankTransfer({ w = 18, h = 18 }) {
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="#3A4350" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M4 21V10m5 11V10m6 11V10m5 11V10M3 10l9-7 9 7M2 10h20" />
    </svg>
  )
}
