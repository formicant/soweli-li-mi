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
  readonly wekaMute?: Im.Seq.Indexed<number>;
}

export function anteELipuIjo(lipuIjoMajuna: LipuIjo, ante: AntePiLipuIjo): LipuIjo
{
  let lipu = lipuIjoMajuna;
  if(ante.anteMute)
    lipu = lipu.merge(ante.anteMute.map((ante, nanpa) => lipu.get(nanpa)!.merge(ante)));
  // O PALI: sinMute
  if(ante.wekaMute)
    lipu = lipu.removeAll(ante.wekaMute);
  return lipu;
}
