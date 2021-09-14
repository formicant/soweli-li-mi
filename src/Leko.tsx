import React from 'react';
import './Leko.css';
import Lon from './Lon';
import Kule from './Kule';
import { Nimi } from './NimiAli'
import { lukinPiNnimiAli } from './LukinNimi'
import { kipisiENimi } from './KipisiNimi';

export interface LekoProps extends Lon
{
  readonly nimi: Nimi;
}

export abstract class Leko extends React.Component<LekoProps, any>
{
  constructor(props: LekoProps)
  {
    super(props);
  }
  
  private kule(): Kule
  {
    const lukinNimi = lukinPiNnimiAli[this.props.nimi];
    return lukinNimi.kule;
  }
  
  public baseRender = (content: JSX.Element | JSX.Element[]) =>
    <div className='Leko' style={{
      color: this.kule(),
      left: `${this.props.x}em`,
      top: `${this.props.y}em`,
    }}>
      {content}
    </div>;
}

export class LekoSitelen extends Leko
{
  public render = () => this.baseRender(
    <span className='sitelen'>
      {this.props.nimi}
    </span>
  );
}

export class LekoNimi extends Leko
{
  public render()
  {
    const linja = kipisiENimi(this.props.nimi);
    const nanpaLinja = linja.length === 1 ? 'Wan' : 'Tu';
    return this.baseRender(linja.map((ni, nanpa) =>
      <span
        key={nanpa}
        className={`nimi linja${nanpaLinja}`}
        style={{ fontVariationSettings: `'wdth' ${ni.suliPoka}, 'opsz' 12` }}
      >
        {ni.nimiLili}
      </span>
    ));
  }
}
