import { Seq, Map } from 'immutable';
import { Ijo } from './Ijo';

export type Poka = 'soto' | 'teje';
export type NasinTawa = 'sewi' | 'anpa' | Poka;

export interface Tawa
{
  readonly nasin?: NasinTawa;
  readonly ijoAli: Map<symbol, Ijo>;
}

export function tawaOpen(ijoAli: Iterable<Ijo>)
{
  return {
    ijoAli: Map(Seq(ijoAli).map((ijo, _) => [Symbol('ijo'), ijo]))
  };
}
