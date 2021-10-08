import Im from 'immutable';
import { AntePiLipuIjo } from './lipuIjo';
import { Lon, NasinTawa } from './lon';
import { LonPali } from './lonPali';
import { LiSeme } from './nasinMusi';
import { liInsaKulupu, NimiIjo, NimiPali } from './nimiAli';

export type Pali = (suliMa: Lon, lonPali: LonPali, nasin: NasinTawa) => AntePiLipuIjo;

export const paliAnte: Pali = (suliMa, lonPali, nasin) =>
{
  const ante = Im.Seq.Keyed(
    lonPali.entrySeq().flatMap(([_, mute]) =>
      mute
        .map(paliMute => paliMute.filter(pali => liInsaKulupu(pali, 'ijo')) as Im.Set<NimiIjo>)
        .filterNot(paliMute => paliMute.isEmpty())
        .toKeyedSeq()
    )
  // O PALI: ante e ijo wan tawa ijo mute!
  ).map(anteMute => ({ kulupu: 'sitelen' as const, nimi: anteMute.first()! }));
  
  const weka = lonPali
    .toIndexedSeq()
    .map(panaENanpaWeka)
    .flatMap(ni => ni);
  
  return { anteMute: ante, wekaMute: weka };
}

function panaENanpaWeka(paliLeko: Im.Collection<number, Im.Set<LiSeme>>)
{
  const lekoLiMoli = paliLeko.some(pali => pali.contains('moli'));
  return paliLeko
    .filter(pali => pali.contains('weka') || (lekoLiMoli && pali.contains('mi')))
    .keySeq();
}

function liKamaWeka(paliNi: Im.Set<LiSeme>, lekoSama: Im.Set<LiSeme>)
{
  return paliNi.contains('weka') ||
    (paliNi.contains('mi') && lekoSama.contains('moli'));
}

export const paliTawaMi: Pali = (suliMa, lonPali, nasin) =>
  ({
    anteMute: panaEKulupuTawa('mi', suliMa, lonPali, nasin)
      .toKeyedSeq()
      .map(lon => ({ lon: lon.tawa(nasin) }))
  });

export const paliTawaTawa: Pali = (suliMa, lonPali, nasin) =>
{
  const anpa = panaEKulupuTawa('anpa', suliMa, lonPali, '↓')
    .toKeyedSeq()
    .map(lon => ({ lon: lon.tawa('↓') }))
  const sewi = panaEKulupuTawa('sewi', suliMa, lonPali, '↑')
    .toKeyedSeq()
    .map(lon => ({ lon: lon.tawa('↑') }))
  return {
    anteMute: anpa.concat(sewi)
  };
}

function panaEKulupuTawa(mamaTawa: NimiPali, suliMa: Lon, lonPali: LonPali, nasin: NasinTawa)
{
  const miMute = Im.Seq.Keyed(
    lonPali.entrySeq().flatMap(([lon, mute]) =>
      mute
        .filter(pali => pali.contains(mamaTawa))
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

export function panaEPilinMusi(suliMa: Lon, lonPali: LonPali)
{
  if(lonPali.some(liPini))
    return 'pini';
  else if(liTawa(suliMa, lonPali))
    return 'tawa';
  else
    return 'palisa';
}

function liPini(paliLeko: Im.Collection<number, Im.Set<LiSeme>>)
{
  const lekoLiPini = paliLeko.some(pali => pali.contains('pini'));
  const lekoLiMi = paliLeko.some(pali => pali.contains('mi'));
  return lekoLiPini && lekoLiMi;
}

function liTawa(suliMa: Lon, lonPali: LonPali)
{
  const anpa = panaEKulupuTawa('anpa', suliMa, lonPali, '↓');
  const sewi = panaEKulupuTawa('sewi', suliMa, lonPali, '↑');
  return anpa.size > 0 || sewi.size > 0;
}
