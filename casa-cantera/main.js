import '@fontsource/cormorant-garamond/latin-500.css'
import '@fontsource/cormorant-garamond/latin-500-italic.css'
import '@fontsource/archivo/latin-400.css'
import '@fontsource/archivo/latin-600.css'
import '@phosphor-icons/web/regular'
import 'lenis/dist/lenis.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { avisarDemo } from '../shared/muestra.js'
import './style.css'
import { PROPIEDADES, formatoPrecio } from './logic.js'

gsap.registerPlugin(ScrollTrigger)

// Tarjetas de propiedades
const fotos = import.meta.glob('./img/*.webp', { eager: true, query: '?url', import: 'default' })
document.querySelector('[data-pista]').insertAdjacentHTML(
  'beforeend',
  PROPIEDADES.map((p) => `
    <article class="propiedad">
      <div class="propiedad-foto"><img src="${fotos[`./img/${p.foto}.webp`]}" width="${p.ancho}" height="${p.alto}" loading="lazy" alt="${p.alt}"></div>
      <div class="propiedad-datos">
        <h3>${p.nombre}</h3>
        <p class="zona">${p.zona}</p>
        <p class="medidas">${p.recamaras} recámaras <span aria-hidden="true">/</span> ${p.banos} baños <span aria-hidden="true">/</span> ${p.m2} m²</p>
        <p class="precio">${formatoPrecio(p.precio)}</p>
      </div>
    </article>`).join(''),
)

// Formulario: valida con el navegador y avisa que es muestra.
document.querySelector('[data-formulario]').addEventListener('submit', (e) => {
  e.preventDefault()
  avisarDemo('En el sitio real, un asesor recibiría tu solicitud de visita. Aquí no se envió ningún dato.')
  e.target.reset()
})

// Movimiento: solo si el sistema no pide reducirlo.
const mm = gsap.matchMedia()

mm.add('(prefers-reduced-motion: no-preference)', () => {
  const lenis = new Lenis({ lerp: 0.1, anchors: true })
  lenis.on('scroll', ScrollTrigger.update)
  const avanzar = (t) => lenis.raf(t * 1000)
  gsap.ticker.add(avanzar)
  gsap.ticker.lagSmoothing(0)

  // Entrada del hero: la foto se descubre de abajo hacia arriba y el texto sube.
  gsap.from('[data-hero-foto]', { clipPath: 'inset(100% 0 0 0)', duration: 1.4, ease: 'power4.out' })
  gsap.from('[data-hero-foto] img', { scale: 1.25, duration: 1.8, ease: 'power3.out' })
  gsap.from('[data-titulo]', { y: 40, opacity: 0, duration: 1.1, ease: 'power3.out', delay: 0.2 })
  gsap.from('[data-aparece]', { y: 24, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.5, stagger: 0.12 })

  // El manifiesto se ilumina palabra por palabra mientras lo lees.
  const manifiesto = document.querySelector('[data-manifiesto]')
  manifiesto.innerHTML = manifiesto.textContent.split(' ').map((p) => `<span>${p}</span>`).join(' ')
  gsap.fromTo(manifiesto.children, { opacity: 0.18 }, {
    opacity: 1, stagger: 0.1, ease: 'none',
    scrollTrigger: { trigger: manifiesto, start: 'top 75%', end: 'bottom 45%', scrub: true },
  })

  // Fotos de interiores a distintas velocidades para dar profundidad.
  gsap.utils.toArray('[data-velocidad]').forEach((img) => {
    gsap.to(img, {
      yPercent: Number(img.dataset.velocidad), ease: 'none',
      scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true },
    })
  })

  gsap.utils.toArray('[data-aparece-scroll]').forEach((el) => {
    gsap.from(el, { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } })
  })

  return () => {
    gsap.ticker.remove(avanzar)
    lenis.destroy()
  }
})

// Galería horizontal fijada: solo en pantallas de 768 px o más.
mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
  const paneo = document.querySelector('[data-paneo]')
  const pista = document.querySelector('[data-pista]')
  paneo.classList.add('activo')
  const distancia = () => pista.scrollWidth - window.innerWidth
  gsap.to(pista, {
    x: () => -distancia(),
    ease: 'none',
    scrollTrigger: { trigger: paneo, start: 'top top', end: () => `+=${distancia()}`, pin: true, scrub: 1, invalidateOnRefresh: true },
  })
  return () => paneo.classList.remove('activo')
})
