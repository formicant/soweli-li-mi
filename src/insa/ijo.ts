import assert from 'assert';
import Im from 'immutable';
import { Lon, NasinTawa } from './lon';
import { liInsaKulupu, Nimi, NimiIjo } from './nimiAli'

/**
 * ijo ali li tan kulupu tu:
 *   ijo nimi li lukin sama nimi, li ken pali e nasin musi.
 *   ijo sitelen li lukin sama sitelen pi Sitelen Pona.
 */
export type KulupuIjo = 'nimi' | 'sitelen';

export interface IIjo
{
  readonly nanpa: number;
  readonly liLon: boolean;
  readonly lon: Lon;
  readonly kulupu: KulupuIjo;
  readonly nimi: Nimi;
}
// ni li ike. taso, ni li nasin pali pi ilo Im.Record:
const ijoAla: IIjo = { nanpa: NaN, liLon: false, lon: new Lon(NaN, NaN), kulupu: 'nimi', nimi: 'ala' };

/**
 * ijo wan lon ma musi, li nimi anu sitelen.
 */
export class Ijo extends Im.Record<IIjo>(ijoAla) implements IIjo
{
  constructor(ijo: IIjo)
  {
    super(ijo);
    assert(
      ijo.kulupu !== 'sitelen' || liInsaKulupu(ijo.nimi, 'ijo'),
      `ijo sitelen li ken ala jo e nimi '${ijo.nimi}'!`
    );
  }
  
  /**
   * ijo ni li ijo sitelen anu seme?
   * (ijo sitelen li ken jo e nimi ijo taso.)
   */
  liSitelen(): this is { readonly kulupu: 'sitelen', readonly nimi: NimiIjo }
  {
    return this.kulupu === 'sitelen';
  }
  
  /**
   * ijo ni li ijo nimi anu seme?
   */
  liNimi(): this is { readonly kulupu: 'nimi' }
  {
    return this.kulupu === 'nimi';
  }
  
  /**
   * li tawa e Ijo kepeken leko wan tawa nasin.
   * @param nasin li nasin tawa.
   * @returns e Ijo sin.
   */
  tawa(nasin: NasinTawa)
  {
    return this.set('lon', this.lon.tawa(nasin));
  }
}
