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
  tomo:   { kule: '#c60' },
  kiwen:  { kule: '#478' },
  ma:     { kule: '#555' },
  telo:   { kule: '#09b' },
  ko:     { kule: '#884' },
  kasi:   { kule: '#2a4' },
  kili:   { kule: '#b10' },
  pan:    { kule: '#8a0' },
  sike:   { kule: '#444' },
  lipu:   { kule: '#444' },
} as const;
