import { test } from 'node:test'
import assert from 'node:assert/strict'
import { estadoFonda } from '../fonda-lumbre/logic.js'

// 2026-10-13 es martes; 2026-10-12 es lunes; 2026-10-18 es domingo.
test('abierta un martes a las 2 pm', () => {
  assert.equal(estadoFonda(new Date(2026, 9, 13, 14, 0)).abierta, true)
})
test('cerrada en lunes', () => {
  const e = estadoFonda(new Date(2026, 9, 12, 15, 0))
  assert.equal(e.abierta, false)
  assert.match(e.texto, /mañana/)
})
test('cerrada después de las 10 pm', () => {
  assert.equal(estadoFonda(new Date(2026, 9, 13, 22, 30)).abierta, false)
})
test('antes de abrir avisa la hora', () => {
  const e = estadoFonda(new Date(2026, 9, 18, 12, 59))
  assert.equal(e.abierta, false)
  assert.match(e.texto, /1:00 pm/)
})
test('el sábado de noche avisa que abre el domingo', () => {
  assert.match(estadoFonda(new Date(2026, 9, 17, 23, 0)).texto, /mañana/)
})
