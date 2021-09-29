import './leko.css';
import classNames from 'classnames';
import { useState, useRef, useEffect } from 'react';
import { Ijo, panaEKulupuIjo } from './insa/ijo';
import { lukinPiNnimiAli, anteEKule } from './lukinNimi'
import { kipisiENimi } from './kipisiENimi';
import { Jasima, panaEJasima } from './jasima';

export function Leko({ ijo, lukinWawa }: { ijo: Ijo, lukinWawa: boolean })
{
  const kulupu = panaEKulupuIjo(ijo);
  const kulupuLukin = classNames('leko', { 'wawa': lukinWawa });
  const kulupuLukinInsa = classNames('insaLeko', kulupu);
  const lukinNimi = lukinPiNnimiAli[ijo.nimi];
  const anteTawa = ijo.liSitelen ? lukinNimi.anteTawa : undefined;
  
  const ijoMajuna = useMajuna(ijo);
  const [jasimaMajuna, sinEJasima] = useState<Jasima>('none');
  const jasima = ijoMajuna?.nimi === ijo.nimi
    ? panaEJasima(jasimaMajuna, ijoMajuna, ijo, anteTawa)
    : 'none';
  if(jasima !== jasimaMajuna)
    sinEJasima(jasima);
  
  const lukin =
  {
    left: `${ijo.x}em`,
    top: `${ijo.y}em`,
    transform: jasima,
  };
  const lukinKule = anteEKule[kulupu]
    ? { backgroundColor: lukinNimi.kule }
    : { color: lukinNimi.kule };
  
  return (
    <div className={kulupuLukin} style={lukin}>
      <div className={kulupuLukinInsa} style={lukinKule}>
        {insa(ijo)}
      </div>
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
