import LukinNimi from './LukinNimi';

export const lukinPiNnimiAli =
{
  soweli: { kulupu: 'ijo',  kule: '#222', anteTawa: 'poka' } as LukinNimi,
  tomo:   { kulupu: 'ijo',  kule: '#640', anteTawa: 'awen' } as LukinNimi,
  kiwen:  { kulupu: 'ijo',  kule: '#468', anteTawa: 'awen' } as LukinNimi,
  telo:   { kulupu: 'ijo',  kule: '#09b', anteTawa: 'awen' } as LukinNimi,
  ko:     { kulupu: 'ijo',  kule: '#884', anteTawa: 'awen' } as LukinNimi,
  kasi:   { kulupu: 'ijo',  kule: '#2a4', anteTawa: 'awen' } as LukinNimi,
  kili:   { kulupu: 'ijo',  kule: '#b10', anteTawa: 'awen' } as LukinNimi,
  waso:   { kulupu: 'ijo',  kule: '#678', anteTawa: 'poka' } as LukinNimi,
  kala:   { kulupu: 'ijo',  kule: '#47a', anteTawa: 'ali'  } as LukinNimi,
  akesi:  { kulupu: 'ijo',  kule: '#294', anteTawa: 'ali'  } as LukinNimi,
  pipi:   { kulupu: 'ijo',  kule: '#850', anteTawa: 'ali'  } as LukinNimi,
  sike:   { kulupu: 'ijo',  kule: '#444', anteTawa: 'awen' } as LukinNimi,
  leko:   { kulupu: 'ijo',  kule: '#444', anteTawa: 'awen' } as LukinNimi,
  
  mi:     { kulupu: 'pali', kule: '#222' } as LukinNimi,
  pini:   { kulupu: 'pali', kule: '#640' } as LukinNimi,
  moli:   { kulupu: 'pali', kule: '#b10' } as LukinNimi,
  awen:   { kulupu: 'pali', kule: '#468' } as LukinNimi,
  weka:   { kulupu: 'pali', kule: '#bbb' } as LukinNimi,
  tawa:   { kulupu: 'pali', kule: '#222' } as LukinNimi,
  pakala: { kulupu: 'pali', kule: '#266' } as LukinNimi,
  
  li:     { kulupu: 'toki', kule: '#666' } as LukinNimi,
  e:      { kulupu: 'toki', kule: '#666' } as LukinNimi,
  en:     { kulupu: 'toki', kule: '#666' } as LukinNimi,
  ala:    { kulupu: 'toki', kule: '#822' } as LukinNimi,
  lon:    { kulupu: 'toki', kule: '#666' } as LukinNimi,
};

export type Nimi = keyof typeof lukinPiNnimiAli;
