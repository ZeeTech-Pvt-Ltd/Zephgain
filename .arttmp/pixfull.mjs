// Sample the full-viewport capture to find what's actually where
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
  await send('Page.navigate', { url: `${BASE}/?v=pf#/` })
  await sleep(2500)
  // load the previously saved full capture into the page and sample it
  const res = await send('Runtime.evaluate', {
    expression: `(async () => {
      const img = new Image()
      img.src = '/debug-rect-full.png'  // served from public? no — try local path via fetch blob
      await new Promise((res, rej) => { img.onload = res; img.onerror = () => rej(new Error('load fail')) })
      const c = document.createElement('canvas')
      c.width = img.width; c.height = img.height
      const ctx = c.getContext('2d')
      ctx.drawImage(img, 0, 0)
      const px = (x, y) => Array.from(ctx.getImageData(Math.round(x), Math.round(y), 1, 1).data)
      // full capture is DSF2: 2880x2000. Card at CSS (93..711, 500..879) -> device x2
      const sx = (vx) => (vx - 93) * 2
      const sy = (vy) => (vy - 500) * 2
      const spots = {
        cardHeader: px(sx(320), sy(520)),
        chart: px(sx(320), sy(620)),
        leftBar: px(sx(140), sy(700)),
        topPad: px(10, 10),
        badgeZone: px(sx(320), sy(510)),
      }
      return { w: img.width, h: img.height, spots }
    })()`,
    returnByValue: true,
    awaitPromise: true,
  })
  if (res.exceptionDetails) console.log('EXC:', res.exceptionDetails.exception?.description || res.exceptionDetails.text)
  console.log(JSON.stringify(res.result?.result?.value ?? res.result?.value, null, 1))
  ws.close()
}
main().catch((e) => { console.error('ERR', e.message); process.exit(1) })
