import { Nimi, kulupuPiNimiAli } from './NimiAli';
import { range } from 'linq-to-typescript';

export interface LinjaNimi
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
      return [paliELinja(nimi, nanpaSulipilinjaWan)];
    else
    {
      const t = range(2, nimi.length - 3);
      
      const meso = Math.floor(nimi.length / 2);
      return [
        paliELinja(nimi.substring(0, meso), nanpaSulipilinjaTu),
        paliELinja(nimi.substring(meso), nanpaSulipilinjaTu),
      ];
    }
  }
  
  const kipisi: { [nimi: string]: LinjaNimi[] } = { };
  for(const nimi of Object.keys(kulupuPiNimiAli))
    kipisi[nimi] = kipisiENimi(nimi);
  
  return kipisi as KipisiPiNimiAli;
}

const nanpaSulipilinjaWan = 8000;
const nanpaSulipilinjaTu = 10240;
