export type KlupuNimi = 'ijo' | 'kulupu' | 'pali' | 'toki'

export const kulupuPiNimiAli =
{
  soweli: 'ijo'    as KlupuNimi,
  waso:   'ijo'    as KlupuNimi,
  kala:   'ijo'    as KlupuNimi,
  akesi:  'ijo'    as KlupuNimi,
  pipi:   'ijo'    as KlupuNimi,
  tomo:   'ijo'    as KlupuNimi,
  kiwen:  'ijo'    as KlupuNimi,
  telo:   'ijo'    as KlupuNimi,
  ko:     'ijo'    as KlupuNimi,
  kasi:   'ijo'    as KlupuNimi,
  kili:   'ijo'    as KlupuNimi,
  sike:   'ijo'    as KlupuNimi,
  leko:   'ijo'    as KlupuNimi,
  
  ali:    'kulupu' as KlupuNimi,
  nimi:   'kulupu' as KlupuNimi,
  
  mi:     'pali'   as KlupuNimi,
  pini:   'pali'   as KlupuNimi,
  moli:   'pali'   as KlupuNimi,
  awen:   'pali'   as KlupuNimi,
  weka:   'pali'   as KlupuNimi,
  tawa:   'pali'   as KlupuNimi,
  pakala: 'pali'   as KlupuNimi,
  
  li:     'toki'   as KlupuNimi,
  e:      'toki'   as KlupuNimi,
  en:     'toki'   as KlupuNimi,
  ala:    'toki'   as KlupuNimi,
  lon:    'toki'   as KlupuNimi,
} as const;

export type Nimi = keyof typeof kulupuPiNimiAli;
