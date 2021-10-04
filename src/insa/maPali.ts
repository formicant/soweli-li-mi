import Im from 'immutable';
import { Lon } from './lon';
import { Ijo, LipuIjo } from './ijo';
import { NimiIjo, NimiPali } from './nimiAli';
import { LiSeme, NasinMusi } from './nasinMusi';
import { MaIjo } from './maIjo';
import { panaENasinMusiAli } from './pilinToki';

/**
 * 
 */
export class MaPali
{
  constructor(
    public suliMa: Lon,
    public lipuIjo: LipuIjo)
  {
    const maIjo = new MaIjo(suliMa, lipuIjo);
    this.nasinMusi = panaENasinMusiAli(maIjo);
    this.lonPali = paliELonPali(maIjo, this.nasinMusi);
  }
  
  readonly nasinMusi: readonly NasinMusi[];
  readonly lonPali: Im.Map<Lon, Im.Collection<number, Im.Set<LiSeme>>>;
  
  get lukinWawa()
  {
    return Im.Seq(this.nasinMusi)
      .flatMap(nasin => nasin.nanpaIjo)
      .concat(this.lonPali.valueSeq()
        .flatMap(mute => mute.filter((pali, nanpa) => this.lipuIjo.get(nanpa)!.liSitelen() && !pali.isEmpty()).keySeq()))
      .toSet();
  }
}

function paliELonPali(maIjo: MaIjo, nasinMusi: readonly NasinMusi[])
{
  // O PALI: nasin musi pi lukin ‘kon li ...’!
  
  return Im.Map(
    maIjo.lonIjo.mapEntries(([lon, ijoMute]) =>
      [lon, ijoMute.map((ijo, nanpa) => panaEPali(lon, ijo, nanpa, maIjo, nasinMusi))])
  );
}

function panaEPali(lon: Lon, ijo: Ijo, nanpa: number, maIjo: MaIjo, nasinMusi: readonly NasinMusi[])
{
  const ijoAntePiLonSama = maIjo.lonIjo
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
