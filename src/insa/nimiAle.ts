import { monsiELukinKulupu } from './kepeken'

/**
 * nimi ale li insa kulupu mute:
 *   nimi ijo li nimi e sitelen.
 *   nimi kulupu li nimi e kulupu ijo.
 *   nimi pali li nimi e ni: ijo li pali seme?
 *   nimi toki li insa nimi ante mute, li pali e nasin musi.
 */
export type KulupuNimi = 'ijo' | 'kulupu' | 'pali' | 'toki'

/**
 * nimi ale insa kulupu ona.
 */
export const nimiInsaKulupu = {
  toki: [
    'li',
    'e',
    'en',
    'ala',
    'lon',
  ],
  kulupu: [
    'nimi',    // nimi ale
    'sitelen', // sitelen ale
    'ale',     // nimi ale en sitelen ale
    'kon',     // leko pi ijo ala
  ],
  pali: [
    'mi',
    'pini',
    'moli',
    'awen',
    'weka',
    'tawa',
    'sewi',
    'anpa',
  ],
  ijo: [
    'soweli',
    'waso',
    'kala',
    'akesi',
    'pipi',
    'jan',
    'mije',
    'meli',
    'tomo',
    'ma',
    'kiwen',
    'telo',
    'ko',
    'kili',
    'kasi',
    'pan',
    'soko',
    'monsuta',
    'sike',
    'leko',
    'lipu',
    'nena',
    'lupa',
    'poki',
    'supa',
    'palisa',
    'misikeke',
    'ilo',
    'len',
    'mani',
    'suwi',
    'kulupu',
    'musi',
    'linja',
    'jaki',
    'suno',
    'mun',
    'pilin',
    'olin',
    'tenpo',
    'sijelo',
    'lawa',
    'luka',
    'noka',
    'uta',
    'kute',
    'oko',
    'namako',
    'nanpa',
    'sona',
    'nasa',
    'unpa',
    'tonsi',
    'pu',
    'ku',
  ],
} as const

// tenpo ni la, nimi ni li lon ala:
// nimi pu:
//   a ante anu esun ijo ike insa jelo jo kama ken kepeken kin la lape laso lete lili loje mama
//   moku mu mute ni o ona open pakala pi pimeja pona sama seme seli sinpin suli tan taso toki tu
//   walo wan wawa wile
// nimi ku suli: (ale li lon linja pona 4.9)
//   epiku jasima kijetesantakalu kipisi kokosila lanpan meso n
// nimi ku lili: (nimi 'apeja' taso li lon linja pona 4.9)
//   apeja ete ewe isipin kan kapesi ke kese kiki kuntu likujo loka majuna mulapisu neja oke pata
//   peto po polinpin pomotolo powe san soto taki te teje to tuli umesu unu usawi wa yupekosi Pingo
//   su ju lu nu u
// 
// nimi ni li open sama nimi ante li ken ala kepeken:
//   alasa (ala), kalama kalamARR (kala), kule kulijo (kulupu), lukin (luka), monsi (monsuta),
//   nasin (nasa), pali (palisa), pana (pan), poka (poki), selo (seli), sin sina (sinpin), 
//   utala (uta), kamalawala (kama), linluwi (linja), misa (misikeke), pake (pakala), samu (sama),
//   waleja (walo), wasoweli (waso)

const kulupuPiNimiAle = monsiELukinKulupu(nimiInsaKulupu)

export const nimiAle = kulupuPiNimiAle.keySeq().toArray()

export type NimiToki   = (typeof nimiInsaKulupu.toki  )[number]
export type NimiKulupu = (typeof nimiInsaKulupu.kulupu)[number]
export type NimiIjo    = (typeof nimiInsaKulupu.ijo   )[number]
export type NimiPali   = (typeof nimiInsaKulupu.pali  )[number]

export type Nimi = NimiToki | NimiKulupu | NimiIjo | NimiPali

/**
 * nimi li insa ala insa kulupu ni?
 */
export function liInsaKulupu(nimi: Nimi, kulupu: 'toki'  ): nimi is NimiToki
export function liInsaKulupu(nimi: Nimi, kulupu: 'kulupu'): nimi is NimiKulupu
export function liInsaKulupu(nimi: Nimi, kulupu: 'ijo'   ): nimi is NimiIjo
export function liInsaKulupu(nimi: Nimi, kulupu: 'pali'  ): nimi is NimiPali
export function liInsaKulupu(nimi: Nimi, kulupu: KulupuNimi) {
  return (nimiInsaKulupu[kulupu] as readonly Nimi[]).includes(nimi)
}

export function panaEKulupuNimi(nimi: Nimi) {
  return kulupuPiNimiAle.get(nimi) as KulupuNimi
}
