import Im from 'immutable';
import { AnteIjo } from './ijo';
import { Lon, NasinTawa } from './lon';
import { LonPali } from './lonPali';
import { LiSeme } from './nasinMusi';
import { liInsaKulupu, NimiIjo, NimiPali } from './nimiAli';

export type Pali = (suliMa: Lon, lonPali: LonPali, nasin: NasinTawa) => Im.Seq.Keyed<number, AnteIjo>;

export const paliAnte: Pali = (suliMa, lonPali, nasin) =>
  Im.Seq.Keyed(
    lonPali.entrySeq().flatMap(([_, mute]) =>
      mute
        .map(paliMute => paliMute.filter(pali => liInsaKulupu(pali, 'ijo')) as Im.Set<NimiIjo>)
        .filterNot(paliMute => paliMute.isEmpty())
        .toKeyedSeq()
    )
  // O PALI: ante e ijo wan tawa ijo mute, tawa ijo ala!
  ).map(anteMute => ({ kulupu: 'sitelen', nimi: anteMute.first()! }));

export const paliTawa: Pali = (suliMa, lonPali, nasin) =>
  panaEKulupuTawa(suliMa, lonPali, nasin)
    .toKeyedSeq()
    .map((lon, nanpa) => ({ lon: lon.tawa(nasin) }));


function panaEKulupuTawa(suliMa: Lon, lonPali: LonPali, nasin: NasinTawa)
{
  const miMute = Im.Seq.Keyed(
    lonPali.entrySeq().flatMap(([lon, mute]) =>
      mute
        .filter(pali => pali.contains('mi'))
        .toKeyedSeq()
        .mapEntries(([nanpa, _]) => [nanpa, lon]))
  );

  function lukinEKulupuTawa(nanpa: number, lon: Lon): Im.Seq.Keyed<number, Lon>
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
        return Im.Seq.Keyed();
      else
        return Im.Seq.Keyed([[nanpa, lon]]).concat(...lukinTawa);
    }
    else
      return Im.Seq.Keyed();
  }
  
  const kulupuTawaAli = Im.Map(miMute
    .map((lon, nanpa) => lukinEKulupuTawa(nanpa, lon))
    .valueSeq().flatMap(ni => ni)
  );
  
  return kulupuTawaAli;
}

function panaENanpaTanPali(lukin: Im.Collection<number, Im.Set<LiSeme>> | undefined, pali: NimiPali)
{
  if(lukin !== undefined)
    return lukin.filter(paliMute => paliMute.contains(pali)).keySeq().toSet();
  else
    return Im.Set.of<number>();
}
