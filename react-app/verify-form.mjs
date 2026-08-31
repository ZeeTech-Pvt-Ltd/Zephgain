// Headless form verification via CDP — name row, phone code+flag, payment logos
import { spawn } from 'node:child_process'
import { mkdirSync } from 'node:fs'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9333
const URL = 'http://localhost:5174/'

function wait(ms) { return new Promise((r) => setTimeout(r, ms)) }

async function main() {
  const chrome = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${PORT}`, '--disable-gpu',
    '--no-first-run', '--no-default-browser-check', '--window-size=1440,1000', 'about:blank',
  ], { stdio: 'ignore' })

  // wait for debugging endpoint
  let page
  for (let i = 0; i < 50; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()
      page = list.find((t) => t.type === 'page')
      if (page) break
    } catch { /* not up yet */ }
    await wait(200)
  }
  if (!page) { console.error('CDP page target not found'); chrome.kill(); process.exit(1) }

  const ws = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej })
  let id = 0
  const pending = new Map()
  const errors = []
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data)
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id) }
    else if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.text + ': ' + (m.params.exceptionDetails.exception?.description || ''))
    else if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') errors.push(m.params.entry.text)
  }
  const send = (method, params = {}) => new Promise((res) => {
    const i = ++id
    pending.set(i, res)
    ws.send(JSON.stringify({ id: i, method, params }))
  })

  await send('Page.enable')
  await send('Runtime.enable')
  await send('Log.enable')
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false })
  await send('Page.navigate', { url: URL })
  await wait(3500)

  const evalJs = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
    if (r.result?.exceptionDetails) console.log('EXCEPTION:', r.result.exceptionDetails.exception?.description || r.result.exceptionDetails.text)
    if (r.error) console.log('CDP ERROR:', JSON.stringify(r.error))
    return r.result?.result?.value
  }

  // ——— layout checks (desktop) ———
  const layout = await evalJs(`(() => {
    const $ = (s) => document.querySelector(s)
    const rect = (s) => { const el = $(s); if (!el) return null; const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) } }
    const fn = rect('#first_name'), ln = rect('#last_name'), em = rect('#email')
    const sel = $('.country-select'), phone = rect('#phone')
    const chips = [...document.querySelectorAll('.pay')]
    const over = document.documentElement.scrollWidth - window.innerWidth
    return {
      nameSameRow: fn && ln && fn.y === ln.y && fn.x < ln.x,
      nameY: fn?.y, emailBelow: em && fn && em.y > fn.y,
      phoneRow: !!(sel && phone),
      selectText: sel ? sel.value + ' | ' + sel.options[sel.selectedIndex].text : null,
      selectRect: sel ? rect('.country-select') : null,
      phoneY: phone?.y,
      payCount: chips.length,
      paySvg: chips.every((c) => c.querySelector('svg')),
      payTitles: chips.map((c) => c.title),
      over,
    }
  })()`)

  console.log('DESKTOP LAYOUT:', JSON.stringify(layout, null, 2))

  // payment chip widths (desktop)
  const chipW = await evalJs(`(() => [...document.querySelectorAll('.pay')].map((c) => Math.round(c.getBoundingClientRect().width)))()`)
  console.log('CHIP WIDTHS:', JSON.stringify(chipW))

  // ——— validation still works ———
  const submitResult = await evalJs(`(async () => {
    const f = document.querySelector('#regForm')
    f.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    await new Promise((r) => setTimeout(r, 300))
    const errs = [...document.querySelectorAll('.field.error')].map((el) => el.querySelector('label')?.textContent)
    const phoneSel = document.querySelector('.country-select')
    // change country code to India, ensure hidden field updates
    phoneSel.value = 'IN'; phoneSel.dispatchEvent(new Event('change', { bubbles: true }))
    await new Promise((r) => setTimeout(r, 100))
    const hiddenCountry = document.querySelector('input[name="country"]').value
    return { errorLabels: errs, hiddenCountry }
  })()`)
  console.log('VALIDATION:', JSON.stringify(submitResult))

  // ——— screenshot (desktop, form section) ———
  const cap = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
  mkdirSync('.verify', { recursive: true })
  const { writeFileSync } = await import('node:fs')
  writeFileSync('.verify/form-desktop.png', Buffer.from(cap.result.data, 'base64'))

  // ——— mobile 375 ———
  await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 2, mobile: true })
  await wait(800)
  const mob = await evalJs(`(() => {
    const $ = (s) => document.querySelector(s)
    const r = (s) => { const el = $(s); if (!el) return null; const b = el.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width) } }
    const sel = r('.country-select'), ph = r('#phone')
    const fn = r('#first_name'), ln = r('#last_name')
    return {
      over: document.documentElement.scrollWidth - window.innerWidth,
      nameY: fn?.y, nameSameRow: fn && ln && fn.y === ln.y,
      selW: sel?.w, phoneW: ph?.w,
      chipsFit: [...document.querySelectorAll('.pay')].every((c) => c.getBoundingClientRect().right <= 375),
      payRow: document.querySelector('.pay-row').getBoundingClientRect().width,
    }
  })()`)
  console.log('MOBILE 375:', JSON.stringify(mob))
  const cap2 = await send('Page.captureScreenshot', { format: 'png' })
  writeFileSync('.verify/form-mobile.png', Buffer.from(cap2.result.data, 'base64'))

  console.log('CONSOLE ERRORS:', errors.length ? errors : 'none')

  ws.close()
  chrome.kill()
  process.exit(0)
}

main().catch((e) => { console.error(e); process.exit(1) })
