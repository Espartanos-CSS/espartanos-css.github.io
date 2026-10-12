// Horario por día de la semana (0 = domingo). null = cerrado.
export const HORARIO = { 0: [13, 21], 1: null, 2: [13, 22], 3: [13, 22], 4: [13, 22], 5: [13, 23], 6: [13, 23] }
const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']

export const formatoHora = (h) => `${h % 12 || 12}:00 ${h < 12 ? 'am' : 'pm'}`

export function estadoFonda(fecha = new Date(), horario = HORARIO) {
  const dia = fecha.getDay()
  const hora = fecha.getHours() + fecha.getMinutes() / 60
  const hoy = horario[dia]

  if (hoy && hora >= hoy[0] && hora < hoy[1]) {
    return { abierta: true, texto: `Abierto ahora, cerramos a las ${formatoHora(hoy[1])}` }
  }
  if (hoy && hora < hoy[0]) {
    return { abierta: false, texto: `Cerrado ahora, abrimos hoy a la${hoy[0] % 12 === 1 ? '' : 's'} ${formatoHora(hoy[0])}` }
  }
  for (let i = 1; i <= 7; i++) {
    const siguiente = horario[(dia + i) % 7]
    if (!siguiente) continue
    const cuando = i === 1 ? 'mañana' : `el ${DIAS[(dia + i) % 7]}`
    return { abierta: false, texto: `Cerrado ahora, abrimos ${cuando} a la${siguiente[0] % 12 === 1 ? '' : 's'} ${formatoHora(siguiente[0])}` }
  }
  return { abierta: false, texto: 'Cerrado por ahora' }
}
