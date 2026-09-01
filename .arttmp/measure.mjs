// Measure computed styles at capture time to find why nothing paints
const PORT = 9222
const BASE = 'http://localhost:5173'

async function main() {
  const list = await (await fetch(`http://localhost:${PORT}/json/list`)).json()
  const page = list.find((t) => t.type === 'page')
  const ws = new WebSocket(page.webSocketDebuggerUrl)
  let id = 0
  const pending = new Map()
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const i = ++id
      pending.set(i, { resolve, reject })
      ws.send(JSON.stringify({ id: i, method, params }))
    })
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data)
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id)
      pending.delete(msg.id)
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result)
    }
  }
  await new Promise((r) => (ws.onopen = r))
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

  await send('Page.enable')
  await send('Runtime.enable')
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false })
  await send('Page.navigate', { url: `${BASE}/?v=msr#/` })
  await sleep(2500)

  const res = await send('Runtime.evaluate', {
    expression: `(async () => {
      const cs = (el) => { const s = getComputedStyle(el); return { op: s.opacity, tf: s.transform, disp: s.display, vis: s.visibility } }
      const visual = document.querySelector('.feat-duo .exp-visual')
      const card = document.querySelector('.feat-duo .exp-card')
      const bars = document.querySelectorAll('.feat-duo .bar-chart i')
      const before = { visual: visual ? cs(visual) : null, card: card ? cs(card) : null,
        bar0: bars[0] ? { ...cs(bars[0]), bg: getComputedStyle(bars[0]).backgroundImage } : null,
        barCount: bars.length }
      // force .in like the export flow
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'))
      const el = visual
      const y = el.getBoundingClientRect().top + window.scrollY - window.innerHeight / 2
      window.scrollTo({ top: Math.max(0, Math.floor(y)), behavior: 'instant' })
      await new Promise(r => setTimeout(r, 1000))
      const bars2 = document.querySelectorAll('.feat-duo .bar-chart i')
      const after = { visual: cs(visual), card: cs(card), badge: cs(document.querySelector('.feat-duo .exp-badge')),
        bar0: bars2[0] ? { ...cs(bars2[0]), bg: getComputedStyle(bars2[0]).backgroundImage, h: Math.round(bars2[0].getBoundingClientRect().height) } : null,
        barCount: bars2.length, scrollY: window.scrollY,
        cardRect: card ? (() => { const r = card.getBoundingClientRect(); return { t: Math.round(r.top), b: Math.round(r.bottom), l: Math.round(r.left), w: Math.round(r.width) } })() : null }
      return { before, after }
    })()`,
    returnByValue: true,
    awaitPromise: true,
  })
  if (res.exceptionDetails) console.log('EXC:', res.exceptionDetails.exception?.description || res.exceptionDetails.text)
  console.log(JSON.stringify(res.result?.result?.value ?? res.result?.value, null, 1))
  ws.close()
}
main().catch((e) => { console.error('ERR', e.message); process.exit(1) })
