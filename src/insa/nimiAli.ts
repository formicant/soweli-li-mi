import { monsiELukinKulupu } from './kepeken';

/**
 * nimi ali li insa kulupu mute:
 *   nimi ijo li nimi e sitelen.
 *   nimi kulupu li nimi e kulupu ijo.
 *   nimi pali li nimi e ni: ijo li pali seme?
 *   nimi toki li insa nimi ante mute, li pali e nasin musi.
 */
export type KulupuNimi = 'ijo' | 'kulupu' | 'pali' | 'toki';

/**
 * nimi ali insa kulupu ona.
 */
export const nimiInsaKulupu =
{
  toki:
  [
    'li',
    'e',
    'en',
    'ala',
    'lon',
  ],
  kulupu:
  [
    'nimi',    // nimi ali
    'sitelen', // sitelen ali
    'ali',     // nimi anu sitelen ali
    'kon',     // leko pi ijo ala
  ],
  pali:
  [
    'mi',
    'pini',
    'moli',
    'awen',
    'weka',
    'tawa',
    'sewi',
    'anpa',
  ],
  ijo:
  [
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
    'sike',
    'lipu',
    'nena',
    'lupa',
    'poki',
    'supa',
    'palisa',
    'ilo',
    'len',
    'mani',
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
    'pu',
  ]
} as const;

const kulupuPiNimiAli = monsiELukinKulupu(nimiInsaKulupu);

export const nimiAli = kulupuPiNimiAli.keySeq().toArray();

export type NimiToki   = typeof nimiInsaKulupu.toki  [number];
export type NimiKulupu = typeof nimiInsaKulupu.kulupu[number];
export type NimiIjo    = typeof nimiInsaKulupu.ijo   [number];
export type NimiPali   = typeof nimiInsaKulupu.pali  [number];

export type Nimi = NimiToki | NimiKulupu | NimiIjo | NimiPali;

/**
 * nimi li insa ala insa kulupu ni?
 */
export function liInsaKulupu(nimi: Nimi, kulupu: 'toki'  ): nimi is NimiToki
export function liInsaKulupu(nimi: Nimi, kulupu: 'kulupu'): nimi is NimiKulupu
export function liInsaKulupu(nimi: Nimi, kulupu: 'ijo'   ): nimi is NimiIjo
export function liInsaKulupu(nimi: Nimi, kulupu: 'pali'  ): nimi is NimiPali
export function liInsaKulupu(nimi: Nimi, kulupu: KulupuNimi)
{
  return (nimiInsaKulupu[kulupu] as readonly Nimi[]).includes(nimi);
}

export function panaEKulupuNimi(nimi: Nimi)
{
  return kulupuPiNimiAli.get(nimi) as KulupuNimi;
}
