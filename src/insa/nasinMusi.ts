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

// ni li kepeken lon ni taso: pona ala pona
export function tokiENasinMusi(nasin: NasinMusi)
{
  const seme = `${en(nasin.seme, 'en')}`;
  const lonSeme = nasin.lonSeme.equals(Im.Set.of('ali'))
    ? ''
    : ` lon ${en(nasin.lonSeme, 'lon')}`;
  const liSeme = ` li ${en(nasin.liSeme, 'li')}`;
  return `${seme}${lonSeme}${liSeme}`;
}

function en<T>(nimiMute: Im.Set<T>, insa: string)
{
  return nimiMute.toSeq().sort().join(` ${insa} `);
}
