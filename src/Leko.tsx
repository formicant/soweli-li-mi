import './Leko.css';
import classNames from 'classnames';
import { Component } from 'react';
import { Ijo, KlupuIjo, panaEKulupuIjo } from './insa/Ijo';
import { Kule } from './Kule';
import { lukinPiNnimiAli } from './LukinNimi'
import { kipisiENimi } from './KipisiENimi';

const anteKule: { [kulupu in KlupuIjo]: boolean } =
{
  ijo:     true,
  toki:    true,
  kulupu:  true,
  pali:    false,
  sitelen: false,
} as const;

export interface InsaLeko
{
}

export abstract class Leko extends Component<Ijo, InsaLeko>
{
  // constructor(ijo: Ijo)
  // {
  //   super(ijo);
  // }
  
  render()
  {
    const kulupu = panaEKulupuIjo(this.props);
    const kulupuLukin = classNames('Leko', kulupu);
    const lukinKule = anteKule[kulupu]
      ? { backgroundColor: this.kule }
      : { color: this.kule };
    const lukin = {
      left: `${this.props.x}em`,
      top: `${this.props.y}em`,
      ...lukinKule
    };
    
    return (
      <div className={kulupuLukin} style={lukin}>
        {this.insa()}
      </div>
    );
  };
  
  private insa()
  {
    if(this.props.liSitelen)
      return <span>{this.props.nimi}</span>;
    else
    {
      const linja = kipisiENimi(this.props.nimi);
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
  
  private get kule(): Kule
  {
    const lukinNimi = lukinPiNnimiAli[this.props.nimi];
    return lukinNimi.kule;
  }
}
