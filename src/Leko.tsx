import './Leko.css';
import classNames from 'classnames';
import { Component } from 'react';
import { Lon } from './Lon';
import { Kule } from './Kule';
import { Nimi, KlupuNimi, kulupuPiNimiAli } from './NimiAli'
import { lukinPiNnimiAli } from './LukinNimi'
import { kipisiENimi } from './KipisiENimi';

type kulupuLeko = KlupuNimi | 'sitelen';

const anteKule: { [kulupu in kulupuLeko]: boolean } =
{
  ijo:     true,
  toki:    true,
  kulupu:  true,
  pali:    false,
  sitelen: false,
};

export interface JoLeko extends Lon
{
  readonly nimi: Nimi;
}

export abstract class Leko extends Component<JoLeko, any>
{
  constructor(props: JoLeko)
  {
    super(props);
  }
  
  render()
  {
    const kulupu = this.kulupu();
    const kule = this.kule();
    
    const kulupuLukin = classNames('Leko', this.kulupu());
    const lukinKule = anteKule[kulupu]
      ? { backgroundColor: kule }
      : { color: kule };
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
  
  protected abstract kulupu(): kulupuLeko;
  
  protected abstract insa(): JSX.Element | JSX.Element[];
  
  private kule(): Kule
  {
    const lukinNimi = lukinPiNnimiAli[this.props.nimi];
    return lukinNimi.kule;
  }
}

export class LekoSitelen extends Leko
{
  protected kulupu = () => 'sitelen' as const;
  
  protected insa = () =>
    <span>
      {this.props.nimi}
    </span>;
}

export class LekoNimi extends Leko
{
  protected kulupu =
    () => kulupuPiNimiAli[this.props.nimi];
  
  protected insa()
  {
    const linja = kipisiENimi(this.props.nimi);
    const nanpaLinja = linja.length === 1 ? 'Wan' : 'Tu';
    const kulupuLukin = classNames('nimi', `linja${nanpaLinja}`);
    
    return linja.map(({ nimiLili, suliPoka }, nanpa) =>
      <span key={nanpa} className={kulupuLukin}
        style={{ fontVariationSettings: `'wdth' ${suliPoka}, 'opsz' 12` }}
      >
        {nimiLili}
      </span>
    );
  }
}
