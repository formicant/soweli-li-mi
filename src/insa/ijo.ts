import Im from 'immutable';
import { Lon } from './lon';
import { Nimi, NimiIjo } from './nimiAli'

export interface IjoNimi
{
  readonly lon: Lon;
  readonly liSitelen: false;
  readonly nimi: Nimi;
}

export interface IjoSitelen
{
  readonly lon: Lon;
  readonly liSitelen: true;
  readonly nimi: NimiIjo;
}

export type Ijo = IjoNimi | IjoSitelen;

export type LipuIjo = Im.Map<number, Ijo>;
