import { Nimi } from './NimiAli';
import { Kule } from './Kule';

export interface LukinNimi
{
  readonly kule: Kule;
  readonly anteTawa?: 'poka' | 'ali';
}

export const lukinPiNnimiAli: { [nimi in Nimi]: LukinNimi } =
{
  soweli: { kule: '#222', anteTawa: 'poka' },
  waso:   { kule: '#678', anteTawa: 'poka' },
  kala:   { kule: '#47a', anteTawa: 'ali' },
  akesi:  { kule: '#294', anteTawa: 'ali' },
  pipi:   { kule: '#850', anteTawa: 'ali' },
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
