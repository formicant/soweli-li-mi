import { test, assert } from 'vitest'
import { nimiInsaKulupu } from '../insa/nimiAli'

test('nimi tu sama li lon ala', () => {
  const nimiAli = [
    ...nimiInsaKulupu.toki,
    ...nimiInsaKulupu.kulupu,
    ...nimiInsaKulupu.pali,
    ...nimiInsaKulupu.ijo,
  ]
  const nimiPiWanTaso = new Set()
  for (const nimi of nimiAli) {
    if (nimiPiWanTaso.has(nimi)) {
      assert.fail(`nimi '${nimi}' li tu!`)
    } else {
      nimiPiWanTaso.add(nimi)
    }
  }
})

test('nimi tu pi sitelen open tu wan sama li lon ala', () => {
  const nimiAli = [
    ...nimiInsaKulupu.toki,
    ...nimiInsaKulupu.kulupu,
    ...nimiInsaKulupu.pali,
    ...nimiInsaKulupu.ijo,
  ]
  const nimiPiWanTaso = new Map()
  for (const nimi of nimiAli) {
    const open = nimi.substring(0, 3)
    if (nimiPiWanTaso.has(open)) {
      assert.fail(`open nimi '${open}' li tu: '${nimiPiWanTaso.get(open)}' en '${nimi}'!`)
    } else {
      nimiPiWanTaso.set(open, nimi)
    }
  }
})
