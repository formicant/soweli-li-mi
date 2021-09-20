import { Map } from 'immutable';
import { Lon } from './Lon';
import { Nimi, NimiIjo, KlupuNimi, panaEKulupuNimi } from './NimiAli'

export interface IjoNimi extends Lon
{
  readonly liSitelen: false;
  readonly nimi: Nimi;
}

export interface IjoSitelen extends Lon
{
  readonly liSitelen: true;
  readonly nimi: NimiIjo;
}

export type Ijo = IjoNimi | IjoSitelen;

export type LipuIjo = Map<number, Ijo>;

export type KlupuIjo = KlupuNimi | 'sitelen';

export function panaEKulupuIjo(ijo: Ijo)
{
  if(ijo.liSitelen)
    return 'sitelen';
  else
    return panaEKulupuNimi(ijo.nimi);
}
