// Decisive brand-color check on the exported webp (2x, clip origin 93,7301)
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
  await send('Page.navigate', { url: `${BASE}/?v=fin#/` })
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
      const X0 = 93, Y0 = 7301   // clip origin (CSS px)
      const px = (vx, vy) => Array.from(ctx.getImageData(Math.round((vx - X0) * 2), Math.round((vy - Y0) * 2), 1, 1).data)
      const hex = ([r, g, b]) => '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')
      // grid scan: classify every pixel row-major into color families
      const fam = { blue: 0, green: 0, dark: 0, light: 0 }
      const step = 4
      for (let y = 0; y < img.height; y += step) {
        for (let x = 0; x < img.width; x += step) {
          const [r, g, b] = Array.from(ctx.getImageData(x, y, 1, 1).data)
          if (b > 100 && b > r + 40 && b > g + 20) fam.blue++
          else if (g > 100 && g > r + 30 && g > b + 10) fam.green++
          else if (r < 90 && g < 90 && b < 120) fam.dark++
          else fam.light++
        }
      }
      // targeted samples (page CSS coords)
      const bar6 = px(448, 7560)            // 6th bar ~66% height -> blue gradient
      const bar1 = px(175, 7530)            // 1st bar ~28% -> blue
      const chartBg = px(300, 7500)         // between bars -> light chart bg
      const txtZone = px(200, 7350)         // mini-label / balance text -> dark-ish
      const badgeDot = px(140, 7320)        // badge green dot area
      return {
        size: img.width + 'x' + img.height,
        bar6: hex(bar6), bar1: hex(bar1), chartBg: hex(chartBg), txtZone: hex(txtZone), badgeDot: hex(badgeDot),
        fam,
        total: img.width * img.height,
      }
    })()`,
    returnByValue: true,
    awaitPromise: true,
  })
  if (res.exceptionDetails) console.log('EXC:', res.exceptionDetails.exception?.description || res.exceptionDetails.text)
  console.log(JSON.stringify(res.result?.result?.value ?? res.result?.value, null, 1))
  ws.close()
}
main().catch((e) => { console.error('ERR', e.message); process.exit(1) })
