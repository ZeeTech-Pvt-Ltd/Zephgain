// Capture just the registration card (desktop + mobile) for visual check
import { spawn } from 'node:child_process'
import { writeFileSync, mkdirSync } from 'node:fs'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9334
const URL = 'http://localhost:5174/'
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

async function main() {
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, '--disable-gpu', '--no-first-run', '--window-size=1440,1000', 'about:blank'], { stdio: 'ignore' })
  let page
  for (let i = 0; i < 50; i++) { try { const l = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); page = l.find((t) => t.type === 'page'); if (page) break } catch {} await wait(200) }
  const ws = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej })
  let id = 0; const pending = new Map()
  ws.onmessage = (ev) => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id) } }
  const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })) })

  await send('Page.enable'); await send('Runtime.enable')
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false })
  await send('Page.navigate', { url: URL }); await wait(3000)

  const capCard = async (file) => {
    const r = await send('Runtime.evaluate', { expression: `(() => { const el = document.querySelector('.form-wrap'); const b = el.getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height, card: b.height } })()`, returnByValue: true })
    const c = r.result.result.value
    const clip = { x: c.x - 24, y: c.y - 24, width: c.w + 48, height: c.h + 48, scale: 1 }
    const shot = await send('Page.captureScreenshot', { format: 'png', clip })
    writeFileSync(file, Buffer.from(shot.result.data, 'base64'))
    return c
  }

  const desk = await capCard('.verify/card-desktop.png')
  console.log('DESKTOP CARD:', JSON.stringify(desk))

  // focused pay-row capture
  const pr = await send('Runtime.evaluate', { expression: `(() => { const el = document.querySelector('.pay-row'); const b = el.getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height } })()`, returnByValue: true })
  const pc = pr.result.result.value
  const pclip = { x: pc.x - 6, y: pc.y - 6, width: pc.w + 12, height: pc.h + 12, scale: 2 }
  const pshot = await send('Page.captureScreenshot', { format: 'png', clip: pclip })
  writeFileSync('.verify/pay-row.png', Buffer.from(pshot.result.data, 'base64'))
  console.log('PAY ROW:', JSON.stringify(pc))

  await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 2, mobile: true })
  await wait(800)
  const r = await send('Runtime.evaluate', { expression: `(() => { const el = document.querySelector('.form-wrap'); el.scrollIntoView({ block: 'center' }); const b = el.getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height } })()`, returnByValue: true })
  const c = r.result.result.value
  const clip = { x: c.x - 16, y: c.y - 16, width: c.w + 32, height: c.h + 32, scale: 2 }
  const shot = await send('Page.captureScreenshot', { format: 'png', clip })
  writeFileSync('.verify/card-mobile.png', Buffer.from(shot.result.data, 'base64'))
  console.log('MOBILE CARD:', JSON.stringify(c))

  ws.close(); chrome.kill(); process.exit(0)
}
main().catch((e) => { console.error(e); process.exit(1) })
