import { Lon } from './insa/Lon';
import { AnteTawa } from './LukinNimi'

export type Jasima = 'none' | `scaleX(${-1 | 1})` | `rotate(${number}turn)`;

export function panaEJasima(jasimaMajuna: Jasima, lonMajuna: Lon | undefined, lonSin: Lon, anteTawa?: AnteTawa): Jasima
{
  if(lonMajuna && (anteTawa === 'sikePoka' || anteTawa === 'sikeSewi'))
  {
    const nanpaNasin =
      lonSin.x > lonMajuna.x ? 0 :
      lonSin.y > lonMajuna.y ? 0.25 :
      lonSin.x < lonMajuna.x ? 0.5 :
      lonSin.y < lonMajuna.y ? 0.75 :
      undefined;
    
    if(nanpaNasin !== undefined)
    {
      const namako =  anteTawa === 'sikeSewi' ? 0.25 : 0;
      
      const nanpaMajuna = panaENanpaPiJasimaSike(jasimaMajuna);
      
      const nanpaSike = nanpaNasin + namako;
      return `rotate(${nanpaSike}turn)`;
    }
    else
      return jasimaMajuna;
  }
  else if(lonMajuna && anteTawa === 'poka')
  {
    if(lonSin.x > lonMajuna.x)
      return `scaleX(1)`;
    else if(lonSin.x < lonMajuna.x)
      return `scaleX(-1)`;
    else
      return jasimaMajuna;
  }
  else
    return 'none';
}

function panaENanpaPiJasimaSike(jasima: Jasima)
{
  const kili = alasaNanpaPiJasimaSike.exec(jasima);
  if(kili)
    return parseFloat(kili[1]);
  else
    return undefined;
}

const alasaNanpaPiJasimaSike = /rotate\((.*)turn\)/;
