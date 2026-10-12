import '@fontsource/instrument-sans/latin-400.css'
import '@fontsource/instrument-sans/latin-500.css'
import '@fontsource/instrument-sans/latin-700.css'
import '@phosphor-icons/web/regular'
import '../shared/muestra.js'
import './style.css'
import { CLASES, clasesDelDia, diaInicial } from './logic.js'

// Horario por día
const nombres = ['', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const cortos = ['', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const dias = document.querySelector('[data-dias]')
const lista = document.querySelector('[data-clases]')
// El día que cuenta es el de Guadalajara, no el de quien visita.
const ahora = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Mexico_City' }))
const hoy = ahora.getDay()

dias.innerHTML = [1, 2, 3, 4, 5, 6]
  .map((d) => `<button type="button" role="tab" data-dia="${d}" aria-label="${nombres[d]}">${cortos[d]}${d === hoy ? '<small>hoy</small>' : ''}</button>`)
  .join('')

function mostrar(dia) {
  for (const b of dias.children) b.setAttribute('aria-selected', String(Number(b.dataset.dia) === dia))
  lista.innerHTML = clasesDelDia(CLASES, dia)
    .map((c) => `
      <li>
        <time>${c.hora}</time>
        <div><strong>${c.nombre}</strong><span>${c.nivel}</span></div>
        <span class="instructora">con ${c.instructora}</span>
        <a class="reservar" href="#" data-demo="En el sitio real, aquí reservas tu lugar en ${c.nombre} del ${nombres[dia].toLowerCase()}.">Reservar</a>
      </li>`)
    .join('')
}

dias.addEventListener('click', (e) => {
  const boton = e.target.closest('[data-dia]')
  if (boton) mostrar(Number(boton.dataset.dia))
})
dias.addEventListener('keydown', (e) => {
  if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return
  const botones = [...dias.children]
  const i = botones.indexOf(document.activeElement)
  const siguiente = botones[(i + (e.key === 'ArrowRight' ? 1 : botones.length - 1)) % botones.length]
  siguiente.focus()
  mostrar(Number(siguiente.dataset.dia))
})
mostrar(diaInicial(ahora))

// Revelado suave al entrar en pantalla
const elementos = document.querySelectorAll('.revela')
if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
  elementos.forEach((el) => el.classList.add('visto'))
} else {
  const observador = new IntersectionObserver((entradas) => {
    for (const e of entradas) if (e.isIntersecting) { e.target.classList.add('visto'); observador.unobserve(e.target) }
  }, { rootMargin: '0px 0px -8% 0px' })
  elementos.forEach((el) => observador.observe(el))
}
