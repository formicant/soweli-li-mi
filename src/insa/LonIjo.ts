import Im from 'immutable';
import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import { Lon } from './lon';
import { Ijo,  LipuIjo } from './ijo';

export interface IjoEnNanpa
{
  readonly ijo: Ijo;
  readonly nanpa: number;
}

interface PokiLon extends TypedRecord<PokiLon>, Lon { }
const paliEPokiLon = makeTypedFactory<Lon, PokiLon>({ x: 0, y: 0 });

export class LonIjo
{
  constructor(lipuIjo: LipuIjo)
  {
    this.lonIjo = Im.Map(
      lipuIjo.mapEntries(([nanpa, ijo]) => [paliEPokiLon(ijo), { ijo: ijo, nanpa: nanpa }])
    );
  }
  
  get(lon: Lon)
  {
    const pokiLon = paliEPokiLon(lon);
    return this.lonIjo.get(pokiLon);
  }
  
  private lonIjo: Im.Map<PokiLon, IjoEnNanpa>;
}
