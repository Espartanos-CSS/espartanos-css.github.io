export const PRECIO = 3450
export const ENVIO = 189
export const ENVIO_GRATIS_DESDE = 3000
export const MAXIMO = 5

export const COLORES = {
  nogal: {
    nombre: 'Nogal',
    muestra: '#7a4a32',
    fotos: [
      { archivo: 'nogal-frente', alt: 'Mochila de piel color nogal vista de frente' },
      { archivo: 'nogal-lado', alt: 'Mochila color nogal vista de tres cuartos, con bolsa lateral' },
      { archivo: 'nogal-detalle', alt: 'Detalle del cierre y la costura de la mochila color nogal' },
    ],
  },
  vino: {
    nombre: 'Vino',
    muestra: '#6b2430',
    fotos: [
      { archivo: 'vino-frente', alt: 'Mochila de piel color vino vista de tres cuartos sobre fondo claro' },
      { archivo: 'vino-oscuro', alt: 'Mochila color vino de frente sobre una base, con luz de estudio' },
      { archivo: 'vino-lado', alt: 'Mochila color vino vista desde arriba con su bolsa frontal' },
    ],
  },
}

export const fotosDe = (color) => COLORES[color].fotos

export function agregar(carrito, color, cantidad = 1) {
  const existente = carrito.find((r) => r.color === color)
  const nueva = Math.min(MAXIMO, (existente?.cantidad ?? 0) + cantidad)
  return existente
    ? carrito.map((r) => (r.color === color ? { ...r, cantidad: nueva } : r))
    : [...carrito, { color, cantidad: nueva }]
}

export const quitar = (carrito, color) => carrito.filter((r) => r.color !== color)

export function resumen(carrito) {
  const piezas = carrito.reduce((s, r) => s + r.cantidad, 0)
  const subtotal = piezas * PRECIO
  const envio = piezas === 0 || subtotal >= ENVIO_GRATIS_DESDE ? 0 : ENVIO
  return { piezas, subtotal, envio, total: subtotal + envio }
}

const pesos = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })
export const formatoPesos = (n) => pesos.format(n)
