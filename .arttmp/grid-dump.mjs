// Dump a coarse ASCII color map of the exported webp to see its actual content
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
  await send('Page.enable')
  await send('Runtime.enable')
  await send('Page.navigate', { url: `${BASE}/?v=grid#/` })
  await new Promise((r) => setTimeout(r, 1800))

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
      const GX = 28, GY = 18
      let grid = ''
      for (let gy = 0; gy < GY; gy++) {
        for (let gx = 0; gx < GX; gx++) {
          const x = Math.floor((gx + 0.5) * W / GX), y = Math.floor((gy + 0.5) * H / GY)
          const [r, g, b] = Array.from(ctx.getImageData(x, y, 1, 1).data).slice(0, 3)
          let ch
          if (r > 245 && g > 245 && b > 245) ch = '.'          // white / near-white
          else if (b > r + 25 && b > 120) ch = 'B'             // strong blue
          else if (g > r + 15 && g > b + 15) ch = 'G'          // green
          else if (r > 200 && b > r && b > 200) ch = '~'       // light blue
          else if (r < 110 && g < 110 && b < 110) ch = '#'     // dark
          else ch = 'o'
          grid += ch
        }
        grid += '\\n'
      }
      return { w: W, h: H, grid }
    })()`,
    returnByValue: true,
    awaitPromise: true,
  })
  if (res.exceptionDetails) console.log('EXC:', res.exceptionDetails.exception?.description || res.exceptionDetails.text)
  const v = res.result?.result?.value ?? res.result?.value
  console.log('size:', v.w + 'x' + v.h)
  console.log(v.grid)
  ws.close()
}
main().catch((e) => { console.error('ERR', e.message); process.exit(1) })
