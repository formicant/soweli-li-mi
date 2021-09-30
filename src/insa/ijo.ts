import Im from 'immutable';
import { Lon, NasinTawa } from './lon';
import { liInsaKulupu, Nimi, NimiIjo } from './nimiAli'

export type KulupuIjo = 'nimi' | 'sitelen';

interface IIjo
{
  readonly nanpa: number;
  readonly lon: Lon;
  readonly kulupu: KulupuIjo;
  readonly nimi: Nimi;
}
const ijoAla: IIjo = { nanpa: NaN, lon: new Lon(NaN, NaN), kulupu: 'nimi', nimi: 'ala' };

export class Ijo extends Im.Record<IIjo>(ijoAla) implements IIjo
{
  constructor(ijo: IIjo)
  {
    super(ijo);
    if(ijo.kulupu === 'sitelen' && !liInsaKulupu(ijo.nimi, 'ijo'))
      throw new Error(`ijo sitelen li ken ala jo e nimi '${ijo.nimi}'!`);
  }
  
  liSitelen(): this is { readonly kulupu: 'sitelen', readonly nimi: NimiIjo }
  {
    return this.kulupu === 'sitelen';
  }
  liNimi(): this is { readonly kulupu: 'nimi' }
  {
    return this.kulupu === 'nimi';
  }
  
  tawa(nasin: NasinTawa)
  {
    return this.merge({ lon: this.lon.tawa(nasin) });
  }
}

export type LipuIjo = Im.Map<number, Ijo>;
