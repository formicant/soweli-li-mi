import Im from 'immutable';
import { Ijo } from './ijo';
import { anteELipuIjo, LipuIjo } from './lipuIjo';
import { Lon, NasinTawa } from './lon';
import { MaIjo } from './maIjo';
import { LonPali, paliELonPali } from './lonPali';
import { panaENasinMusiAli } from './pilinToki';
import { Pali } from './pali';

interface ITawa
{
  readonly nasin: NasinTawa | undefined;
  readonly suliMa: Lon;
  readonly lipuIjo: LipuIjo;
  readonly lonPali: LonPali;
  readonly lukinWawa: Im.Set<number>;
}
// ni li ike. taso, ni li nasin pali pi ilo Im.Record:
const tawaAla: ITawa = { nasin: undefined, suliMa: new Lon(NaN, NaN), lipuIjo: Im.Map<number, Ijo>(), lonPali: Im.Map<Lon, any>(), lukinWawa: Im.Set() };

/**
 * tawa wan lon tenpo musi.
 */
export class Tawa extends Im.Record<ITawa>(tawaAla) implements ITawa
{
  constructor(suliMa: Lon, lipuIjo: LipuIjo, nasin?: NasinTawa)
  {
    const maIjo = new MaIjo(suliMa, lipuIjo);
    const nasinMusi = panaENasinMusiAli(maIjo);
    const lonPali = paliELonPali(maIjo, nasinMusi);
    
    // O PALI: ken ante e ijo wan tawa ijo mute!
    const lukinWawa = Im.Seq(nasinMusi).flatMap(nasin => nasin.nanpaIjo)
      .concat(lonPali.valueSeq().flatMap(mute => mute.filter((pali, nanpa) => lipuIjo.get(nanpa)!.liSitelen() && !pali.isEmpty()).keySeq()))
      .toSet();
      
    super({
      nasin: nasin,
      suliMa: suliMa,
      lipuIjo: lipuIjo,
      lonPali: lonPali,
      lukinWawa: lukinWawa,
    });
  }
  
  /**
   * pali e tawa sin tan tawa ni.
   * @param pali tawa kepeken pali seme?
   * @param nasin nasin tawa.
   * @returns tawa sin.
   */
  sin(pali: Pali, nasin: NasinTawa): Tawa
  {
    const antePiLipuIjo = pali(this.suliMa, this.lonPali, nasin);
    const lipuIjoSin = anteELipuIjo(this.lipuIjo, antePiLipuIjo);
    return new Tawa(this.suliMa, lipuIjoSin, nasin);
  }
}
