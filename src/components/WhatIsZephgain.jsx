// What is Zephgain? — plain definitional block between the stats strip and
// How-it-works. Rendered eagerly on the homepage (no lazy mount) and without a
// .reveal class so the text is visible on first paint — nothing hides it.
export default function WhatIsZephgain() {
  return (
    <section className="section whatis">
      <div className="container">
        <div className="whatis-copy">
          <h2 className="h2">What is Zephgain?</h2>
          <p>
            Zephgain is an AI-powered automated trading platform available to verified
            residents of Australia. The system monitors live market data 24/7 across
            crypto, forex, equities, and commodities, then either places trades
            automatically on your behalf or hands you the signals to trade manually.
            Accounts open with a minimum deposit of AU$250, with no subscription fee.
          </p>
          <p>
            The platform is built for traders who want market exposure without reading
            charts all day. You keep full control of your account and can withdraw at any
            time. Zephgain provides technology and information tools only — it does not
            give personal financial advice.
          </p>
        </div>
      </div>
    </section>
  )
}
