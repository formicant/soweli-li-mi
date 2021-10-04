import Im from 'immutable';
import { Token, TokenPosition } from 'typescript-parsec';
import { KulupuNimi, panaEKulupuNimi } from './nimiAli';
import { Lon } from './lon';
import { LonIjo } from './lonIjo';
import { Ijo } from './ijo';

type KulupuToki = KulupuNimi | 'ala';

export interface Toki extends Token<KulupuToki>
{
  nanpaIjo?: number;
}

export function* panaETokiAli(suli: Lon, lonIjo: LonIjo)
{
  yield* panaELinjaToki(suli, lonIjo, (x: number, y: number) => new Lon(x, y));
  yield* panaELinjaToki(suli, lonIjo, (x: number, y: number) => new Lon(y, x));
}

function* panaELinjaToki(suli: Lon, lonIjo: LonIjo, paliELon: (x: number, y: number) => Lon)
{
  for(let y = 0; y < suli.y; y++)
  {
    let linjaToki: Toki | undefined = undefined;
    for(let x = suli.x - 1; x >= 0; x--)
      linjaToki = paliEToki(x, lonIjo.get(paliELon(x, y)), linjaToki);
    yield linjaToki!;
  }
}

function paliEToki(x: number, ijoENanpa: Im.Collection<number, Ijo> | undefined, tokiSinpin?: Toki): Toki
{
  const lonToki = panaELonToki(x);
  
  if(ijoENanpa !== undefined)
  {
    const nimiWan = ijoENanpa.filterNot(ijo => ijo.liSitelen()).entrySeq().first();
    // O PALI: lon wan li ken jo e nimi mute. o pali pana e ken ali!
    if(nimiWan !== undefined)
    {
      const [nanpa, { nimi }] = nimiWan;
      const kulupu = panaEKulupuNimi(nimi);
      return {
        nanpaIjo: nanpa,
        kind: kulupu,
        text: nimi,
        pos: lonToki,
        next: tokiSinpin,
      };
    }
  }
  
  return {
    kind: 'ala',
    text: '',
    pos: lonToki,
    next: tokiSinpin,
  };
}

function panaELonToki(x: number): TokenPosition
{
  return {
    index: x,
    rowBegin: 1,
    columnBegin: x + 1,
    rowEnd: 1,
    columnEnd: x + 2,
  };
}
