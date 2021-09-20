import Im from "immutable";

export type KlupuNimi = 'toki' | 'kulupu' | 'ijo' | 'pali';

const nimiInsaKulupu =
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
    'ali',
    'nimi',
  ],
  ijo:
  [
    'soweli',
    'waso',
    'kala',
    'akesi',
    'pipi',
    'tomo',
    'kiwen',
    'telo',
    'ko',
    'kasi',
    'kili',
    'sike',
    'leko',
  ],
  pali:
  [
    'mi',
    'pini',
    'moli',
    'awen',
    'weka',
    'tawa',
    'pakala',
  ],
} as const;

const kulupuPiNimiAli = Im.Seq(nimiInsaKulupu)
  .flatMap((nimiMute, kulupu) => nimiMute.map(nimi => [nimi, kulupu]))
  .toMap();

export const nimiAli = kulupuPiNimiAli.keys();

export type NimiToki   = typeof nimiInsaKulupu.toki  [number];
export type NimiKulupu = typeof nimiInsaKulupu.kulupu[number];
export type NimiIjo    = typeof nimiInsaKulupu.ijo   [number];
export type NimiPali   = typeof nimiInsaKulupu.pali  [number];

export type Nimi = NimiToki | NimiKulupu | NimiIjo | NimiPali;

export function liInsaKulupu(nimi: Nimi, kulupu: 'toki'  ): nimi is NimiToki
export function liInsaKulupu(nimi: Nimi, kulupu: 'kulupu'): nimi is NimiKulupu
export function liInsaKulupu(nimi: Nimi, kulupu: 'ijo'   ): nimi is NimiIjo
export function liInsaKulupu(nimi: Nimi, kulupu: 'pali'  ): nimi is NimiPali
export function liInsaKulupu(nimi: Nimi, kulupu: KlupuNimi)
{
  return (nimiInsaKulupu[kulupu] as ReadonlyArray<Nimi>).includes(nimi);
}

export function panaEKulupuNimi(nimi: Nimi)
{
  return kulupuPiNimiAli.get(nimi) as KlupuNimi;
}
