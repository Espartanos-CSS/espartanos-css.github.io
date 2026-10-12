export const SERVICIOS = {
  limpieza: 'Limpieza y revisión',
  blanqueamiento: 'Blanqueamiento',
  ortodoncia: 'Ortodoncia y alineadores',
  resinas: 'Resinas y curaciones',
  implantes: 'Valoración de implantes',
}

// Devuelve un objeto con un mensaje por campo con error; vacío si todo está bien.
export function validarCita({ nombre = '', telefono = '', servicio = '', fecha = '' }, hoy = new Date()) {
  const errores = {}
  if (nombre.trim().length < 3) errores.nombre = 'Escribe tu nombre para saber a quién esperar.'
  if (telefono.replace(/[\s()-]/g, '').replace(/^\+?52/, '').length !== 10 || /[^\d\s()+-]/.test(telefono)) {
    errores.telefono = 'El teléfono debe tener 10 dígitos.'
  }
  if (!SERVICIOS[servicio]) errores.servicio = 'Elige el motivo de tu visita.'

  const [a, m, d] = fecha.split('-').map(Number)
  const dia = a ? new Date(a, m - 1, d) : null
  const inicioHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())
  if (!dia || Number.isNaN(dia.getTime())) errores.fecha = 'Elige un día para tu cita.'
  else if (dia < inicioHoy) errores.fecha = 'Elige un día de hoy en adelante.'
  else if (dia.getDay() === 0) errores.fecha = 'Los domingos no damos consulta, elige otro día.'
  return errores
}
