import { pilinELipuMa } from '../insa/lipuMa'
import { Lon } from '../insa/lon';

test.each([
  {
    nimi: 'ma lili pona',
    ma: [
      ' KON ake ',
      '  .  PIN ',
    ]
  },
  
  {
    nimi: 'ma lili pona',
    ma: [
      'Kon akesi',
      '.PINI',
    ]
  },
  
])('lupu ma pona', lipuMa =>
{
  const { nimiMa, suliMa, ijoAli } = pilinELipuMa(lipuMa);
  
  expect(nimiMa).toBe('ma lili pona');
  expect(suliMa.x).toBe(2);
  expect(suliMa.y).toBe(2);
  expect(ijoAli).toHaveLength(3)
  expect(ijoAli).toEqual(expect.arrayContaining([
    expect.objectContaining({ lon: new Lon(0, 0), kulupu: 'nimi', nimi: 'kon' }),
    expect.objectContaining({ lon: new Lon(1, 0), kulupu: 'sitelen', nimi: 'akesi' }),
    expect.objectContaining({ lon: new Lon(1, 1), kulupu: 'nimi', nimi: 'pini' }),
  ]));
});

test.each([
  {
    nimi: 'ma lili pona namako',
    ma: [
      ' .  sow @tL',
      'SOW @tL MI ',
    ],
    namako: { '@tL': 'telo LI' }
  },
  
  {
    nimi: 'ma lili pona namako',
    ma: [
      '1 2 3',
      '4 5 6',
    ],
    namako: {
      '1': '',
      '2': 'soweli',
      '3': 'telo Li',
      '4': 'Soweli',
      '5': 'Li telo',
      '6': 'Mi',
    }
  },
  
])('lupu ma pona namako', lipuMa =>
{
  const { nimiMa, suliMa, ijoAli } = pilinELipuMa(lipuMa);
  
  expect(nimiMa).toBe('ma lili pona namako');
  expect(suliMa.x).toBe(3);
  expect(suliMa.y).toBe(2);
  expect(ijoAli).toHaveLength(7)
  expect(ijoAli).toEqual(expect.arrayContaining([
    expect.objectContaining({ lon: new Lon(1, 0), kulupu: 'sitelen', nimi: 'soweli' }),
    expect.objectContaining({ lon: new Lon(2, 0), kulupu: 'sitelen', nimi: 'telo' }),
    expect.objectContaining({ lon: new Lon(2, 0), kulupu: 'nimi', nimi: 'li' }),
    expect.objectContaining({ lon: new Lon(0, 1), kulupu: 'nimi', nimi: 'soweli' }),
    expect.objectContaining({ lon: new Lon(1, 1), kulupu: 'sitelen', nimi: 'telo' }),
    expect.objectContaining({ lon: new Lon(1, 1), kulupu: 'nimi', nimi: 'li' }),
    expect.objectContaining({ lon: new Lon(2, 1), kulupu: 'nimi', nimi: 'mi' }),
  ]));
});

test.each([
  {
    nimi: 'ma ala',
    ma: []
  },
  
  {
    nimi: 'ma pi suli poka ala',
    ma: ['', '', '']
  },
  
  {
    nimi: 'linja pi suli pi sama ala',
    ma: [
      '..',
      '...',
    ]
  },
  
  {
    nimi: 'nimi pi lon ala',
    ma: ['Mewika']
  },
  
  {
    nimi: 'nimi li ken open e nimi mute',
    ma: ['AL'] // ala | ali
  },
  
  {
    nimi: 'ijo sitelen li jo e nimi pali',
    ma: ['pini']
  },
  
  {
    nimi: 'namako ike',
    ma: ['@'],
    namako: { '!': 'jan' }
  },
  
])('lipu ma ike', lipuMa =>
{
  const pilinIke = () => pilinELipuMa(lipuMa);
  expect(pilinIke).toThrowError();
});
