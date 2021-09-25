import Im from 'immutable';
import { Token, TokenPosition } from 'typescript-parsec';
import { KulupuNimi, panaEKulupuNimi } from './nimiAli';
import { Lon } from './lon';
import { IjoEnNanpa, LonIjo } from './lonIjo';

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
    ? ({ x, y }: Lon) => ({ x: y, y: x })
    : ({ x, y }: Lon) => ({ x: x, y: y });
  const suliAnte = ante(suli);
  
  return Im.Range(0, suliAnte.y).map(y =>
    Im.Range(0, suliAnte.x)
      .map(x => paliEToki(x, lonIjo.get(ante({ x: x, y: y }))))
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
  else if(palisaToki.size == 1)
    return palisaToki.peek()!;
  else
    throw Error('palisa toki li jo e ala!');
}

function paliEToki(x: number, ijoENanpa: IjoEnNanpa | undefined): Toki
{
  const lonToki = panaELonToki(x);
  if(ijoENanpa && !ijoENanpa.ijo.liSitelen)
  {
    const nimi = ijoENanpa.ijo.nimi;
    const kulupu = panaEKulupuNimi(nimi);
    return {
      nanpaIjo: ijoENanpa.nanpa,
      kind: kulupu,
      text: nimi,
      pos: lonToki,
      next: undefined,
    };
  }
  else
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
