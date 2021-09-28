import Im from "immutable";
import { LipuMa } from "./lipuMa";
import { Lon } from "./lon";
import { paliELonIjo } from "./lonIjo";
import { panaETokiPiNasinMusi } from "./pilinToki";
import { NasinTawa, Tawa, tawaOpen } from "./tawa";

export interface Musi
{
  readonly lipuMa: LipuMa;
  readonly tenpo: Im.List<Tawa>;
  readonly tenpoNi: number;
}

export function openEMusi(lipuMa: LipuMa): Musi
{
  return {
    lipuMa: lipuMa,
    tenpo: Im.List.of(tawaOpen(lipuMa.ijoAli)),
    tenpoNi: 0,
  };
}

export function tenpoMonsi(musi: Musi, ali: boolean = false): Musi
{
  if(musi.tenpoNi > 0)
    return { ...musi, tenpoNi: ali ? 0 : musi.tenpoNi - 1 };
  else
    return musi;
}

export function tenpoSinpin(musi: Musi, ali: boolean = false): Musi
{
  if(musi.tenpoNi < musi.tenpo.size - 1)
    return { ...musi, tenpoNi: ali ? musi.tenpo.size - 1 : musi.tenpoNi + 1 };
  else
    return musi;
}

export function tawa(musi: Musi, nasin: NasinTawa): Musi
{
  const lipuIjo = tawaNi(musi).lipuIjo;
  const lonIjo = paliELonIjo(lipuIjo);
  const nasinMusi = panaETokiPiNasinMusi(musi.lipuMa.suli, lonIjo);
  
  //const lonPali = lonIjo.panaEAli();
  
  const soweli = lipuIjo.toSeq().filter(ijo => ijo.liSitelen);
  
  const soweliSin = soweli.map(ijo => insaELon(tawaELon(ijo, nasin), musi.lipuMa.suli));
  const lipuIjoSin = lipuIjo.merge(soweliSin);
  
  if(lipuIjoSin.equals(lipuIjo)) // li pali ala. ijo li sama ala.
    return musi
  else
  {
    const tawaSin: Tawa = { nasin: nasin, lipuIjo: lipuIjoSin };
    const tenpoSin = musi.tenpo.toSeq().take(musi.tenpoNi + 1).concat([tawaSin]).toList();
    
    return { ...musi, tenpo: tenpoSin, tenpoNi: musi.tenpoNi + 1 };
  }
}

export function tawaNi(musi: Musi)
{
  const tawaNi = musi.tenpo.get(musi.tenpoNi);
  if(tawaNi)
    return tawaNi;
  else
    throw Error('tenpo ni li ike!');
}

function tawaELon<T extends Lon>(lon: T, nasin: NasinTawa): T
{
  switch(nasin)
  {
    case 'sewi': return { ...lon, y: lon.y - 1 };
    case 'anpa': return { ...lon, y: lon.y + 1 };
    case 'soto': return { ...lon, x: lon.x - 1 };
    case 'teje': return { ...lon, x: lon.x + 1 };
    default: throw Error('nasin li ike!');
  }
}

function insaELon<T extends Lon>(lon: T, suli: Lon): T
{
  if(lon.x < 0)
    lon = { ...lon, x: 0 };
  else if(lon.x >= suli.x)
    lon = { ...lon, x: suli.x - 1 };
    
  if(lon.y < 0)
    lon = { ...lon, y: 0 };
  else if(lon.y >= suli.y)
    lon = { ...lon, y: suli.y - 1 };
  
  return lon;
}

// /**
//  * pana e linja tenpo pi ijo wan tan tenpo ni tawa open musi.
//  * ni li pona taso tawa jasima e leko.
//  * @param nanpaIjo nanpa taso tawa pana e ijo tan LipuIjo.
//  */
// export function tenpoPiniIjo(musi: Musi, nanpaIjo: number)
// {
//   return Im.Range(musi.tenpoNi, -1, -1)
//     .map(t => musi.tenpo.get(t)!.lipuIjo.get(nanpaIjo))
//     .takeWhile(t => t !== undefined) as Im.Seq.Indexed<Ijo>;
// }
