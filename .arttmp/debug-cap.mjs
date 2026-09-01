// Debug: isolate the captureScreenshot failure on the live page
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
  await send('Page.navigate', { url: `${BASE}/?v=dbg#/` })
  await sleep(2500)

  // scroll visual into view
  await send('Runtime.evaluate', {
    expression: `(async () => {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'))
      const el = document.querySelector('.feat-duo .exp-visual')
      const y = el.getBoundingClientRect().top + window.scrollY - window.innerHeight / 2
      window.scrollTo({ top: Math.max(0, Math.floor(y)), behavior: 'instant' })
      await new Promise(r => setTimeout(r, 600))
      const b = el.getBoundingClientRect()
      return { top: b.top, bottom: b.bottom, ih: window.innerHeight, iw: window.innerWidth }
    })()`,
    returnByValue: true,
    awaitPromise: true,
  })
  await sleep(200)

  const tests = [
    ['full-webp', { format: 'webp' }],
    ['full-png', { format: 'png' }],
    ['clip-webp-noscale', { format: 'webp', clip: { x: 93, y: 456, width: 618, height: 415 } }],
    ['clip-webp-scale1', { format: 'webp', clip: { x: 93, y: 456, width: 618, height: 415, scale: 1 } }],
    ['clip-png-scale1', { format: 'png', clip: { x: 93, y: 456, width: 618, height: 415, scale: 1 } }],
    ['clip-webp-q90', { format: 'webp', quality: 90, clip: { x: 93, y: 456, width: 618, height: 415, scale: 1 } }],
  ]
  for (const [name, params] of tests) {
    try {
      const res = await send('Page.captureScreenshot', params)
      const size = res.data ? Math.round(res.data.length * 0.75) : 0
      console.log('OK  ', name, size + ' bytes')
      if (name.startsWith('clip')) fs.writeFileSync(`.arttmp/dbg-${name}.webp`, Buffer.from(res.data, 'base64'))
    } catch (e) {
      console.log('FAIL', name, '->', e.message)
    }
  }
  ws.close()
}
main().catch((e) => { console.error('ERR', e); process.exit(1) })
