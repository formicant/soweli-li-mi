import Im from "immutable";
import { LipuIjo } from "./ijo";
import { LipuMa } from "./lipuMa";
import { paliELonIjo } from "./lonIjo";
import { LonPali, paliELonPali } from "./lonPali";
import { NasinMusi } from "./nasinMusi";
import { NimiIjo, panaEKulupuNimi } from "./nimiAli";
import { panaENasinMusiAli } from "./pilinToki";
import { NasinTawa, Tawa, tawaOpen, panaEKulupuTawa, tawaELon } from "./tawa";

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
  const nasinMusi = panaENasinMusiAli(musi.lipuMa.suli, lonIjo);
  const lonPali = paliELonPali(lonIjo, nasinMusi);
  
  const kulupuTawa = panaEKulupuTawa(musi.lipuMa.suli, lonPali, nasin)
    .toKeyedSeq()
    .mapEntries(([_, nanpa]) => [nanpa, lipuIjo.get(nanpa)!]);
  
  const kulupuTawaSin = kulupuTawa.map(ijo => tawaELon(ijo, nasin));
  const lipuIjoSin = lipuIjo.merge(kulupuTawaSin);
  
  const lonIjoSin = paliELonIjo(lipuIjoSin);
  const nasinMusiSin = panaENasinMusiAli(musi.lipuMa.suli, lonIjoSin);
  const lonPaliSin = paliELonPali(lonIjoSin, nasinMusiSin);
  const ijoAnte = panaEIjoAnte(lonPaliSin, lipuIjoSin);
  
  const lipuIjoAnte = lipuIjoSin.merge(ijoAnte);
  
  if(lipuIjoAnte.equals(lipuIjo)) // li pali ala. ijo li sama ala.
    return musi
  else
  {
    const tawaSin: Tawa = { nasin: nasin, lipuIjo: lipuIjoAnte };
    const tenpoSin = musi.tenpo.toSeq().take(musi.tenpoNi + 1).concat([tawaSin]).toList();
    
    return { ...musi, tenpo: tenpoSin, tenpoNi: musi.tenpoNi + 1 };
  }
}

function panaEIjoAnte(lonPali: LonPali, lipuIjo: LipuIjo)
{
  return Im.Seq.Keyed(
    lonPali.entrySeq().flatMap(([_, mute]) =>
      mute
        .map(paliMute => paliMute.filter(pali => panaEKulupuNimi(pali) === 'ijo') as Im.Set<NimiIjo>)
        .filterNot(paliMute => paliMute.isEmpty())
        .toKeyedSeq()
    )
  ).map((anteMute, nanpa) => ({ ...lipuIjo.get(nanpa)!, liSitelen: true as const, nimi: anteMute.first()! }));
}

export function tawaNi(musi: Musi)
{
  const tawaNi = musi.tenpo.get(musi.tenpoNi);
  if(tawaNi)
    return tawaNi;
  else
    throw Error('tenpo ni li ike!');
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
