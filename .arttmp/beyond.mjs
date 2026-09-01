// Test captureBeyondViewport with absolute page coords (no scroll needed)
import fs from 'node:fs'
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
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 2, mobile: false })
  await send('Page.navigate', { url: `${BASE}/?v=bnd#/` })
  await sleep(2500)

  // force reveals, wait for full paint (do NOT scroll)
  const res = await send('Runtime.evaluate', {
    expression: `(async () => {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'))
      await new Promise(r => setTimeout(r, 1200))
      const vis = document.querySelector('.feat-duo .exp-visual')
      const badge = document.querySelector('.feat-duo .exp-badge')
      const abs = (el) => { const b = el.getBoundingClientRect(); return { x: b.left + window.scrollX, y: b.top + window.scrollY, w: b.width, h: b.height } }
      const r1 = abs(vis), r2 = badge ? abs(badge) : null
      const x0 = Math.floor(Math.min(r1.x, r2 ? r2.x : r1.x)) - 10
      const y0 = Math.floor(Math.min(r1.y, r2 ? r2.y : r1.y)) - 10
      const x1 = Math.ceil(Math.max(r1.x + r1.w, r2 ? r2.x + r2.w : r1.x + r1.w)) + 10
      const y1 = Math.ceil(Math.max(r1.y + r1.h, r2 ? r2.y + r2.h : r1.y + r1.h)) + 10
      return { clip: { x: x0, y: y0, width: x1 - x0, height: y1 - y0 }, visRect: r1, scrollY: window.scrollY }
    })()`,
    returnByValue: true,
    awaitPromise: true,
  })
  if (res.exceptionDetails) console.log('EXC:', res.exceptionDetails.exception?.description || res.exceptionDetails.text)
  const clipInfo = res.result?.result?.value ?? res.result?.value
  console.log('abs clip:', JSON.stringify(clipInfo))
  const clip = clipInfo.clip
  const shot = await send('Page.captureScreenshot', { format: 'webp', quality: 92, clip: { ...clip, scale: 1 }, captureBeyondViewport: true })
  fs.writeFileSync('public/portfolio-visual.webp', Buffer.from(shot.data, 'base64'))
  const shot2 = await send('Page.captureScreenshot', { format: 'png', clip: { ...clip, scale: 1 }, captureBeyondViewport: true })
  fs.writeFileSync('.arttmp/portfolio-visual.png', Buffer.from(shot2.data, 'base64'))
  const st = fs.statSync('public/portfolio-visual.webp')
  console.log('beyond-webp saved:', JSON.stringify(clip), '->', st.size, 'bytes')
  ws.close()
}
main().catch((e) => { console.error('ERR', e.message); process.exit(1) })
