import { test } from 'node:test'
import assert from 'node:assert/strict'
import { CLASES, clasesDelDia, diaInicial } from '../estudio-raiz/logic.js'

test('el jueves muestra solo clases del jueves, ordenadas por hora', () => {
  const jueves = clasesDelDia(CLASES, 4)
  assert.ok(jueves.length > 0)
  assert.ok(jueves.every((c) => c.dias.includes(4)))
  const horas = jueves.map((c) => c.hora)
  assert.deepEqual(horas, [...horas].sort())
})
test('cada día de lunes a sábado tiene clases', () => {
  for (let d = 1; d <= 6; d++) assert.ok(clasesDelDia(CLASES, d).length > 0, `día ${d}`)
})
test('abre en el día actual', () => {
  assert.equal(diaInicial(new Date(2026, 9, 15)), 4) // jueves
})
test('en domingo (sin clases) abre en lunes', () => {
  assert.equal(diaInicial(new Date(2026, 9, 18)), 1)
})
