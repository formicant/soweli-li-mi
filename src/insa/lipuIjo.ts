import Im from 'immutable';
import { Ijo, IIjo } from './ijo';

/**
 * ijo mute en nanpa ona.
 */
export type LipuIjo = Im.Map<number, Ijo>;

export type IjoSin = Omit<IIjo, 'nanpa'>;
export type AnteIjo = Partial<IjoSin>;

export interface AntePiLipuIjo
{
  readonly anteMute?: Im.Seq.Keyed<number, AnteIjo>;
  readonly sinMute?: Im.Seq.Indexed<IjoSin>;
}

export function anteELipuIjo(lipuIjoMajuna: LipuIjo, ante: AntePiLipuIjo): LipuIjo
{
  let lipu = lipuIjoMajuna;
  if(ante.anteMute)
    lipu = lipu.merge(ante.anteMute.map((ante, nanpa) => lipu.get(nanpa)!.merge(ante)));
  return lipu;
}
