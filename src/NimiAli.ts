import LukinNimi from './LukinNimi';

export const lukinPiNnimiAli =
{
  soweli: <LukinNimi>{ kulupu: 'ijo',  kule: '#222', anteTawa: 'poka' },
  tomo:   <LukinNimi>{ kulupu: 'ijo',  kule: '#640', anteTawa: 'awen' },
  kiwen:  <LukinNimi>{ kulupu: 'ijo',  kule: '#468', anteTawa: 'awen' },
  telo:   <LukinNimi>{ kulupu: 'ijo',  kule: '#09b', anteTawa: 'awen' },
  ko:     <LukinNimi>{ kulupu: 'ijo',  kule: '#884', anteTawa: 'awen' },
  kasi:   <LukinNimi>{ kulupu: 'ijo',  kule: '#2a4', anteTawa: 'awen' },
  kili:   <LukinNimi>{ kulupu: 'ijo',  kule: '#b10', anteTawa: 'awen' },
  waso:   <LukinNimi>{ kulupu: 'ijo',  kule: '#678', anteTawa: 'poka' },
  kala:   <LukinNimi>{ kulupu: 'ijo',  kule: '#47a', anteTawa: 'ali'  },
  akesi:  <LukinNimi>{ kulupu: 'ijo',  kule: '#294', anteTawa: 'ali'  },
  pipi:   <LukinNimi>{ kulupu: 'ijo',  kule: '#850', anteTawa: 'ali'  },
  sike:   <LukinNimi>{ kulupu: 'ijo',  kule: '#444', anteTawa: 'awen' },
  leko:   <LukinNimi>{ kulupu: 'ijo',  kule: '#444', anteTawa: 'awen' },
  
  mi:     <LukinNimi>{ kulupu: 'pali', kule: '#222' },
  pini:   <LukinNimi>{ kulupu: 'pali', kule: '#640' },
  moli:   <LukinNimi>{ kulupu: 'pali', kule: '#b10' },
  awen:   <LukinNimi>{ kulupu: 'pali', kule: '#468' },
  weka:   <LukinNimi>{ kulupu: 'pali', kule: '#bbb' },
  tawa:   <LukinNimi>{ kulupu: 'pali', kule: '#222' },
  pakala: <LukinNimi>{ kulupu: 'pali', kule: '#266' },
  
  li:     <LukinNimi>{ kulupu: 'toki', kule: '#666' },
  e:      <LukinNimi>{ kulupu: 'toki', kule: '#666' },
  en:     <LukinNimi>{ kulupu: 'toki', kule: '#666' },
  ala:    <LukinNimi>{ kulupu: 'toki', kule: '#822' },
  lon:    <LukinNimi>{ kulupu: 'toki', kule: '#666' },
};

export type Nimi = keyof typeof lukinPiNnimiAli;
