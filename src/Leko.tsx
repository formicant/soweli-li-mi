import './Leko.css';
import classNames from 'classnames';
import { Component } from 'react';
import { Lon } from './Lon';
import { Kule } from './Kule';
import { Nimi, KlupuNimi, kulupuPiNimiAli } from './NimiAli'
import { lukinPiNnimiAli } from './LukinNimi'
import { kipisiENimi } from './KipisiENimi';

type KulupuLeko = KlupuNimi | 'sitelen';

const anteKule: { [kulupu in KulupuLeko]: boolean } =
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
    const kulupuLukin = classNames('Leko', this.kulupu);
    const lukinKule = anteKule[this.kulupu]
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
  
  protected abstract get kulupu(): KulupuLeko;
  
  protected abstract insa(): JSX.Element | ReadonlyArray<JSX.Element>;
  
  private get kule(): Kule
  {
    const lukinNimi = lukinPiNnimiAli[this.props.nimi];
    return lukinNimi.kule;
  }
}

export class LekoSitelen extends Leko
{
  protected get kulupu() { return 'sitelen' as const; }
  
  protected insa = () =>
    <span>
      {this.props.nimi}
    </span>;
}

export class LekoNimi extends Leko
{
  protected get kulupu() { return kulupuPiNimiAli[this.props.nimi]; }
  
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
