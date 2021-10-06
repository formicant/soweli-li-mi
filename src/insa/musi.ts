import assert from 'assert';
import Im from 'immutable';
import { Lon, NasinTawa } from './lon';
import { Tawa } from './tawa';
import { LipuMa, pilinELipuMa } from './lipuMa';
import { paliAnte, paliTawa } from './pali';

interface IMusi
{
  readonly nimiMa: string;
  readonly suliMa: Lon;
  readonly tenpo: Im.List<Tawa>;
  readonly tenpoNi: number;
}
// ni li ike. taso, ni li nasin pali pi ilo Im.Record:
const musiAla: IMusi = { nimiMa: '', suliMa: new Lon(NaN, NaN), tenpo: Im.List(), tenpoNi: NaN };

export class Musi extends Im.Record<IMusi>(musiAla) implements IMusi
{
  constructor(lipuMa: LipuMa)
  {
    const { nimiMa, suliMa, ijoAli } = pilinELipuMa(lipuMa);
    const lipuIjo = Im.Map(Im.Seq(ijoAli).toKeyedSeq());
    const tenpoOpen = Im.List.of(new Tawa(suliMa, lipuIjo));
    
    super({
      nimiMa: nimiMa,
      suliMa: suliMa,
      tenpo: tenpoOpen,
      tenpoNi: 0,
    });
  }
  
  /**
   * jan musi li lukin e tawa ni.
   */
  get tawaNi()
  {
    const ni = this.tenpo.get(this.tenpoNi);
    assert(ni, 'tenpo ni li ike!');
    return ni;
  }
  
  tenpoMonsi(ali: boolean = false): Musi
  {
    if(this.tenpoNi > 0)
      return this.set('tenpoNi', ali ? 0 : this.tenpoNi - 1);
    else
      return this;
  }
  
  tenpoSinpin(ali: boolean = false): Musi
  {
    if(this.tenpoNi < this.tenpo.size - 1)
      return this.set('tenpoNi', ali ? this.tenpo.size - 1 : this.tenpoNi + 1);
    else
      return this;
  }
  
  tawa(nasin: NasinTawa): Musi
  {
    // const t0 = Date.now();
    
    const tawaNi = this.tawaNi;
    const tawaInsa = tawaNi.sin(paliTawa, nasin);
    const tawaSin = tawaInsa.sin(paliAnte, nasin);
    
    if(tawaSin.lipuIjo.equals(tawaNi.lipuIjo))
      return this;  // ala li ante
    
    const tenpoSin = this.tenpo.take(this.tenpoNi + 1).push(tawaSin);
    
    // const t1 = Date.now();
    // console.log(`tawa: ${t1 - t0}`);
    
    return this.merge({ tenpo: tenpoSin, tenpoNi: this.tenpoNi + 1 });
  }
}

