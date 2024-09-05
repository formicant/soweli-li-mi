import Im from 'immutable';
import { liNasinTawa, Lon, NasinTawa } from './lon';
import { Tawa } from './tawa';
import { LipuMa, pilinELipuMa } from './lipuMa';
import { Pali, paliAnte, paliTawaMi, paliTawaTawa } from './pali';

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
    if (ni === undefined)
      throw Error('tenpo ni li ike!');
    return ni;
  }
  
  panaENasin(kamaKin: boolean = false): readonly (NasinTawa | undefined)[]
  {
    const tenpo = kamaKin
      ? this.tenpo
      : this.tenpo.take(this.tenpoNi + 1)
    return tenpo
      .map(tawa => tawa.nasin)
      .toArray();
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
  
  tenpoNanpa(nanpa: number): Musi
  {
    if(nanpa >= 0 && nanpa < this.tenpo.size)
      return this.set('tenpoNi', nanpa);
    else
      return this;
  }
  
  tawaPalisa(nasin: NasinTawa): Musi
  {
    const tawaNi = this.tawaNi;
    if (tawaNi.pilin !== 'palisa')
      throw Error('ken ala tawaPalisa!');
    return this.tawa(nasin, paliTawaMi, this.tenpoNi + 1);
  }
  
  tawaTawa(): Musi
  {
    const tawaNi = this.tawaNi;
    if (this.tawaNi.pilin !== 'tawa')
      throw Error('ken ala tawaTawa!');
    if (tawaNi.nasin === undefined)
      throw Error('O PALI: tawaTawa tan open musi.');  // O PALI!
    return this.tawa(tawaNi.nasin, paliTawaTawa, this.tenpoNi);
  }
  
  tawaNasin(tokiNasin: string): Musi
  {
    const nasin = Im.Seq(tokiNasin.split('')).filter(liNasinTawa);
    if(nasin.size === 0)
      return this;  // tokiNasin li ala anu ike
    
    function tawaWan(musi: Musi, nasinTawa: NasinTawa)
    {
      let musiSin = musi.tawaPalisa(nasinTawa);
      while(musiSin.tawaNi.pilin === 'tawa')
        musiSin = musiSin.tawaTawa();
      return musiSin;
    }
    
    return nasin.reduce(tawaWan, this as Musi);
  }
  
  sinETenpoAli(tokiNasin: string): Musi
  {
    const musiOpen = this.tenpoMonsi(true);
    const musiSin = musiOpen.tawaNasin(tokiNasin);
    return musiSin.tenpoMonsi(true);
  }
  
  private tawa(nasin: NasinTawa, paliTawa: Pali, tenpoNiSin: number): Musi
  {
    // const t0 = Date.now();
    
    const tawaNi = this.tawaNi;
    const tawaInsa = tawaNi.sin(paliTawa, nasin);
    const tawaSin = tawaInsa.sin(paliAnte, nasin);
    
    if(tawaSin.lipuIjo.equals(tawaNi.lipuIjo))
      return this;  // ala li ante
    
    const tenpoSin = this.tenpo.take(tenpoNiSin).push(tawaSin);
    
    // const t1 = Date.now();
    // console.log(`tawa: ${t1 - t0}`);
    
    return this.merge({ tenpo: tenpoSin, tenpoNi: tenpoNiSin });
  }
}

