import Im from 'immutable';
import { Ijo, LipuIjo } from './ijo';

export type NasinTawa = 'sewi' | 'anpa' | 'soto' | 'teje';

export interface Tawa
{
  readonly nasin?: NasinTawa;
  readonly lipuIjo: LipuIjo;
}

export function tawaOpen(ijoAli: Iterable<Ijo>): Tawa
{
  return {
    lipuIjo: Im.Map(Im.Seq(ijoAli).toKeyedSeq())
  };
}
