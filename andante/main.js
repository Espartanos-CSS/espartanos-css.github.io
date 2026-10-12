import '@fontsource/schibsted-grotesk/latin-400.css'
import '@fontsource/schibsted-grotesk/latin-600.css'
import '@fontsource/schibsted-grotesk/latin-800.css'
import '@phosphor-icons/web/regular'
import '@phosphor-icons/web/fill'
import { gsap } from 'gsap'
import '../shared/muestra.js'
import './style.css'
import { COLORES, MAXIMO, PRECIO, agregar, formatoPesos, fotosDe, quitar, resumen } from './logic.js'

const fotos = import.meta.glob('./img/*.webp', { eager: true, query: '?url', import: 'default' })
const url = (archivo) => fotos[`./img/${archivo}.webp`]
const reducido = () => matchMedia('(prefers-reduced-motion: reduce)').matches
const $ = (s) => document.querySelector(s)

let color = 'nogal'
let cantidad = 1
let carrito = []

$('[data-precio]').textContent = formatoPesos(PRECIO)

// Galería
const principal = $('[data-foto-principal]')
function verFoto(foto) {
  principal.src = url(foto.archivo)
  principal.alt = foto.alt
  if (!reducido()) gsap.fromTo(principal, { opacity: 0.3, scale: 1.02 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' })
}
function pintarMiniaturas() {
  $('[data-miniaturas]').innerHTML = fotosDe(color)
    .map((f, i) => `<button type="button" data-foto="${i}" aria-pressed="${i === 0}" aria-label="Ver foto ${i + 1}"><img src="${url(f.archivo)}" width="140" height="210" alt=""></button>`)
    .join('')
}
$('[data-miniaturas]').addEventListener('click', (e) => {
  const b = e.target.closest('[data-foto]')
  if (!b) return
  for (const m of b.parentElement.children) m.setAttribute('aria-pressed', String(m === b))
  verFoto(fotosDe(color)[Number(b.dataset.foto)])
})

// Colores
$('[data-colores]').innerHTML = Object.entries(COLORES)
  .map(([clave, c]) => `
    <label class="color">
      <input type="radio" name="color" value="${clave}" ${clave === color ? 'checked' : ''}>
      <span class="muestra" style="--c:${c.muestra}" aria-hidden="true"></span>${c.nombre}
    </label>`)
  .join('')
$('[data-colores]').addEventListener('change', (e) => {
  color = e.target.value
  $('[data-color-nombre]').textContent = COLORES[color].nombre
  pintarMiniaturas()
  verFoto(fotosDe(color)[0])
})
pintarMiniaturas()

// Cantidad
const salidaCantidad = $('[data-cantidad]')
function ponerCantidad(n) {
  cantidad = Math.max(1, Math.min(MAXIMO, n))
  salidaCantidad.textContent = cantidad
  $('[data-menos]').disabled = cantidad === 1
  $('[data-mas]').disabled = cantidad === MAXIMO
}
$('[data-menos]').addEventListener('click', () => ponerCantidad(cantidad - 1))
$('[data-mas]').addEventListener('click', () => ponerCantidad(cantidad + 1))
ponerCantidad(1)

// Carrito
const panel = $('[data-carrito]')
const velo = $('[data-velo]')
const botonCarrito = $('[data-abrir-carrito]')

function pintarCarrito() {
  const r = resumen(carrito)
  $('[data-contador]').textContent = r.piezas
  $('[data-carrito-lista]').innerHTML = carrito.length
    ? carrito.map((fila) => `
        <div class="fila">
          <img src="${url(COLORES[fila.color].fotos[0].archivo)}" width="72" height="108" alt="">
          <div>
            <p><strong>Mochila Andante</strong></p>
            <p>${COLORES[fila.color].nombre}, ${fila.cantidad} ${fila.cantidad === 1 ? 'pieza' : 'piezas'}</p>
            <button type="button" class="quitar" data-quitar="${fila.color}">Quitar</button>
          </div>
          <p class="fila-precio">${formatoPesos(fila.cantidad * PRECIO)}</p>
        </div>`).join('')
    : '<div class="vacio"><i class="ph ph-handbag" aria-hidden="true"></i><p>Tu carrito está vacío.</p><p>Elige un color y agrega tu mochila.</p></div>'
  $('[data-carrito-pie]').innerHTML = carrito.length
    ? `<dl>
        <div><dt>Subtotal (${r.piezas} ${r.piezas === 1 ? 'pieza' : 'piezas'})</dt><dd>${formatoPesos(r.subtotal)}</dd></div>
        <div><dt>Envío</dt><dd>${r.envio ? formatoPesos(r.envio) : 'Gratis'}</dd></div>
        <div class="total"><dt>Total</dt><dd>${formatoPesos(r.total)}</dd></div>
      </dl>
      <button class="boton" type="button" data-demo="En el sitio real, aquí pasas al pago con tarjeta, OXXO o meses sin intereses.">Pagar ${formatoPesos(r.total)}</button>`
    : ''
}

function abrirCarrito() {
  panel.hidden = false
  velo.hidden = false
  botonCarrito.setAttribute('aria-expanded', 'true')
  if (!reducido()) {
    gsap.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.45, ease: 'power3.out' })
    gsap.fromTo(velo, { opacity: 0 }, { opacity: 1, duration: 0.3 })
  }
  panel.querySelector('[data-cerrar-carrito]').focus()
}
function cerrarCarrito() {
  const ocultar = () => { panel.hidden = true; velo.hidden = true }
  botonCarrito.setAttribute('aria-expanded', 'false')
  botonCarrito.focus()
  if (reducido()) return ocultar()
  gsap.to(velo, { opacity: 0, duration: 0.25 })
  gsap.to(panel, { xPercent: 100, duration: 0.3, ease: 'power2.in', onComplete: ocultar })
}

$('[data-agregar]').addEventListener('click', () => {
  carrito = agregar(carrito, color, cantidad)
  pintarCarrito()
  abrirCarrito()
})
botonCarrito.addEventListener('click', abrirCarrito)
$('[data-cerrar-carrito]').addEventListener('click', cerrarCarrito)
velo.addEventListener('click', cerrarCarrito)
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) cerrarCarrito() })
panel.addEventListener('click', (e) => {
  const b = e.target.closest('[data-quitar]')
  if (!b) return
  carrito = quitar(carrito, b.dataset.quitar)
  pintarCarrito()
})
pintarCarrito()
