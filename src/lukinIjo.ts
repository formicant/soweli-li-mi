import { KulupuNimi, NimiIjo } from './insa/nimiAli';
import { Kule } from './kule';

export type AnteTawa = 'poka' | 'sikePoka' | 'sikeSewi';

export interface LukinIjo
{
  readonly kule: Kule;
  readonly anteTawa?: AnteTawa;
}

export const lukinPiKulupuNimi: { [kulupu in KulupuNimi]: LukinIjo } =
{
  ijo:    { kule: '#26a' },
  toki:   { kule: '#555' },
  kulupu: { kule: '#682' },
  pali:   { kule: '#b52' },
} as const;

export const lukinPiIjoAli: { [nimi in NimiIjo]: LukinIjo } =
{
  soweli: { kule: '#444', anteTawa: 'poka' },
  waso:   { kule: '#678', anteTawa: 'poka' },
  kala:   { kule: '#d80', anteTawa: 'sikePoka' },
  akesi:  { kule: '#294', anteTawa: 'sikeSewi' },
  pipi:   { kule: '#850', anteTawa: 'sikeSewi' },
  jan:    { kule: '#c86' },
  mije:   { kule: '#04c' },
  meli:   { kule: '#c08' },
  tomo:   { kule: '#c60' },
  ma:     { kule: '#666' },
  kiwen:  { kule: '#478' },
  telo:   { kule: '#09b' },
  ko:     { kule: '#884', anteTawa: 'sikeSewi' },
  kili:   { kule: '#b10' },
  kasi:   { kule: '#2a4' },
  pan:    { kule: '#890' },
  sike:   { kule: '#60a' },
  lipu:   { kule: '#0aa' },
  nena:   { kule: '#750' },
  lupa:   { kule: '#750' },
  poki:   { kule: '#a90' },
  supa:   { kule: '#b80' },
  palisa: { kule: '#490', anteTawa: 'sikeSewi' },
  ilo:    { kule: '#488' },
  len:    { kule: '#a94' },
  mani:   { kule: '#c90' },
  linja:  { kule: '#d00', anteTawa: 'poka' },
  jaki:   { kule: '#543', anteTawa: 'sikePoka' },
  suno:   { kule: '#c80', anteTawa: 'sikeSewi' },
  mun:    { kule: '#07d', anteTawa: 'sikePoka' },
  pilin:  { kule: '#e02' },
  olin:   { kule: '#e05' },
  tenpo:  { kule: '#555', anteTawa: 'sikeSewi' },
  sijelo: { kule: '#a85' },
  lawa:   { kule: '#d60', anteTawa: 'poka' },
  luka:   { kule: '#a85', anteTawa: 'sikeSewi' },
  noka:   { kule: '#830', anteTawa: 'poka' },
  uta:    { kule: '#d42' },
  kute:   { kule: '#a85', anteTawa: 'poka' },
  oko:    { kule: '#24d', anteTawa: 'sikePoka' },
  pu:     { kule: '#109' },
} as const;
