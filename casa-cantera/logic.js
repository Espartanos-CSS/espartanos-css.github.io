export const PROPIEDADES = [
  { nombre: 'Casa del Árbol', zona: 'Puerto Vallarta, Jalisco', foto: 'casa-arbol', alt: 'Casa de dos pisos con un árbol grande al frente, alberca y vista al mar', ancho: 1800, alto: 1350, precio: 14800000, recamaras: 4, banos: 4.5, m2: 520 },
  { nombre: 'Casa Palma', zona: 'Bucerías, Nayarit', foto: 'tropical', alt: 'Alberca rodeada de plantas tropicales junto a una casa moderna', ancho: 1200, alto: 1800, precio: 9350000, recamaras: 3, banos: 3, m2: 310 },
  { nombre: 'Residencia Atardecer', zona: 'Zapopan, Jalisco', foto: 'hero', alt: 'Terraza con alberca al atardecer bajo un cielo rosado', ancho: 1600, alto: 2400, precio: 18900000, recamaras: 4, banos: 5, m2: 640 },
  { nombre: 'Departamento Mirador', zona: 'Providencia, Guadalajara', foto: 'sala-vista', alt: 'Sala con ventanal de piso a techo y vista a la montaña', ancho: 1200, alto: 1698, precio: 7650000, recamaras: 2, banos: 2, m2: 165 },
  { nombre: 'Casa Galería', zona: 'Colinas de San Javier, Zapopan', foto: 'galeria', alt: 'Espacio de concreto aparente con un árbol enmarcado por un ventanal', ancho: 1800, alto: 1200, precio: 22400000, recamaras: 5, banos: 5.5, m2: 780 },
]

const pesos = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })
export const formatoPrecio = (n) => `${pesos.format(n)} MXN`

export const usarPaneo = (ancho, reducido) => ancho >= 768 && !reducido
