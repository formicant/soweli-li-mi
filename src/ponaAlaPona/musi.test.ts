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
])('musi', ({ open, nasin, pini }) =>
{
  const musiOpen = new Musi(open);
  const musiPini = nasin.split('')
    .reduce((musi, nasinTawa) => musi.tawa(nasinTawa as NasinTawa), musiOpen);
  const ijoLon = wekaENanpa(musiPini.tawaNi.lipuIjo.valueSeq().toArray());
  
  const maPini = pilinELipuMa(pini);
  const ijoWile = wekaENanpa(maPini.ijoAli);
  
  // O PALI pona e ni:
  expect(ijoLon).toEqual(expect.arrayContaining(ijoWile));
  expect(ijoWile).toEqual(expect.arrayContaining(ijoLon));
});

function wekaENanpa(ijoMute: readonly Ijo[])
{
  return ijoMute.map(ijo => ({ lon: ijo.lon, kulupu: ijo.kulupu, nimi: ijo.nimi }));
}