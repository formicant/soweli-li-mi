import Im from 'immutable';
import { Lon } from './lon';
import { Ijo } from './ijo';
import { LipuIjo } from './lipuIjo';

/**
 * li jo e suli ma, e ijo ali insa kulupu Lon.
 * ijo pi lon ala li lon ala.
 */
export class MaIjo
{
  constructor(suliMa: Lon, lipuIjo: LipuIjo)
  {
    this.suliMa = suliMa;
    this.lonIjo = lipuIjo
      .filter(ijo => ijo.liLon)
      .groupBy(ijo => ijo.lon)
      .toMap();
  }
  
  readonly suliMa: Lon;
  readonly lonIjo: Im.Map<Lon, Im.Collection<number, Ijo>>;
}
