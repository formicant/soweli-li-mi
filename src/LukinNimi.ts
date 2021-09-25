import { Nimi } from './insa/NimiAli';
import { KulupuIjo } from './insa/Ijo';
import { Kule } from './Kule';

export type AnteTawa = 'poka' | 'sikePoka' | 'sikeSewi';

export interface LukinNimi
{
  readonly kule: Kule;
  readonly anteTawa?: AnteTawa;
  readonly lawaSewi?: boolean;
}

export const lukinPiNnimiAli: { [nimi in Nimi]: LukinNimi } =
{
  soweli: { kule: '#222', anteTawa: 'poka' },
  waso:   { kule: '#678', anteTawa: 'poka' },
  kala:   { kule: '#d80', anteTawa: 'sikePoka' },
  akesi:  { kule: '#294', anteTawa: 'sikeSewi' },
  pipi:   { kule: '#850', anteTawa: 'sikeSewi' },
  tomo:   { kule: '#640' },
  kiwen:  { kule: '#468' },
  telo:   { kule: '#09b' },
  ko:     { kule: '#884' },
  kasi:   { kule: '#2a4' },
  kili:   { kule: '#b10' },
  sike:   { kule: '#444' },
  leko:   { kule: '#444' },
  
  ali:    { kule: '#666' },
  nimi:   { kule: '#666' },
  kon:    { kule: '#2af' },
  
  mi:     { kule: '#222' },
  pini:   { kule: '#640' },
  moli:   { kule: '#b10' },
  awen:   { kule: '#468' },
  weka:   { kule: '#bbb' },
  tawa:   { kule: '#222' },
  pakala: { kule: '#266' },
  
  li:     { kule: '#666' },
  e:      { kule: '#666' },
  en:     { kule: '#666' },
  ala:    { kule: '#f20' },
  lon:    { kule: '#666' },
} as const;

export const anteEKule: { [kulupu in KulupuIjo]: boolean } =
{
  ijo:     true,
  toki:    true,
  kulupu:  true,
  pali:    false,
  sitelen: false,
} as const;
