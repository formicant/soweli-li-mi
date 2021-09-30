import Im from 'immutable';
import { Lon } from './lon';
import { Ijo,  LipuIjo } from './ijo';

export type LonIjo = Im.Map<Lon, Im.Collection<number, Ijo>>;

export function paliELonIjo(lipuIjo: LipuIjo): LonIjo
{
  return lipuIjo
    .groupBy(ijo => ijo.lon)
    .toMap();
}
