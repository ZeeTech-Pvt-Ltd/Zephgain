// Live market ticker — pure CSS marquee, duplicated once for a seamless loop
const items = [
  { sym: 'BTC/USD', price: '61,248', chg: '+2.4%', up: true },
  { sym: 'ETH/USD', price: '3,412', chg: '+1.8%', up: true },
  { sym: 'EUR/USD', price: '1.0842', chg: '+0.12%', up: true },
  { sym: 'AUD/USD', price: '0.6631', chg: '+0.08%', up: true },
  { sym: 'XAU/USD', price: '2,318', chg: '-0.22%', up: false },
  { sym: 'S&P 500', price: '5,682', chg: '+0.44%', up: true },
  { sym: 'NASDAQ', price: '18,291', chg: '+0.31%', up: true },
  { sym: 'GBP/USD', price: '1.2785', chg: '-0.05%', up: false },
]

export default function Ticker() {
  const doubled = [...items, ...items]
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {doubled.map((it, i) => (
          <span className="ticker-item" key={i}>
            <b>{it.sym}</b>
            <span className="ticker-price">{it.price}</span>
            <em className={it.up ? 'up' : 'down'}>{it.chg}</em>
          </span>
        ))}
      </div>
    </div>
  )
}
