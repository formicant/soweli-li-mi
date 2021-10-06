import Im from 'immutable';
import { Ijo, LipuIjo } from './ijo';
import { Lon, NasinTawa } from './lon';
import { MaIjo } from './maIjo';
import { LonPali, paliELonPali } from './lonPali';
import { panaENasinMusiAli } from './pilinToki';
import { Pali } from './pali';

interface ITawa
{
  readonly nasin?: NasinTawa;
  readonly suliMa: Lon;
  readonly lipuIjo: LipuIjo;
  readonly lonPali: LonPali;
  readonly lukinWawa: Im.Set<number>;
}
// ni li ike. taso, ni li nasin pali pi ilo Im.Record:
const tawaAla: ITawa = { suliMa: new Lon(NaN, NaN), lipuIjo: Im.Map<number, Ijo>(), lonPali: Im.Map<Lon, any>(), lukinWawa: Im.Set() };

/**
 * tawa wan lon tenpo musi.
 */
export class Tawa extends Im.Record<ITawa>(tawaAla) implements Tawa
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
    const anteMute = pali(this.suliMa, this.lonPali, nasin);
    const lipuIjoSin = this.lipuIjo.merge(
      // O PALI: ante e ijo wan tawa ijo ala!
      anteMute.map((ante, nanpa) => this.lipuIjo.get(nanpa)!.merge(ante))
    );
    return new Tawa(this.suliMa, lipuIjoSin, nasin);
  }
}
