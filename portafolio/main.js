import '@fontsource/sora/latin-400.css'
import '@fontsource/sora/latin-600.css'
import '@fontsource/sora/latin-800.css'
import '@phosphor-icons/web/regular'
import '../shared/muestra.js'
import { MENSAJE, WHATSAPP } from '../shared/contacto.js'
import './style.css'

// "Pide tu cotización" abre WhatsApp si ya hay número configurado en shared/contacto.js.
for (const enlace of document.querySelectorAll('[data-cotizar]')) {
  if (WHATSAPP) {
    enlace.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MENSAJE)}`
    enlace.target = '_blank'
    enlace.rel = 'noopener'
  } else {
    enlace.dataset.demo = 'Falta configurar el WhatsApp de Espartanos CSS en shared/contacto.js.'
  }
}
