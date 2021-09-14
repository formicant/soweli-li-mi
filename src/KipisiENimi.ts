import { range, NumberComparer } from 'linq-to-typescript';
import { Nimi, kulupuPiNimiAli } from './NimiAli';

interface LinjaNimi
{
  readonly nimiLili: string;
  readonly suliPoka: number;
}

export function kipisiENimi(nimi: Nimi): LinjaNimi[]
{
  if(!kipisiPiNimiAli)
    kipisiPiNimiAli = paliEKipisiPiNimiAli();
  
  return kipisiPiNimiAli[nimi];
}

type KipisiPiNimiAli = { [nimi in Nimi]: LinjaNimi[] };
let kipisiPiNimiAli: KipisiPiNimiAli | undefined;

function paliEKipisiPiNimiAli(): KipisiPiNimiAli
{
  const lipuSitelen = document.createElement('canvas');
  const lonSitelen = lipuSitelen.getContext('2d')!;
  lonSitelen.font = 'normal 100px truculenta-variable';
  
  function paliELinja(nimiLili: string, suliPokaAli: number): LinjaNimi
  {
    const suliPoka = Math.round(suliPokaAli / lonSitelen.measureText(nimiLili).width);
    return { nimiLili: nimiLili, suliPoka: suliPoka };
  }
  
  function kipisiENimi(nimi: string): LinjaNimi[]
  {
    if(nimi.length < 4)
      return [paliELinja(nimi, nanpaSuliPiLinjaWan)];
    else
    {
      const kenKipisi = range(2, nimi.length - 3)
        .select(meso => [
          paliELinja(nimi.substring(0, meso), nanpaSuliPiLinjaTu),
          paliELinja(nimi.substring(meso), nanpaSuliPiLinjaTu),
        ]);
      return kenKipisi
        .orderBy(([wan, tu]) => Math.abs(wan.suliPoka - tu.suliPoka), NumberComparer)
        .first();
    }
  }
  
  const kipisi: { [nimi: string]: LinjaNimi[] } = { };
  for(const nimi of Object.keys(kulupuPiNimiAli))
    kipisi[nimi] = kipisiENimi(nimi);
  
  return kipisi as KipisiPiNimiAli;
}

const nanpaSuliPiLinjaWan = 8000;
const nanpaSuliPiLinjaTu = 10240;
