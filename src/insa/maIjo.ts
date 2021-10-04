import Im from 'immutable';
import { Lon } from './lon';
import { Ijo,  LipuIjo } from './ijo';

export interface MaIjo
{
  readonly suliMa: Lon;
  readonly lonIjo: Im.Map<Lon, Im.Collection<number, Ijo>>;
}

export function paliEMaIjo(suliMa: Lon, lipuIjo: LipuIjo): MaIjo
{
  return {
    suliMa: suliMa,
    lonIjo: lipuIjo.groupBy(ijo => ijo.lon).toMap()
  };
}
