import Im from 'immutable';
import { Lon } from './lon';
import { Ijo,  LipuIjo } from './ijo';

/**
 * li jo e suli (poka en sewi) ma e ijo ali insa kulupu lon.
 */
export class MaIjo
{
  constructor(suliMa: Lon, lipuIjo: LipuIjo)
  {
    this.suliMa = suliMa;
    this.lonIjo = lipuIjo.groupBy(ijo => ijo.lon).toMap();
  }
  
  readonly suliMa: Lon;
  readonly lonIjo: Im.Map<Lon, Im.Collection<number, Ijo>>;
}
