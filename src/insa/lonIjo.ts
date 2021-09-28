import Im from 'immutable';
import { PokiLon, paliEPokiLon } from './lon';
import { Ijo,  LipuIjo } from './ijo';

export type LonIjo = Im.Map<PokiLon, Im.Collection<number, Ijo>>;

export function paliELonIjo(lipuIjo: LipuIjo): LonIjo
{
  return lipuIjo
    .groupBy(ijo => paliEPokiLon(ijo))
    .toMap();
}
