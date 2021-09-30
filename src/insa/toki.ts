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

export function panaETokiAli(suli: Lon, lonIjo: LonIjo)
{
  return panaELinja(suli, lonIjo, false)
    .concat(panaELinja(suli, lonIjo, true));
}

function panaELinja(suli: Lon, lonIjo: LonIjo, anteEPokaESewi: boolean)
{
  const ante = anteEPokaESewi
    ? (lon: Lon) => lon.anteEPokaESewi()
    : (lon: Lon) => lon;
  const suliAnte = ante(suli);
  
  return Im.Range(0, suliAnte.y).map(y =>
    Im.Range(0, suliAnte.x)
      .map(x => paliEToki(x, lonIjo.get(ante(new Lon(x, y)))))
      .update(panaELinjaToki));
}

function panaELinjaToki(tokiMute: Im.Seq.Indexed<Toki>)
{
  const palisaToki = tokiMute.toStack();
  return linjaEPalisaToki(palisaToki);
}

function linjaEPalisaToki(palisaToki: Im.Stack<Toki>): Toki
{
  if(palisaToki.size > 1)
    return {
      ...palisaToki.peek()!,
      next: linjaEPalisaToki(palisaToki.pop())
    };
  else if(palisaToki.size === 1)
    return palisaToki.peek()!;
  else
    throw Error('palisa toki li jo e ala!');
}

function paliEToki(x: number, ijoENanpa: Im.Collection<number, Ijo> | undefined): Toki
{
  const lonToki = panaELonToki(x);
  if(ijoENanpa !== undefined)
  {
    const nimiWan = ijoENanpa.filterNot(ijo => ijo.liSitelen()).entrySeq().first();
    // O PALI: lon wan li ken jo e nimi mute. o pali pana e ken ali!
    if(nimiWan !== undefined)
    {
      const [nanpa, ijo] = nimiWan;
      const nimi = ijo.nimi;
      const kulupu = panaEKulupuNimi(nimi);
      return {
        nanpaIjo: nanpa,
        kind: kulupu,
        text: nimi,
        pos: lonToki,
        next: undefined,
      };
    }
  }
  
  return {
    kind: 'ala',
    text: '',
    pos: lonToki,
    next: undefined,
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
