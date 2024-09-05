import { test, expect } from 'vitest';
import { pilinELipuMa } from '../insa/lipuMa';
import { Musi } from "../insa/musi";
import { Ijo } from "../insa/ijo";

test.each([
  {
    nimi: 'mi tawa',
    open: {
      ma: [
        ' .  sow  . ',
        'SOW LI  MI ',
      ]
    },
    nasin: '←↓↓→→→↑',
    pini: {
      ma: [
        ' .   .  sow',
        'SOW LI  MI ',
      ]
    }
  },
  
  {
    nimi: 'tawa e ijo',
    open: {
      ma: [
        'NIM EN  KIW LI  TAW',
        'ma   .  kiw  .   . ',
        ' .  SOW LI  MI  sow',
        'AKE LI  AWE  .  kiw',
        'MA  LI   .   .  ake',
      ]
    },
    nasin: '↓←←↑↑←↓↑↑↑←←↑←→',
    pini: {
      ma: [
        'NIM EN  KIW LI  TAW',
        'ma  kiw  .  ake kiw',
        'SOW LI  sow  .   . ',
        'AKE LI  MI   .   . ',
        'MA  LI  AWE  .   . ',
      ]
    }
  },
  
  {
    nimi: 'weka en moli',
    open: {
      ma: [
        'sow kiw KIW LI  AWE KIW LI  WEK',
        'sow kil KIL LI  MOL  .   .  SOW',
        'sow tel SOW LON TEL LI  WEK LI ',
        'sow kas KAS LON SOW LI  WEK MI ',
      ]
    },
    nasin: '→',
    pini: {
      ma: [
        'sow  .  KIW LI  AWE KIW LI  WEK',
        ' .  kil KIL LI  MOL  .   .  SOW',
        ' .  tel SOW LON TEL LI  WEK LI ',
        ' .  sow KAS LON SOW LI  WEK MI ',
      ]
    }
  },
  
])('musi', ({ nimi, open, nasin, pini }) =>
{
  const musiOpen = new Musi({ nimi: nimi, ...open });
  const musiPini = musiOpen.tawaNasin(nasin);
  const ijoLon = wekaENanpa(musiPini.tawaNi.lipuIjo.valueSeq().toArray());
  
  const { ijoAli } = pilinELipuMa({ nimi: nimi, ...pini });
  const ijoWile = wekaENanpa(ijoAli);
  
  // O PALI pona e ni:
  expect(ijoLon).toEqual(expect.arrayContaining(ijoWile));
  expect(ijoWile).toEqual(expect.arrayContaining(ijoLon));
});

function wekaENanpa(ijoMute: readonly Ijo[])
{
  return ijoMute
    .filter(ijo => ijo.liLon)
    .map(ijo => ({ lon: ijo.lon, kulupu: ijo.kulupu, nimi: ijo.nimi }));
}