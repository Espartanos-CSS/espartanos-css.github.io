import '@fontsource/bricolage-grotesque/latin-600.css'
import '@fontsource/bricolage-grotesque/latin-800.css'
import '@fontsource/figtree/latin-400.css'
import '@fontsource/figtree/latin-600.css'
import '@phosphor-icons/web/regular'
import '../shared/muestra.js'
import './style.css'
import { HORARIO, estadoFonda, formatoHora } from './logic.js'

// La hora que cuenta es la de Guadalajara, no la de quien visita.
const ahora = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Mexico_City' }))
const estado = estadoFonda(ahora)
document.querySelector('[data-estado]').classList.toggle('abierta', estado.abierta)
document.querySelector('[data-estado-texto]').textContent = estado.texto

const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const hoy = ahora.getDay()
document.querySelector('[data-horario]').innerHTML = [1, 2, 3, 4, 5, 6, 0]
  .map((d) => {
    const h = HORARIO[d]
    const horas = h ? `${formatoHora(h[0])} a ${formatoHora(h[1])}` : 'Cerrado'
    return `<tr${d === hoy ? ' class="hoy"' : ''}><th scope="row">${dias[d]}${d === hoy ? ' <small>hoy</small>' : ''}</th><td>${horas}</td></tr>`
  })
  .join('')
