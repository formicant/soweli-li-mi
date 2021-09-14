import './Leko.css';
import { Component } from 'react';
import { Lon } from './Lon';
import { Kule } from './Kule';
import { Nimi } from './NimiAli'
import { lukinPiNnimiAli } from './LukinNimi'
import { kipisiENimi } from './KipisiENimi';

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
  
  render = () =>
    <div className='Leko' style={{
      color: this.kule(),
      left: `${this.props.x}em`,
      top: `${this.props.y}em`,
    }}>
      {this.insa()}
    </div>;
  
  protected abstract insa(): JSX.Element | JSX.Element[];
  
  private kule(): Kule
  {
    const lukinNimi = lukinPiNnimiAli[this.props.nimi];
    return lukinNimi.kule;
  }
}

export class LekoSitelen extends Leko
{
  protected insa = () =>
    <span className='sitelen'>
      {this.props.nimi}
    </span>;
}

export class LekoNimi extends Leko
{
  protected insa()
  {
    const linja = kipisiENimi(this.props.nimi);
    const nanpaLinja = linja.length === 1 ? 'Wan' : 'Tu';
    
    return linja.map(({ nimiLili, suliPoka }, nanpa) =>
      <span
        key={nanpa}
        className={`nimi linja${nanpaLinja}`}
        style={{ fontVariationSettings: `'wdth' ${suliPoka}, 'opsz' 12` }}
      >
        {nimiLili}
      </span>
    );
  }
}
