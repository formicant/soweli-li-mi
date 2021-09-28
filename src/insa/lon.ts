import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';

export interface Lon
{
  readonly x: number,
  readonly y: number;
}

export interface PokiLon extends TypedRecord<PokiLon>, Lon { }
export const paliEPokiLon = makeTypedFactory<Lon, PokiLon>({ x: 0, y: 0 });
