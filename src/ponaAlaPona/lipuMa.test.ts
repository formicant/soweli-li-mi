import { test, expect } from 'vitest'
import { pilinELipuMa } from '../insa/lipuMa'
import { Lon } from '../insa/lon'

test.each([
  {
    nimi: 'ma lili pona',
    ma: [
      ' kon AKE ',
      '  .  pin ',
    ]
  },
  {
    nimi: 'ma lili pona',
    ma: [
      'kon AKESI',
      '.pini',
    ]
  },
])('lupu ma pona', lipuMa => {
  const { nimiMa, suliMa, ijoAle } = pilinELipuMa(lipuMa)

  expect(nimiMa).toBe('ma lili pona')
  expect(suliMa.x).toBe(2)
  expect(suliMa.y).toBe(2)
  expect(ijoAle).toHaveLength(3)
  expect(ijoAle).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ lon: new Lon(0, 0), liLon: true, kulupu: 'nimi',    nimi: 'kon'   }),
      expect.objectContaining({ lon: new Lon(1, 0), liLon: true, kulupu: 'sitelen', nimi: 'akesi' }),
      expect.objectContaining({ lon: new Lon(1, 1), liLon: true, kulupu: 'nimi',    nimi: 'pini', }),
    ])
  )
})

test.each([
  {
    nimi: 'ma lili pona namako',
    ma: [
      ' .  SOW @tL',
      'sow @tL mi ',
    ],
    namako: { '@tL': 'TELO li' },
  },
  {
    nimi: 'ma lili pona namako',
    ma: [
      '1 2 3',
      '4 5 6',
    ],
    namako: {
      '1': '',
      '2': 'SOWELI',
      '3': 'TELO li',
      '4': 'soweli',
      '5': 'li TELO',
      '6': 'mi',
    },
  },
])('lupu ma pona namako', lipuMa => {
  const { nimiMa, suliMa, ijoAle } = pilinELipuMa(lipuMa)

  expect(nimiMa).toBe('ma lili pona namako')
  expect(suliMa.x).toBe(3)
  expect(suliMa.y).toBe(2)
  expect(ijoAle).toHaveLength(7)
  expect(ijoAle).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ lon: new Lon(1, 0), liLon: true, kulupu: 'sitelen', nimi: 'soweli' }),
      expect.objectContaining({ lon: new Lon(2, 0), liLon: true, kulupu: 'sitelen', nimi: 'telo'   }),
      expect.objectContaining({ lon: new Lon(2, 0), liLon: true, kulupu: 'nimi',    nimi: 'li'     }),
      expect.objectContaining({ lon: new Lon(0, 1), liLon: true, kulupu: 'nimi',    nimi: 'soweli' }),
      expect.objectContaining({ lon: new Lon(1, 1), liLon: true, kulupu: 'sitelen', nimi: 'telo'   }),
      expect.objectContaining({ lon: new Lon(1, 1), liLon: true, kulupu: 'nimi',    nimi: 'li'     }),
      expect.objectContaining({ lon: new Lon(2, 1), liLon: true, kulupu: 'nimi',    nimi: 'mi'     }),
    ])
  )
})

test.each([
  {
    nimi: 'ma ala',
    ma: [],
  },
  {
    nimi: 'ma pi suli poka ala',
    ma: ['', '', ''],
  },
  {
    nimi: 'linja pi suli pi sama ala',
    ma: ['..', '...'],
  },
  {
    nimi: 'nimi pi lon ala',
    ma: ['PaLIsa'],
  },
  {
    nimi: 'nimi pi lon ala',
    ma: ['ukulele'],
  },
  {
    nimi: 'nimi li ken open e nimi mute',
    ma: ['al'], // ala | ale
  },
  {
    nimi: 'ijo sitelen li jo e nimi pali',
    ma: ['PINI'],
  },
  {
    nimi: 'namako ike',
    ma: ['@'],
    namako: { '!': 'JAN' },
  },
])('lipu ma ike', lipuMa => {
  const pilinIke = () => pilinELipuMa(lipuMa)
  expect(pilinIke).toThrowError()
})
