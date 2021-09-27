import Im from 'immutable';
import { NimiIjo, NimiKulupu, NimiPali } from './nimiAli';

export type Seme = NimiIjo | NimiKulupu;
export type LiSeme = NimiPali | NimiIjo;

export interface NasinMusi{
  readonly seme: Im.Set<Seme>;
  readonly lonSeme: Im.Set<Seme>;
  readonly liSeme: Im.Set<LiSeme>;
  readonly nanpaIjo: Im.Set<number>;
}

export function tokiENasinMusi(nasin: NasinMusi)
{
  const seme = `${nasin.seme.join(' en ')}`;
  const lonSeme = nasin.lonSeme.equals(Im.Set.of('ali'))
    ? ''
    : ` lon ${nasin.lonSeme.join(' en ')}`;
  const liSeme = ` li ${nasin.liSeme.join(' li ')}`;
  return `${seme}${lonSeme}${liSeme}`;
}
