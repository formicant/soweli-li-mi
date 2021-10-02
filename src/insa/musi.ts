import Im from "immutable";
import { Ijo, LipuIjo } from "./ijo";
import { Lon, NasinTawa } from "./lon";
import { paliELonIjo } from "./lonIjo";
import { LonPali, paliELonPali } from "./lonPali";
import { NimiIjo, panaEKulupuNimi } from "./nimiAli";
import { panaENasinMusiAli } from "./pilinToki";
import { Tawa, tawaOpen, panaEKulupuTawa } from "./tawa";

interface IMusi
{
  readonly nimiMa: string;
  readonly suliMa: Lon;
  readonly tenpo: Im.List<Tawa>;
  readonly tenpoNi: number;
}
const musiAla: IMusi = { nimiMa: '', suliMa: new Lon(NaN, NaN), tenpo: Im.List(), tenpoNi: NaN };

export class Musi extends Im.Record<IMusi>(musiAla) implements IMusi
{
  constructor(nimiMa: string, suliMa: Lon, ijoAli: readonly Ijo[])
  {
    super({
      nimiMa: nimiMa,
      suliMa: suliMa,
      tenpo: Im.List.of(tawaOpen(suliMa, ijoAli)),
      tenpoNi: 0,
    });
  }

  get tawaNi()
  {
    const ni = this.tenpo.get(this.tenpoNi);
    if(ni) return ni;
    else throw Error('tenpo ni li ike!');
  }
  
  tenpoMonsi(ali: boolean = false): Musi
  {
    if(this.tenpoNi > 0)
      return this.merge({ tenpoNi: ali ? 0 : this.tenpoNi - 1 });
    else
      return this;
  }

  tenpoSinpin(ali: boolean = false): Musi
  {
    if(this.tenpoNi < this.tenpo.size - 1)
      return this.merge({ tenpoNi: ali ? this.tenpo.size - 1 : this.tenpoNi + 1 });
    else
      return this;
  }

  tawa(nasin: NasinTawa): Musi
  {
    const lipuIjo = this.tawaNi.lipuIjo;
    const lonIjo = paliELonIjo(lipuIjo);
    const nasinMusi = panaENasinMusiAli(this.suliMa, lonIjo);
    const lonPali = paliELonPali(lonIjo, nasinMusi);
    
    const kulupuTawa = panaEKulupuTawa(this.suliMa, lonPali, nasin)
      .toKeyedSeq()
      .mapEntries(([_, nanpa]) => [nanpa, lipuIjo.get(nanpa)!]);
    
    const kulupuTawaSin = kulupuTawa.map(ijo => ijo.tawa(nasin));
    const lipuIjoSin = lipuIjo.merge(kulupuTawaSin);
    
    const lonIjoSin = paliELonIjo(lipuIjoSin);
    const nasinMusiSin = panaENasinMusiAli(this.suliMa, lonIjoSin);
    const lonPaliSin = paliELonPali(lonIjoSin, nasinMusiSin);
    const ijoAnte = this.panaEIjoAnte(lonPaliSin, lipuIjoSin);
    
    const lipuIjoAnte = lipuIjoSin.merge(ijoAnte);
    
    const lonIjoAnte = paliELonIjo(lipuIjoAnte);
    const nasinMusiAnte = panaENasinMusiAli(this.suliMa, lonIjoAnte);
    const lonPaliAnte = paliELonPali(lonIjoAnte, nasinMusiAnte);
    
    // O PALI: ken ante e ijo wan tawa ijo mute!
    const lukinWawa = Im.Seq(nasinMusiAnte).flatMap(nasin => nasin.nanpaIjo)
      .concat(lonPaliAnte.valueSeq().flatMap(mute => mute.filter((pali, nanpa) => lipuIjoAnte.get(nanpa)!.liSitelen() && !pali.isEmpty()).keySeq()))
      .toSet();
    
    if(lipuIjoAnte.equals(lipuIjo))
      return this
    else
    {
      const tawaSin: Tawa = new Tawa({ nasin: nasin, lipuIjo: lipuIjoAnte, lukinWawa: lukinWawa });
      const tenpoSin = this.tenpo.take(this.tenpoNi + 1).push(tawaSin);
      
      return this.merge({ tenpo: tenpoSin, tenpoNi: this.tenpoNi + 1 });
    }
  }

  private panaEIjoAnte(lonPali: LonPali, lipuIjo: LipuIjo)
  {
    return Im.Seq.Keyed(
      lonPali.entrySeq().flatMap(([_, mute]) =>
        mute
          .map(paliMute => paliMute.filter(pali => panaEKulupuNimi(pali) === 'ijo') as Im.Set<NimiIjo>)
          .filterNot(paliMute => paliMute.isEmpty())
          .toKeyedSeq()
      )
    ).map((anteMute, nanpa) => lipuIjo.get(nanpa)!.merge({ kulupu: 'sitelen', nimi: anteMute.first()! }));
  }
}

