import './leko.css';
import classNames from 'classnames';
import { useState, useRef, useEffect } from 'react';
import { Ijo } from './insa/ijo';
import { lukinPiKulupuNimi, lukinPiIjoAli } from './lukinIjo'
import { kipisiENimi } from './kipisiENimi';
import { Jasima, panaEJasima } from './jasima';
import { panaEKulupuNimi } from './insa/nimiAli';

export function Leko({ ijo, lukinWawa }: { ijo: Ijo, lukinWawa: boolean })
{
  const lukinNimi = ijo.liSitelen
    ? lukinPiIjoAli[ijo.nimi]
    : lukinPiKulupuNimi[panaEKulupuNimi(ijo.nimi)];
  const anteTawa = ijo.liSitelen ? lukinNimi.anteTawa : undefined;
  
  const kulupuLukin = classNames(
    'leko',
    { 'sitelen': ijo.liSitelen },
    { 'wawa': lukinWawa }
  );
  
  const ijoMajuna = useMajuna(ijo);
  const [jasimaMajuna, sinEJasima] = useState<Jasima>('none');
  const jasima = ijoMajuna?.nimi === ijo.nimi
    ? panaEJasima(jasimaMajuna, ijoMajuna.lon, ijo.lon, anteTawa)
    : 'none';
  if(jasima !== jasimaMajuna)
    sinEJasima(jasima);
  
  const lukin =
  {
    left: `${ijo.lon.x}em`,
    top: `${ijo.lon.y}em`,
    transform: jasima,
    color: lukinNimi.kule,
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
