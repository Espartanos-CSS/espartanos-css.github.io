import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validarCita } from '../dental-alba/logic.js'

const hoy = new Date(2026, 9, 12) // lunes
const buena = { nombre: 'Mariana López', telefono: '33 1234 5678', servicio: 'limpieza', fecha: '2026-10-14' }

test('cita completa no tiene errores', () => {
  assert.deepEqual(validarCita(buena, hoy), {})
})
test('teléfono de 8 dígitos marca error en teléfono', () => {
  const e = validarCita({ ...buena, telefono: '1234 5678' }, hoy)
  assert.ok(e.telefono)
  assert.deepEqual(Object.keys(e), ['telefono'])
})
test('acepta teléfono con guiones y paréntesis', () => {
  assert.deepEqual(validarCita({ ...buena, telefono: '(33) 1234-5678' }, hoy), {})
})
test('nombre vacío y servicio sin elegir', () => {
  const e = validarCita({ ...buena, nombre: '  ', servicio: '' }, hoy)
  assert.ok(e.nombre)
  assert.ok(e.servicio)
})
test('fecha pasada o en domingo no se acepta', () => {
  assert.ok(validarCita({ ...buena, fecha: '2026-10-09' }, hoy).fecha)
  assert.match(validarCita({ ...buena, fecha: '2026-10-18' }, hoy).fecha, /domingo/)
})
