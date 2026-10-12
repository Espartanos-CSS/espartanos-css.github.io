import '@fontsource/manrope/latin-400.css'
import '@fontsource/manrope/latin-600.css'
import '@fontsource/manrope/latin-800.css'
import '@phosphor-icons/web/regular'
import '@phosphor-icons/web/duotone'
import '../shared/muestra.js'
import './style.css'
import { SERVICIOS, validarCita } from './logic.js'

// Revelado suave al entrar en pantalla (se omite con movimiento reducido).
const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches
const elementos = document.querySelectorAll('.revela')
if (reducido || !('IntersectionObserver' in window)) {
  elementos.forEach((el) => el.classList.add('visto'))
} else {
  const observador = new IntersectionObserver((entradas) => {
    for (const e of entradas) if (e.isIntersecting) { e.target.classList.add('visto'); observador.unobserve(e.target) }
  }, { rootMargin: '0px 0px -10% 0px' })
  elementos.forEach((el) => observador.observe(el))
}

// Formulario de cita
const formulario = document.querySelector('[data-formulario]')
const confirmacion = document.querySelector('[data-confirmacion]')
document.querySelector('[data-servicios]').insertAdjacentHTML(
  'beforeend',
  Object.entries(SERVICIOS).map(([v, t]) => `<option value="${v}">${t}</option>`).join(''),
)
const hoy = new Date()
formulario.fecha.min = new Date(hoy.getTime() - hoy.getTimezoneOffset() * 60000).toISOString().slice(0, 10)

function pintarErrores(errores) {
  for (const campo of ['nombre', 'telefono', 'servicio', 'fecha']) {
    const control = formulario[campo]
    control.setAttribute('aria-invalid', String(Boolean(errores[campo])))
    document.getElementById(`error-${campo}`).textContent = errores[campo] ?? ''
  }
}

formulario.addEventListener('submit', (e) => {
  e.preventDefault()
  const datos = Object.fromEntries(new FormData(formulario))
  const errores = validarCita(datos)
  pintarErrores(errores)
  const primero = Object.keys(errores)[0]
  if (primero) return formulario[primero].focus()

  document.querySelector('[data-confirmacion-titulo]').textContent =
    `Listo, ${datos.nombre.trim().split(' ')[0]}. Te esperamos.`
  formulario.hidden = true
  confirmacion.hidden = false
  confirmacion.focus()
})

// Al corregir un campo, su error desaparece.
formulario.addEventListener('input', (e) => {
  const error = document.getElementById(`error-${e.target.name}`)
  if (error && error.textContent) {
    const msg = validarCita(Object.fromEntries(new FormData(formulario)))[e.target.name]
    error.textContent = msg ?? ''
    e.target.setAttribute('aria-invalid', String(Boolean(msg)))
  }
})

document.querySelector('[data-otra]').addEventListener('click', () => {
  formulario.reset()
  pintarErrores({})
  confirmacion.hidden = true
  formulario.hidden = false
  formulario.nombre.focus()
})
