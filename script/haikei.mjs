// Genera fondos SVG al estilo de haikei.app (olas en capas y manchas) con una semilla fija,
// para que el resultado sea siempre el mismo. Uso: npm run fondos
import { writeFileSync } from 'node:fs'

function azar(semilla) {
  let s = semilla >>> 0
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32)
}

// Olas apiladas: cada capa es una curva suave que baja un poco más que la anterior.
export function olas({ ancho = 1440, alto = 320, colores, semilla = 1, puntos = 6 }) {
  const r = azar(semilla)
  const capas = colores.map((color, i) => {
    const base = alto * (0.25 + (0.6 * i) / colores.length)
    const pts = Array.from({ length: puntos + 1 }, (_, k) => [
      (ancho * k) / puntos,
      base + (r() - 0.5) * alto * 0.22,
    ])
    let d = `M0 ${alto} L0 ${pts[0][1].toFixed(1)}`
    for (let k = 1; k < pts.length; k++) {
      const [x0, y0] = pts[k - 1]
      const [x1, y1] = pts[k]
      const cx = (x0 + x1) / 2
      d += ` C${cx.toFixed(1)} ${y0.toFixed(1)} ${cx.toFixed(1)} ${y1.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`
    }
    return `<path d="${d} L${ancho} ${alto} Z" fill="${color}"/>`
  })
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ancho} ${alto}" preserveAspectRatio="none">${capas.join('')}</svg>`
}

// Mancha orgánica: un círculo deformado con radios al azar y curvas cerradas.
export function mancha({ tam = 600, color, semilla = 1, picos = 7, variacion = 0.28 }) {
  const r = azar(semilla)
  const c = tam / 2
  const pts = Array.from({ length: picos }, (_, k) => {
    const ang = (Math.PI * 2 * k) / picos
    const rad = c * 0.8 * (1 - variacion / 2 + r() * variacion)
    return [c + Math.cos(ang) * rad, c + Math.sin(ang) * rad]
  })
  const medio = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
  let d = `M${medio(pts.at(-1), pts[0]).map((n) => n.toFixed(1)).join(' ')}`
  pts.forEach((p, k) => {
    const m = medio(p, pts[(k + 1) % picos])
    d += ` Q${p[0].toFixed(1)} ${p[1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`
  })
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${tam} ${tam}"><path d="${d} Z" fill="${color}"/></svg>`
}

const fondos = {
  'dental-alba/img/ola.svg': olas({ colores: ['#cfe3ec', '#9cc7d8', '#2f6f8a'], semilla: 7 }),
  'dental-alba/img/mancha.svg': mancha({ color: '#d7ebf2', semilla: 3 }),
  'estudio-raiz/img/olas.svg': olas({ colores: ['#c9d6c3', '#7f9a78', '#2c4a33'], semilla: 21, puntos: 5 }),
  'estudio-raiz/img/mancha.svg': mancha({ color: '#e4b48f', semilla: 11, picos: 6 }),
  'andante/img/mancha.svg': mancha({ color: '#e9dccd', semilla: 5, picos: 8, variacion: 0.2 }),
  'img/olas.svg': olas({ colores: ['#2a2d31', '#1f2226', '#16181b'], semilla: 4, alto: 260 }),
}

if (import.meta.url === `file://${process.argv[1]}`) {
  for (const [ruta, svg] of Object.entries(fondos)) {
    writeFileSync(ruta, svg)
    console.log('ok', ruta)
  }
}
