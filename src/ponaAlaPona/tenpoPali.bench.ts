import { bench, describe } from 'vitest'
import { Musi } from '../insa/musi'

describe.each([
  4, 8, 12, 16,
])('mi mute li tawa', (nanpa) => {
  bench(`nanpa li ${nanpa}`, () => {
    // const mute = 16
    const musiOpen = new Musi({
      nimi: 'mi mute li tawa',
      ma: ['sow li  mi   . ' + ' SOW'.repeat(nanpa)]
    })
    musiOpen.tawaNasin('←')
  }, { time: 1000 })
})
