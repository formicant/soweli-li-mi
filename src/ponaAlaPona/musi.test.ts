import { pilinELipuMa } from '../insa/lipuMa';
import { Musi } from "../insa/musi";
import { NasinTawa } from "../insa/lon";
import { Ijo } from "../insa/ijo";

test.each([
  {
    open: {
      nimi: 'mi tawa',
      ma: [
        ' .  sow  . ',
        'SOW LI  MI ',
      ]
    },
    nasin: '←↓↓→→→↑',
    pini: {
      nimi: '',
      ma: [
        ' .   .  sow',
        'SOW LI  MI ',
      ]
    }
  },
  
  {
    open: {
      nimi: 'tawa e ijo',
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
      nimi: '',
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
    open: {
      nimi: 'weka en moli',
      ma: [
        'sow kiw KIW LI  AWE KIW LI  WEK',
        'sow kil KIL LI  MOL  .   .  SOW',
        'sow tel SOW LON TEL LI  WEK LI ',
        'sow kas KAS LON SOW LI  WEK MI ',
      ]
    },
    nasin: '→',
    pini: {
      nimi: '',
      ma: [
        'sow  .  KIW LI  AWE KIW LI  WEK',
        ' .  kil KIL LI  MOL  .   .  SOW',
        ' .  tel SOW LON TEL LI  WEK LI ',
        ' .  sow KAS LON SOW LI  WEK MI ',
      ]
    }
  },
  
])('musi', ({ open, nasin, pini }) =>
{
  const musiOpen = new Musi(open);
  const musiPini = nasin.split('')
    .reduce((musi, nasinTawa) => musi.tawa(nasinTawa as NasinTawa), musiOpen);
  const ijoLon = wekaENanpa(musiPini.tawaNi.lipuIjo.valueSeq().toArray());
  
  const { ijoAli } = pilinELipuMa(pini);
  const ijoWile = wekaENanpa(ijoAli);
  
  // O PALI pona e ni:
  expect(ijoLon).toEqual(expect.arrayContaining(ijoWile));
  expect(ijoWile).toEqual(expect.arrayContaining(ijoLon));
});

function wekaENanpa(ijoMute: readonly Ijo[])
{
  return ijoMute.map(ijo => ({ lon: ijo.lon, kulupu: ijo.kulupu, nimi: ijo.nimi }));
}