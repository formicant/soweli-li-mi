import { Seq, Map } from 'immutable';
import { Ijo, LipuIjo } from './Ijo';

export type Poka = 'soto' | 'teje';
export type NasinTawa = 'sewi' | 'anpa' | Poka;

export interface Tawa
{
  readonly nasin?: NasinTawa;
  readonly lipuIjo: LipuIjo;
}

export function tawaOpen(ijoAli: Iterable<Ijo>)
{
  return {
    lipuIjo: Map(Seq(ijoAli).toKeyedSeq())
  };
}
