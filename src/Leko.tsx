import './leko.css';
import classNames from 'classnames';
import { useState, useRef, useEffect } from 'react';
import { Ijo, panaEKulupuIjo } from './insa/ijo';
import { lukinPiNnimiAli, anteEKule } from './lukinNimi'
import { kipisiENimi } from './kipisiENimi';
import { Jasima, panaEJasima } from './jasima';

export function Leko(ijo: Ijo)
{
  const kulupu = panaEKulupuIjo(ijo);
  const kulupuLukin = classNames('Leko', kulupu);
  const lukinNimi = lukinPiNnimiAli[ijo.nimi];
  
  const ijoMajuna = useMajuna(ijo);
  const [jasimaMajuna, sinEJasima] = useState<Jasima>('none');
  const jasima = panaEJasima(jasimaMajuna, ijoMajuna, ijo, lukinNimi.anteTawa);
  if(jasima !== jasimaMajuna)
    sinEJasima(jasima);
  
  const lukinKule = anteEKule[kulupu]
    ? { backgroundColor: lukinNimi.kule }
    : { color: lukinNimi.kule };
  const lukin = {
    ...lukinKule,
    left: `${ijo.x}em`,
    top: `${ijo.y}em`,
    transform: jasima
  };
  
  return (
    <div className={kulupuLukin} style={lukin}>
      {insa(ijo)}
    </div>
  );
}

function insa(ijo: Ijo)
{
  if(ijo.liSitelen)
    return <span>{ijo.nimi}</span>;
  else
  {
    const linja = kipisiENimi(ijo.nimi);
    const nanpaLinja = linja.length === 1 ? 'linjaWan' : 'linjaTu';
    const kulupuLukin = classNames('nimi', nanpaLinja);
    
    return linja.map(({ nimiLili, suliPoka }, nanpa) =>
      <span key={nanpa} className={kulupuLukin}
        style={{ fontVariationSettings: `'wdth' ${suliPoka}, 'opsz' 12` }}
      >
        {nimiLili}
      </span>
    );
  }
}

function useMajuna<T>(sin: T)
{
  const ona = useRef<T>();
  useEffect(() => { ona.current = sin; });
  return ona.current;
}
