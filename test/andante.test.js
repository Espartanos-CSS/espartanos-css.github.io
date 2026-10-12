import { test } from 'node:test'
import assert from 'node:assert/strict'
import { COLORES, PRECIO, agregar, resumen, fotosDe } from '../andante/logic.js'

test('cambiar a Vino da las fotos del color vino', () => {
  const fotos = fotosDe('vino')
  assert.ok(fotos.length >= 3)
  assert.ok(fotos.every((f) => f.archivo.startsWith('vino-')))
})
test('agregar 2 mochilas da 2 piezas y el total en pesos', () => {
  const carrito = agregar([], 'nogal', 2)
  const r = resumen(carrito)
  assert.equal(r.piezas, 2)
  assert.equal(r.subtotal, PRECIO * 2)
  assert.equal(r.total, r.subtotal + r.envio)
})
test('agregar el mismo color suma cantidades en un solo renglón', () => {
  const carrito = agregar(agregar([], 'vino', 1), 'vino', 2)
  assert.equal(carrito.length, 1)
  assert.equal(carrito[0].cantidad, 3)
})
test('envío gratis desde $3,000; si no, cuesta $189', () => {
  assert.equal(resumen(agregar([], 'nogal', 1)).envio, PRECIO >= 3000 ? 0 : 189)
  assert.equal(resumen([]).envio, 0)
})
test('cantidad máxima de 5 por color', () => {
  assert.equal(agregar([], 'nogal', 9)[0].cantidad, 5)
})
test('hay al menos dos colores con nombre', () => {
  assert.ok(Object.keys(COLORES).length >= 2)
})
