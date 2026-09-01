// Debug: after scroll, capture full viewport and locate the card rect
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
  await send('Page.navigate', { url: `${BASE}/?v=rt#/` })
  await sleep(2500)

  const rect = await send('Runtime.evaluate', {
    expression: `(async () => {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'))
      const el = document.querySelector('.feat-duo .exp-visual')
      const y = el.getBoundingClientRect().top + window.scrollY - window.innerHeight / 2
      window.scrollTo({ top: Math.max(0, Math.floor(y)), behavior: 'instant' })
      await new Promise(r => setTimeout(r, 600))
      const b = el.getBoundingClientRect()
      const badge = document.querySelector('.feat-duo .exp-badge').getBoundingClientRect()
      return { scrollY: window.scrollY, elTop: b.top, elBottom: b.bottom, cardTop: el.firstElementChild.getBoundingClientRect().top, badgeTop: badge.top, badgeBottom: badge.bottom, ih: window.innerHeight, docH: document.documentElement.scrollHeight }
    })()`,
    returnByValue: true,
    awaitPromise: true,
  })
  if (rect.exceptionDetails) console.log('EXC:', JSON.stringify(rect.exceptionDetails.exception?.description || rect.exceptionDetails.text))
  console.log('rect:', JSON.stringify(rect.result?.result?.value ?? rect.result?.value))

  // full-viewport screenshot right now
  const cap = await send('Page.captureScreenshot', { format: 'png' })
  fs.writeFileSync('.arttmp/debug-rect-full.png', Buffer.from(cap.data, 'base64'))
  console.log('full captured')
  ws.close()
}
main().catch((e) => { console.error('ERR', e.message); process.exit(1) })
