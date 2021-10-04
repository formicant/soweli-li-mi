import Im from 'immutable';
import { Ijo, LipuIjo } from './ijo';
import { Lon, NasinTawa } from './lon';
import { MaIjo } from './maIjo';
import { LonPali, paliELonPali, panaENanpaTanPali } from './lonPali';
import { panaENasinMusiAli } from './pilinToki';

interface ITawa
{
  readonly nasin?: NasinTawa;
  readonly lipuIjo: LipuIjo;
  readonly lonPali: LonPali;
  readonly lukinWawa: Im.Set<number>;
}
const tawaAla: ITawa = { lipuIjo: Im.Map<number, Ijo>(), lonPali: Im.Map<Lon, any>(), lukinWawa: Im.Set() };

export class Tawa extends Im.Record<ITawa>(tawaAla) implements Tawa
{
  constructor(tawa: ITawa)
  {
    super(tawa);
  }
}

export function tawaOpen(suliMa: Lon, ijoAli: readonly Ijo[]): Tawa
{
  const lipuIjo = Im.Map(Im.Seq(ijoAli).toKeyedSeq());
  
  const maIjo = new MaIjo(suliMa, lipuIjo);
  const nasinMusi = panaENasinMusiAli(maIjo);
  const lonPali = paliELonPali(maIjo, nasinMusi);
  
  const lukinWawa = Im.Seq(nasinMusi).flatMap(nasin => nasin.nanpaIjo)
    .concat(lonPali.valueSeq().flatMap(mute => mute.filter((pali, nanpa) => lipuIjo.get(nanpa)!.liSitelen() && !pali.isEmpty()).keySeq()))
    .toSet();
  
  return new Tawa({
    lipuIjo: lipuIjo,
    lonPali: lonPali,
    lukinWawa: lukinWawa,
  });
}


export function panaEKulupuTawa(suliMa: Lon, lonPali: LonPali, nasin: NasinTawa)
{
  const miMute = Im.Seq.Keyed(
    lonPali.entrySeq().flatMap(([lon, mute]) =>
      mute
        .filter(pali => pali.contains('mi'))
        .toKeyedSeq()
        .mapEntries(([nanpa, _]) => [nanpa, lon]))
  );

  function lukinEKulupuTawa(nanpa: number, lon: Lon): Im.Set<number>
  {
    const lukinNi = lonPali.get(lon);
    const lonSin = lon.tawa(nasin);
    const lukinSin = lonPali.get(lonSin);
    const ken =
      lonSin.liInsaMa(suliMa) &&
      panaENanpaTanPali(lukinNi, 'awen').isEmpty() &&
      panaENanpaTanPali(lukinSin, 'awen').isEmpty();
    
    if(ken)
    {
      const tawa = panaENanpaTanPali(lukinSin, 'tawa')
        .union(panaENanpaTanPali(lukinSin, 'mi'));
      const lukinTawa = tawa.toSeq().map(ni => lukinEKulupuTawa(ni, lonSin));
      if(lukinTawa.some(ni => ni.isEmpty()))
        return Im.Set.of<number>();
      else
        return Im.Set.of(nanpa).union(...lukinTawa);
    }
    else
      return Im.Set.of<number>();
  }
  
  const kulupuTawaAli = miMute
    .map((lon, nanpa) => lukinEKulupuTawa(nanpa, lon))
    .valueSeq().flatMap(ni => ni)
    .toSet();
  
  return kulupuTawaAli;
}
