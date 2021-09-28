import Im from 'immutable';
import { Ijo, LipuIjo } from './ijo';
import { Lon, PokiLon } from './lon';
import { LonPali, panaENanpaTanPali } from './lonPali';

export type NasinTawa = 'sewi' | 'anpa' | 'soto' | 'teje';

export interface Tawa
{
  readonly nasin?: NasinTawa;
  readonly lipuIjo: LipuIjo;
}

export function tawaOpen(ijoAli: Iterable<Ijo>): Tawa
{
  return {
    lipuIjo: Im.Map(Im.Seq(ijoAli).toKeyedSeq())
  };
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

  function lukinEKulupuTawa(nanpa: number, lon: PokiLon): Im.Set<number>
  {
    const lukinNi = lonPali.get(lon);
    const lonSin = tawaEPokiLon(lon, nasin);
    const lukinSin = lonPali.get(lonSin);
    const ken =
      liInsaMa(lonSin, suliMa) &&
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

function tawaEPokiLon(lon: PokiLon, nasin: NasinTawa)
{
  switch(nasin)
  {
    case 'sewi': return lon.merge({ y: lon.y - 1 });
    case 'anpa': return lon.merge({ y: lon.y + 1 });
    case 'soto': return lon.merge({ x: lon.x - 1 });
    case 'teje': return lon.merge({ x: lon.x + 1 });
    default: throw Error('nasin li ike!');
  }
}

export function tawaELon<T extends Lon>(lon: T, nasin: NasinTawa): T
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

function liInsaMa<T extends Lon>(lon: T, suli: Lon)
{
  return (
    lon.x >= 0 && lon.x < suli.x &&
    lon.y >= 0 && lon.y < suli.y
  );
}
