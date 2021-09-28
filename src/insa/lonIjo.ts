import Im from 'immutable';
import { PokiLon, paliEPokiLon } from './lon';
import { Ijo,  LipuIjo } from './ijo';

export interface IjoEnNanpa
{
  readonly ijo: Ijo;
  readonly nanpa: number;
}

export type LonIjo = Im.Map<PokiLon, IjoEnNanpa>;

export function paliELonIjo(lipuIjo: LipuIjo)
{
  return Im.Map(
    lipuIjo.mapEntries(([nanpa, ijo]) => [paliEPokiLon(ijo), { ijo: ijo, nanpa: nanpa }])
  );
}
