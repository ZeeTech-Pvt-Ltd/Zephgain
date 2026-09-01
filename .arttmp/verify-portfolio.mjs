// CDP: verify Portfolio card enlargement + export webp of the visual
import fs from 'node:fs'
const PORT = 9222
const BASE = 'http://localhost:5173'

async function main() {
  const list = await (await fetch(`http://localhost:${PORT}/json/list`)).json()
  const page = list.find((t) => t.type === 'page')
  const ws = new WebSocket(page.webSocketDebuggerUrl)
  let id = 0
  const pending = new Map()
  const exceptions = []
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
    } else if (msg.method === 'Runtime.exceptionThrown') {
      exceptions.push(msg.params.exceptionDetails.text)
    }
  }
  await new Promise((r) => (ws.onopen = r))
  const evaluate = async (expression) => {
    const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
    if (res.exceptionDetails) throw new Error('eval: ' + (res.exceptionDetails.exception?.description || res.exceptionDetails.text))
    return res.result.value
  }
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

  await send('Page.enable')
  await send('Runtime.enable')

  async function check(width, height, label) {
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false })
    await send('Page.navigate', { url: `${BASE}/?v=pf-${width}#/` })
    await sleep(2400)
    await evaluate(`(async () => { const s = document.querySelector('#contact'); if (s) s.scrollIntoView({ block: 'center' }); await new Promise(r => setTimeout(r, 600)); return true })()`)
    const d = await evaluate(`(() => {
      const card = document.querySelector('.feat-duo .exp-card')
      const chart = document.querySelector('.feat-duo .bar-chart')
      const featCards = document.querySelectorAll('#features .feat-card').length
      const expCard = document.querySelector('.exp-sec .exp-card')
      const doc = document.documentElement
      const cr = card.getBoundingClientRect()
      return {
        card: [Math.round(cr.width), Math.round(cr.height)],
        chart: chart ? Math.round(chart.getBoundingClientRect().height) : null,
        featCardsInFeatures: featCards,
        expCardW: expCard ? Math.round(expCard.getBoundingClientRect().width) : null,
        cardVisible: cr.top >= 0 && cr.top < ${height},
        overflowX: Math.round(doc.scrollWidth) - Math.round(doc.clientWidth),
      }
    })()`)
    console.log(`[${label}]`, JSON.stringify(d))
  }

  await check(1440, 900, 'desktop')
  await check(375, 812, 'mobile')

  // ---- Export webp at 1x (known-good pattern: clip coords are CSS px at DSF 1) ----
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false })
  await send('Page.navigate', { url: `${BASE}/?v=pfx#/` })
  await sleep(2500)
  // force all reveals visible + instant (auto) scroll to the visual
  await evaluate(`(async () => {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'))
    const el = document.querySelector('.feat-duo .exp-visual')
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - window.innerHeight / 2
      window.scrollTo({ top: Math.max(0, Math.floor(y)), behavior: 'instant' })
    }
    await new Promise(r => setTimeout(r, 600))
    return true
  })()`)
  const clip = await evaluate(`(() => {
    const vis = document.querySelector('.feat-duo .exp-visual')
    const badge = document.querySelector('.feat-duo .exp-badge')
    if (!vis) return null
    const rects = [vis.getBoundingClientRect(), badge ? badge.getBoundingClientRect() : null].filter(Boolean)
    const x0 = Math.min(...rects.map(r => r.left)), y0 = Math.min(...rects.map(r => r.top))
    const x1 = Math.max(...rects.map(r => r.right)), y1 = Math.max(...rects.map(r => r.bottom))
    const pad = 10
    const x = Math.max(0, Math.floor(x0) - pad), y = Math.max(0, Math.floor(y0) - pad)
    const width = Math.min(Math.ceil(x1 - x0) + pad * 2, 1440 - x)
    const height = Math.min(Math.ceil(y1 - y0) + pad * 2, 1000 - y)
    const card = document.querySelector('.feat-duo .exp-card')
    const cr = card ? card.getBoundingClientRect() : null
    return { clip: { x, y, width, height }, cardH: cr ? Math.round(cr.height) : null, visH: Math.round(vis.getBoundingClientRect().height) }
  })()`)
  console.log('clip:', clip)
  const shot = await send('Page.captureScreenshot', { format: 'webp', quality: 92, clip: { ...clip.clip, scale: 1 } })
  fs.writeFileSync('C:/Users/tazee/Downloads/zephgain.com/public/portfolio-visual.webp', Buffer.from(shot.data, 'base64'))
  const st = fs.statSync('C:/Users/tazee/Downloads/zephgain.com/public/portfolio-visual.webp')
  console.log('webp saved:', clip.clip, '->', st.size, 'bytes')

  console.log('exceptions:', exceptions.length ? exceptions : 'none')
  ws.close()
}
main().catch((e) => { console.error('FAIL', e.message); process.exit(1) })
