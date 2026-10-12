// Prueba de humo sobre el build: corre `npm test`, que construye antes de probar.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'

const dist = resolve(import.meta.dirname, '..', 'dist')
const sitios = ['fonda-lumbre', 'dental-alba', 'estudio-raiz', 'casa-cantera', 'andante']
const paginas = ['index.html', ...sitios.map((s) => `${s}/index.html`)]
const guiones = /[\u2014\u2013]/

for (const pagina of paginas) {
  test(`${pagina}: base`, () => {
    const ruta = join(dist, pagina)
    assert.ok(existsSync(ruta), `falta ${pagina}`)
    const html = readFileSync(ruta, 'utf8')
    assert.match(html, /<html lang="es"/)
    assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1/)
    assert.match(html, /<title>[^<]{3,}<\/title>/)
    assert.doesNotMatch(html, guiones, 'tiene guiones largos')

    for (const img of html.match(/<img\b[^>]*>/g) ?? []) {
      const decorativa = /\saria-hidden="true"/.test(img) && /\salt=""/.test(img)
      assert.ok(decorativa || /\salt="[^"]+"/.test(img), `imagen sin alt: ${img.slice(0, 120)}`)
    }
    for (const [, ref] of html.matchAll(/\s(?:src|href)="([^"]+)"/g)) {
      if (/^(https?:|mailto:|tel:|#|data:)/.test(ref)) continue
      const archivo = resolve(dirname(ruta), ref.split(/[?#]/)[0])
      const destino = ref.endsWith('/') || existsSync(archivo) && !archivo.includes('.') ? join(archivo, 'index.html') : archivo
      assert.ok(existsSync(destino), `${pagina} apunta a algo que no existe: ${ref}`)
    }
  })
}

for (const sitio of sitios) {
  test(`${sitio}: aviso de muestra con regreso al portafolio`, () => {
    const html = readFileSync(join(dist, sitio, 'index.html'), 'utf8')
    assert.match(html, /<a[^>]*class="aviso-muestra"[^>]*href="\.\.\/"/)
    assert.match(html, /Espartanos CSS/)
    assert.match(html, /<link rel="icon"[^>]*href="[^"]+"/, 'falta el favicón')
  })
}

test('portafolio: enlaza las cinco muestras', () => {
  const html = readFileSync(join(dist, 'index.html'), 'utf8')
  for (const sitio of sitios) assert.match(html, new RegExp(`href="\\./${sitio}/"`), `falta ${sitio}`)
  assert.equal((html.match(/Pide tu cotización/g) ?? []).length >= 1, true)
  for (const precio of ['$5,000', '$12,000', '$18,000', '$20,000']) assert.ok(html.includes(`Desde ${precio} + IVA`), `falta ${precio}`)
  assert.match(html, /Precios aproximados/)
})

test('JS del build sin guiones largos visibles', () => {
  const assets = join(dist, 'assets')
  for (const f of readdirSync(assets).filter((f) => f.endsWith('.js'))) {
    assert.doesNotMatch(readFileSync(join(assets, f), 'utf8'), guiones, f)
  }
})
