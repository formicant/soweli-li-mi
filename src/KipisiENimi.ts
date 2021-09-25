import Im from 'immutable' ;
import { Nimi, nimiAli } from './insa/nimiAli';

interface LinjaNimi
{
  readonly nimiLili: string;
  readonly suliPoka: number;
}

export function kipisiENimi(nimi: Nimi): ReadonlyArray<LinjaNimi>
{
  if(!kipisiPiNimiAli)
    kipisiPiNimiAli = paliEKipisiPiNimiAli();
  
  return kipisiPiNimiAli[nimi];
}

type KipisiPiNimiAli = { [nimi in Nimi]: ReadonlyArray<LinjaNimi> };
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
  
  function kipisiENimi(nimi: string): ReadonlyArray<LinjaNimi>
  {
    if(nimi.length < 4)
      return [paliELinja(nimi, nanpaSuliPiLinjaWan)];
    else
    {
      const kenKipisi = Im.Range(2, nimi.length - 1)
        .map(meso => [
          paliELinja(nimi.substring(0, meso), nanpaSuliPiLinjaTu),
          paliELinja(nimi.substring(meso), nanpaSuliPiLinjaTu),
        ]);
      return kenKipisi
        .minBy(([wan, tu]) => Math.abs(wan.suliPoka - tu.suliPoka)) ?? [];
    }
  }
  
  const kipisi: { [nimi: string]: ReadonlyArray<LinjaNimi> } = { };
  for(const nimi of nimiAli)
    kipisi[nimi] = kipisiENimi(nimi);
  
  return kipisi as KipisiPiNimiAli;
}

const nanpaSuliPiLinjaWan = 8000;
const nanpaSuliPiLinjaTu = 10240;
