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
  const seme = `${en(nasin.seme)}`;
  const lonSeme = nasin.lonSeme.equals(Im.Set.of('ali'))
    ? ''
    : ` lon ${en(nasin.lonSeme)}`;
  const liSeme = ` li ${en(nasin.liSeme, 'li')}`;
  return `${seme}${lonSeme}${liSeme}`;
}

function en<T>(nimiMute: Im.Set<T>, insa: string = 'en')
{
  return nimiMute.toSeq().sort().join(` ${insa} `);
}
