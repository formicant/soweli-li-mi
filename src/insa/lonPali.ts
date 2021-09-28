import Im from 'immutable';
import { PokiLon } from './lon';
import { Ijo } from './ijo';
import { NimiIjo, NimiPali, panaEKulupuNimi } from './nimiAli';
import { NasinMusi } from './nasinMusi';
import { LonIjo } from './lonIjo';

export type LonPali = Im.Map<PokiLon, Im.Collection<number, Im.Set<NimiPali>>>;

export function paliELonPali(lonIjo: LonIjo, nasinMusi: readonly NasinMusi[]): LonPali
{
  // O PALI: nasin musi pi lukin ‘kon li ...’!
  
  return Im.Map(
    lonIjo.mapEntries(([lon, ijoMute]) =>
      [lon, ijoMute.map((ijo, nanpa) => panaEPali(lon, ijo, nanpa, lonIjo, nasinMusi))])
  );
}

function panaEPali(lon: PokiLon, ijo: Ijo, nanpa: number, lonIjo: LonIjo, nasinMusi: readonly NasinMusi[])
{
  const ijoAntePiLonSama = lonIjo
    .get(lon)!
    .filterNot((_, nanpaNi) => nanpaNi === nanpa)
    .toSet();
  const nimiPiIjoSitelenAntePiLonSama = ijoAntePiLonSama
    .toSeq()
    .filter(ni => ni.liSitelen)
    .map(ni => ni.nimi as NimiIjo)
    .toSet();
  
  function nasinLiLon(nasin: NasinMusi)
  {
    const semeLiLon =
      nasin.seme.contains('ali') ||
      (!ijo.liSitelen && nasin.seme.contains('nimi')) ||
      (ijo.liSitelen && nasin.seme.contains(ijo.nimi));
    
    const lonSemeLiLon =
      nasin.lonSeme.contains('ali') ||
      (nasin.lonSeme.contains('nimi') && ijoAntePiLonSama.some(ni => !ni.liSitelen)) ||
      (nasin.lonSeme.contains('kon') && ijoAntePiLonSama.isEmpty()) ||
      !nasin.lonSeme.intersect(nimiPiIjoSitelenAntePiLonSama).isEmpty();
    
    return semeLiLon && lonSemeLiLon;
  }
  
  const paliMute = Im.Seq(nasinMusi)
    .filter(nasinLiLon)
    .flatMap(nasin => nasin.liSeme)
    .filter(liSeme => panaEKulupuNimi(liSeme) === 'pali')
    .map(pali => pali as NimiPali)
    .toSet();
  return paliMute;
}
