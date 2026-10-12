// Toma capturas de cada página del build en celular y escritorio.
// Uso: script/capturas.sh [pagina...]   (las guarda en capturas/)
const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')
const { chromium } = require('playwright-core')

const dist = path.resolve(__dirname, '..', 'dist')
const tipos = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.png': 'image/png', '.jpg': 'image/jpeg' }
const servidor = http.createServer((req, res) => {
  let ruta = path.join(dist, decodeURIComponent(req.url.split('?')[0]))
  if (fs.existsSync(ruta) && fs.statSync(ruta).isDirectory()) ruta = path.join(ruta, 'index.html')
  if (!fs.existsSync(ruta)) { res.writeHead(404); return res.end() }
  res.writeHead(200, { 'content-type': tipos[path.extname(ruta)] || 'application/octet-stream' })
  fs.createReadStream(ruta).pipe(res)
})

const paginas = process.argv.slice(2).length ? process.argv.slice(2) : ['', 'fonda-lumbre', 'dental-alba', 'estudio-raiz', 'casa-cantera', 'andante']
const todos = { cel: { width: 390, height: 844 }, cel360: { width: 360, height: 740 }, esc: { width: 1440, height: 900 } }
const tamanos = Object.fromEntries((process.env.TAMANOS || 'cel,esc').split(',').map((t) => [t, todos[t]]))
const salida = path.resolve(__dirname, '..', 'capturas')

servidor.listen(4321, async () => {
  fs.mkdirSync(salida, { recursive: true })
  const navegador = await chromium.launch({ executablePath: process.env.CHROMIUM, args: ['--no-sandbox'] })
  for (const p of paginas) {
    for (const [nombre, viewport] of Object.entries(tamanos)) {
      const pagina = await navegador.newPage({ viewport, deviceScaleFactor: 1, reducedMotion: process.env.REDUCIDO ? 'reduce' : 'no-preference' })
      const errores = []
      pagina.on('pageerror', (e) => errores.push(e.message))
      pagina.on('response', (r) => r.status() >= 400 && errores.push(r.status() + ' ' + r.url()))
      await pagina.goto(`http://localhost:4321/${p}${p ? '/' : ''}`, { waitUntil: 'networkidle' })
      // Recorre la página para disparar las animaciones de entrada y la carga diferida.
      await pagina.evaluate(async () => {
        document.documentElement.style.scrollBehavior = 'auto'
        for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)) }
        window.scrollTo(0, 0); await new Promise((r) => setTimeout(r, 500))
      })
      const desborde = await pagina.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      if (process.env.TOMAS) {
        const n = Number(process.env.TOMAS)
        const alto = await pagina.evaluate(() => document.documentElement.scrollHeight - window.innerHeight)
        for (let i = 0; i < n; i++) {
          await pagina.evaluate((y) => window.scrollTo(0, y), Math.round((alto * i) / (n - 1)))
          await pagina.waitForTimeout(1200)
          await pagina.screenshot({ path: path.join(salida, `${p || 'portafolio'}-${nombre}-${i}.png`) })
        }
      }
      const archivo = path.join(salida, `${p || 'portafolio'}-${nombre}.png`)
      await pagina.screenshot({ path: archivo, fullPage: process.env.SOLO_PANTALLA ? false : true })
      console.log(`${p || 'portafolio'} ${nombre}: desborde ${desborde}px${errores.length ? ' ERRORES: ' + errores.join(' | ') : ''}`)
      await pagina.close()
    }
  }
  await navegador.close()
  servidor.close()
})
