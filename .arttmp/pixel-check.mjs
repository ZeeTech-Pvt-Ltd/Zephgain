// Verify the exported webp actually contains the card (pixel sampling)
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
  await send('Page.navigate', { url: `${BASE}/?v=pix#/` })
  await sleep(1800)

  const res = await send('Runtime.evaluate', {
    expression: `(async () => {
      const img = new Image()
      img.src = '/portfolio-visual.webp?' + Date.now()
      await new Promise((res, rej) => { img.onload = res; img.onerror = () => rej(new Error('load fail')) })
      const c = document.createElement('canvas')
      c.width = img.width; c.height = img.height
      const ctx = c.getContext('2d')
      ctx.drawImage(img, 0, 0)
      const W = img.width, H = img.height
      const SX = W / 618   // image scale vs clip width
      const SY = H / 415
      const px = (x, y) => Array.from(ctx.getImageData(Math.round(x), Math.round(y), 1, 1).data)
      // map page-CSS coords (of the 1440-wide page, clip origin 93,456) into the image
      const toImgX = (vx) => (vx - 93) * SX
      const toImgY = (vy) => (vy - 456) * SY
      const white = px(toImgX(110), toImgY(480))          // outside card bg (top-left pad)
      const cardTop = px(toImgX(320), toImgY(490))        // card header area
      const chartBg = px(toImgX(320), toImgY(600))        // chart region
      const bar = px(toImgX(140), toImgY(700))            // left bars area
      const badge = px(toImgX(320), toImgY(830))          // badge region (near bottom of card)
      const colors = [white, cardTop, chartBg, bar, badge].map(c => '#' + c.slice(0,3).map(v => v.toString(16).padStart(2,'0')).join(''))
      // whole-image variance: sample a 40x40 grid, count distinct colors
      const seen = new Set()
      for (let gx = 0; gx < 40; gx++) for (let gy = 0; gy < 40; gy++) {
        const c = Array.from(ctx.getImageData(Math.floor(gx * W / 40), Math.floor(gy * H / 40), 1, 1).data).slice(0,3)
        seen.add(c.join(','))
      }
      return { w: W, h: H, white, cardTop, chartBg, bar, badge, colors, distinct: seen.size }
    })()`,
    returnByValue: true,
    awaitPromise: true,
  })
  if (res.exceptionDetails) { console.error('eval fail', res.exceptionDetails); ws.close(); process.exit(1) }
  console.log('pixels:', JSON.stringify(res.result.value))
  ws.close()
}
main().catch((e) => { console.error('ERR', e.message); process.exit(1) })
