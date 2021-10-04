import Im from "immutable";
import { pilinELipuMa } from '../insa/lipuMa';
import { MaIjo } from "../insa/maIjo";
import { panaENasinMusiAli } from '../insa/pilinToki';
import { tokiENasinMusi } from "../insa/nasinMusi";
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
])('musi', ({ open, nasin, pini }) =>
{
  const musiOpen = new Musi(open);
  const musiPini = nasin.split('')
    .reduce((musi, nasinTawa) => musi.tawa(nasinTawa as NasinTawa), musiOpen);
  const ijoLon = wekaENanpa(musiPini.tawaNi.lipuIjo.valueSeq().toArray());
  
  const maPini = pilinELipuMa(pini);
  const ijoWile = wekaENanpa(maPini.ijoAli);
  
  expect(ijoLon).toEqual(expect.arrayContaining(ijoWile));
  expect(ijoWile).toEqual(expect.arrayContaining(ijoLon));
});

function wekaENanpa(ijoMute: readonly Ijo[])
{
  return ijoMute.map(ijo => ({ lon: ijo.lon, kulupu: ijo.kulupu, nimi: ijo.nimi }));
}