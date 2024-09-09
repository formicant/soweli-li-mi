import { test, expect } from 'vitest'
import Im from 'immutable'
import { pilinELipuMa } from '../insa/lipuMa'
import { MaIjo } from '../insa/maIjo'
import { panaENasinMusiAle } from '../insa/pilinToki'
import { tokiENasinMusi } from '../insa/nasinMusi'

test.each([
  {
    lipuMa: {
      nimi: 'nasin wan',
      ma: ['soweli li mi'],
    },
    nasinMusi: ['soweli li mi'],
  },
  {
    lipuMa: {
      nimi: 'linja anpa en linja poka',
      ma: [' .  sow  . ', 'tom li  pin', ' .  mi   . '],
    },
    nasinMusi: ['soweli li mi', 'tomo li pini'],
  },
  {
    lipuMa: {
      nimi: 'nasin mute lon linja wan',
      ma: ['.kal lon kon lon ma li mol kas pip en ake li mi en wek.TEL en kiw li taw.'],
    },
    nasinMusi: ['kala lon kon lon ma li moli', 'akesi en pipi li mi', 'kiwen li tawa'],
  },
  {
    lipuMa: {
      nimi: 'pali ike nasa',
      ma: [' .  .  . kal', ' .  .  . li ', ' .  .  . wek'],
    },
    nasinMusi: ['kala li weka'],
  },
  // O PALI: leko wan li wile ken jo e nimi mute!
  // {
  //   lipuMa: {
  //     nimi: 'nimi mute lon leko wan',
  //     ma: ['1 2 3 4 5 6 7'],
  //     namako: {
  //       '1': '          soweli',
  //       '2': 'tomo      li    ',
  //       '3': 'li        mi    ',
  //       '4': 'pini  nimi  supa',
  //       '5': 'kiwen     li    ',
  //       '6': 'li    tawa  moli',
  //       '7': 'Awen            ',
  //     }
  //   },
  //   nasinMusi: [
  //     'soweli li mi',
  //     'tomo li pini',
  //     'nimi li tawa',
  //     'supa li tawa',
  //     'nimi li moli',
  //     'supa li moli',
  //     'kiwen li awen',
  //   ]
  // },
])('', ({ lipuMa, nasinMusi }) => {
  const { suliMa, ijoAle } = pilinELipuMa(lipuMa)
  const lipuIjo = Im.Map(Im.Seq(ijoAle).toKeyedSeq())
  const maIjo = new MaIjo(suliMa, lipuIjo)
  const nasinMusiAle = panaENasinMusiAle(maIjo)
  const toki = nasinMusiAle.map(tokiENasinMusi)

  expect(toki.sort()).toEqual(nasinMusi.sort())
})
