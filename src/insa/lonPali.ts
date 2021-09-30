import Im from 'immutable';
import { Lon } from './lon';
import { Ijo } from './ijo';
import { NimiIjo, NimiPali } from './nimiAli';
import { LiSeme, NasinMusi } from './nasinMusi';
import { LonIjo } from './lonIjo';

export type LonPali = Im.Map<Lon, Im.Collection<number, Im.Set<LiSeme>>>;

export function paliELonPali(lonIjo: LonIjo, nasinMusi: readonly NasinMusi[]): LonPali
{
  // O PALI: nasin musi pi lukin ‘kon li ...’!
  
  return Im.Map(
    lonIjo.mapEntries(([lon, ijoMute]) =>
      [lon, ijoMute.map((ijo, nanpa) => panaEPali(lon, ijo, nanpa, lonIjo, nasinMusi))])
  );
}

export function panaENanpaTanPali(lukin: Im.Collection<number, Im.Set<LiSeme>> | undefined, pali: NimiPali)
{
  if(lukin !== undefined)
    return lukin.filter(paliMute => paliMute.contains(pali)).keySeq().toSet();
  else
    return Im.Set.of<number>();
}

function panaEPali(lon: Lon, ijo: Ijo, nanpa: number, lonIjo: LonIjo, nasinMusi: readonly NasinMusi[])
{
  const ijoAntePiLonSama = lonIjo
    .get(lon)!
    .filterNot((_, nanpaNi) => nanpaNi === nanpa)
    .toSet();
  const nimiPiIjoSitelenAntePiLonSama = ijoAntePiLonSama
    .toSeq()
    .filter(ni => ni.liSitelen())
    .map(ni => ni.nimi as NimiIjo)
    .toSet();
  
  function nasinLiLon(nasin: NasinMusi)
  {
    const semeLiLon =
      nasin.seme.contains('ali') ||
      (ijo.liNimi() && nasin.seme.contains('nimi')) ||
      (ijo.liSitelen() && nasin.seme.contains(ijo.nimi));
    
    const lonSemeLiLon =
      nasin.lonSeme.contains('ali') ||
      (nasin.lonSeme.contains('nimi') && ijoAntePiLonSama.some(ni => ni.liNimi())) ||
      (nasin.lonSeme.contains('kon') && ijoAntePiLonSama.isEmpty()) ||
      !nasin.lonSeme.intersect(nimiPiIjoSitelenAntePiLonSama).isEmpty();
    
    return semeLiLon && lonSemeLiLon;
  }
  
  const paliMute = Im.Seq(nasinMusi)
    .filter(nasinLiLon)
    .flatMap(nasin => nasin.liSeme)
    .toSet();
  return paliMute;
}
