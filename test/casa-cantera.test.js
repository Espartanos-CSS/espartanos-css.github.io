import { test } from 'node:test'
import assert from 'node:assert/strict'
import { PROPIEDADES, formatoPrecio, usarPaneo } from '../casa-cantera/logic.js'

test('precio en pesos sin decimales', () => {
  assert.equal(formatoPrecio(14800000), '$14,800,000 MXN')
})
test('paneo horizontal solo en pantallas grandes sin movimiento reducido', () => {
  assert.equal(usarPaneo(1440, false), true)
  assert.equal(usarPaneo(767, false), false)
  assert.equal(usarPaneo(1440, true), false)
})
test('cada propiedad tiene foto, zona, precio y medidas', () => {
  assert.ok(PROPIEDADES.length >= 4)
  for (const p of PROPIEDADES) {
    for (const campo of ['nombre', 'zona', 'foto', 'alt', 'precio', 'recamaras', 'banos', 'm2']) assert.ok(p[campo], `${p.nombre}: ${campo}`)
  }
})
