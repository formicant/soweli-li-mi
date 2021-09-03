import { Nimi, kulupuPiNimiAli } from "./NimiAli";

export interface LinjaKipisi
{
  readonly nimiLili: string;
  readonly suliPoka: number;
  readonly suliLukin: number;
}

export function kipisiNimi(nimi: Nimi): LinjaKipisi[]
{
  if(!kipisiPiNimiAli)
    kipisiPiNimiAli = paliEKipisiPiNimiAli();
  
  return kipisiPiNimiAli[nimi];
}

type KipisiPiNimiAli = { [nimi in Nimi]: LinjaKipisi[] };
let kipisiPiNimiAli: KipisiPiNimiAli | undefined;

function paliEKipisiPiNimiAli(): KipisiPiNimiAli
{
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if(!context)
    throw new Error('Ken ala pali e lipu sitelen!');
  context.font = '20px truculenta-variable';
  
  const kipisi: { [nimi: string]: LinjaKipisi[] } = { };
  for(const nimi of Object.keys(kulupuPiNimiAli))
  {
    kipisi[nimi] = kipisiENimi(nimi, context);
  }
  return kipisi as KipisiPiNimiAli;
  
  //const metrics = context.measureText(nimi);
}

function kipisiENimi(nimi: string, context: CanvasRenderingContext2D): LinjaKipisi[]
{
  if(nimi.length < 4)
    return [{ nimiLili: nimi, suliPoka: 75, suliLukin: 72 }];
  else
  {
    const meso = Math.floor(nimi.length / 2);
    return [
      { nimiLili: nimi.substring(0, meso), suliPoka: 75, suliLukin: 72 },
      { nimiLili: nimi.substring(meso), suliPoka: 75, suliLukin: 72 },
    ];
  }
  
}
