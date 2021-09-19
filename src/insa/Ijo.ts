import { Lon } from './Lon';
import { Nimi, NimiIjo } from './NimiAli'

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
