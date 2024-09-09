import { test, expect } from 'vitest'
import { pilinELipuMa } from '../insa/lipuMa'
import { Musi } from '../insa/musi'
import { Ijo } from '../insa/ijo'

test.each([
  {
    nimi: 'mi tawa',
    open: {
      ma: [
        ' .  SOW  . ',
        'sow li  mi ',
      ]
    },
    nasin: '←↓↓→→→↑',
    pini: {
      ma: [
        ' .   .  SOW',
        'sow li  mi ',
      ]
    },
  },
  {
    nimi: 'tawa e ijo',
    open: {
      ma: [
        'nim en  kiw li  taw',
        'MA   .  KIW  .   . ',
        ' .  sow li  mi  SOW',
        'ake li  awe  .  KIW',
        'ma  li   .   .  AKE',
      ],
    },
    nasin: '↓←←↑↑←↓↑↑↑←←↑←→',
    pini: {
      ma: [
        'nim en  kiw li  taw',
        'MA  KIW  .  AKE KIW',
        'sow li  SOW  .   . ',
        'ake li  mi   .   . ',
        'ma  li  awe  .   . ',
      ],
    },
  },
  {
    nimi: 'weka en moli',
    open: {
      ma: [
        'SOW KIW kiw li  awe kiw li  wek',
        'SOW KIL kil li  mol  .   .  sow',
        'SOW TEL sow lon tel li  wek li ',
        'SOW KAS kas lon sow li  wek mi ',
      ],
    },
    nasin: '→',
    pini: {
      ma: [
        'SOW  .  kiw li  awe kiw li  wek',
        ' .  KIL kil li  mol  .   .  sow',
        ' .  TEL sow lon tel li  wek li ',
        ' .  SOW kas lon sow li  wek mi ',
      ],
    },
  },
])('musi', ({ nimi, open, nasin, pini }) => {
  const musiOpen = new Musi({ nimi: nimi, ...open })
  const musiPini = musiOpen.tawaNasin(nasin)
  const ijoLon = wekaENanpa(musiPini.tawaNi.lipuIjo.valueSeq().toArray())

  const { ijoAle } = pilinELipuMa({ nimi: nimi, ...pini })
  const ijoWile = wekaENanpa(ijoAle)

  // O PALI pona e ni:
  expect(ijoLon).toEqual(expect.arrayContaining(ijoWile))
  expect(ijoWile).toEqual(expect.arrayContaining(ijoLon))
})

function wekaENanpa(ijoMute: readonly Ijo[]) {
  return ijoMute
    .filter(ijo => ijo.liLon)
    .map(ijo => ({ lon: ijo.lon, kulupu: ijo.kulupu, nimi: ijo.nimi }))
}
