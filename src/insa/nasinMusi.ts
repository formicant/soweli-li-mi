import Im from 'immutable';
import { NimiIjo, NimiKulupu, NimiPali } from './nimiAli';

export type Seme = NimiIjo | NimiKulupu;
export type LiSeme = NimiPali | NimiIjo;

interface LinjaToki
{
  readonly nanpaIjoMute: Im.Set<number>;
}

interface LinjaTokiSeme extends LinjaToki
{
  readonly seme: Im.Set<Seme>;
}

interface LinjaTokiLonSeme extends LinjaTokiSeme
{
  readonly lonSeme: Im.Set<Seme>;
}

export interface NasinMusi extends LinjaTokiLonSeme
{
  readonly liSeme: LiSeme;
}

export function tokiENasinMusi(nasin: NasinMusi)
{
  const seme = `${nasin.seme.join(' en ')}`;
  const lonSeme = nasin.lonSeme.equals(Im.Set.of('ali')) ? '' : ` lon ${nasin.lonSeme.join(' en ')}`;
  const liSeme = ` li ${nasin.liSeme}`;
  const nanpaIjo = ` (${nasin.nanpaIjoMute.join(', ')})`;
  return `${seme}${lonSeme}${liSeme}${nanpaIjo}`;
}
