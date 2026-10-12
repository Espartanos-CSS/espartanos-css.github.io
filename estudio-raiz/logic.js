// Clases de la semana. dias: 1 = lunes ... 6 = sábado. El domingo no hay clases.
export const CLASES = [
  { hora: '07:00', nombre: 'Pilates reformer', nivel: 'Todos los niveles', instructora: 'Valeria', dias: [1, 3, 5] },
  { hora: '07:15', nombre: 'Vinyasa', nivel: 'Intermedio', instructora: 'Daniela', dias: [2, 4] },
  { hora: '08:30', nombre: 'Pilates en tapete', nivel: 'Principiantes', instructora: 'Sofía', dias: [1, 2, 3, 4, 5] },
  { hora: '09:00', nombre: 'Reformer suave', nivel: 'Principiantes', instructora: 'Valeria', dias: [6] },
  { hora: '10:30', nombre: 'Yoga restaurativo', nivel: 'Todos los niveles', instructora: 'Daniela', dias: [6] },
  { hora: '13:00', nombre: 'Pilates exprés (45 min)', nivel: 'Todos los niveles', instructora: 'Sofía', dias: [1, 3, 5] },
  { hora: '18:00', nombre: 'Pilates reformer', nivel: 'Intermedio', instructora: 'Valeria', dias: [1, 2, 3, 4] },
  { hora: '19:00', nombre: 'Hatha yoga', nivel: 'Principiantes', instructora: 'Daniela', dias: [1, 3] },
  { hora: '19:15', nombre: 'Reformer con aro', nivel: 'Avanzado', instructora: 'Sofía', dias: [2, 4] },
  { hora: '20:00', nombre: 'Yin yoga', nivel: 'Todos los niveles', instructora: 'Daniela', dias: [2, 4, 5] },
]

export const clasesDelDia = (clases, dia) =>
  clases.filter((c) => c.dias.includes(dia)).sort((a, b) => a.hora.localeCompare(b.hora))

export const diaInicial = (fecha = new Date()) => (fecha.getDay() === 0 ? 1 : fecha.getDay())
