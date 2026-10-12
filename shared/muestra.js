// Los botones con data-demo no envían nada: muestran un aviso de que esto es una muestra.
import './muestra.css'

let aviso
let temporizador

export function avisarDemo(mensaje = 'En el sitio real, este botón haría su trabajo.') {
  if (!aviso) {
    aviso = document.createElement('div')
    aviso.className = 'aviso-demo'
    aviso.setAttribute('role', 'status')
    aviso.setAttribute('aria-live', 'polite')
    document.body.append(aviso)
  }
  aviso.innerHTML = '<strong>Esto es un sitio de muestra</strong>'
  aviso.append(mensaje)
  aviso.classList.add('visible')
  clearTimeout(temporizador)
  temporizador = setTimeout(() => aviso.classList.remove('visible'), 3800)
}

document.addEventListener('click', (e) => {
  const boton = e.target.closest('[data-demo]')
  if (!boton) return
  e.preventDefault()
  avisarDemo(boton.dataset.demo || undefined)
})
