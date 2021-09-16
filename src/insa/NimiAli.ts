export type KlupuNimi = 'ijo' | 'kulupu' | 'pali' | 'toki'

export const kulupuPiNimiAli =
{
  soweli: 'ijo',
  waso:   'ijo',
  kala:   'ijo',
  akesi:  'ijo',
  pipi:   'ijo',
  tomo:   'ijo',
  kiwen:  'ijo',
  telo:   'ijo',
  ko:     'ijo',
  kasi:   'ijo',
  kili:   'ijo',
  sike:   'ijo',
  leko:   'ijo',
  
  ali:    'kulupu',
  nimi:   'kulupu',
  
  mi:     'pali',
  pini:   'pali',
  moli:   'pali',
  awen:   'pali',
  weka:   'pali',
  tawa:   'pali',
  pakala: 'pali',
  
  li:     'toki',
  e:      'toki',
  en:     'toki',
  ala:    'toki',
  lon:    'toki',
} as const;

export type Nimi = keyof typeof kulupuPiNimiAli;
