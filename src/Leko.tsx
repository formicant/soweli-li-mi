import React from 'react';
import './Leko.css';
import Lon from './Lon';
import Kule from './Kule';
import { Nimi } from './NimiAli'
import { lukinPiNnimiAli } from './LukinNimi'
import { kipisiNimi } from './KipisiNimi';

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
      left: Leko.size * this.props.x,
      top: Leko.size * this.props.y,
    }}>
      {content}
    </div>;
  
  static readonly size = 40;
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
    const linja = kipisiNimi(this.props.nimi);
    const nanpaLinja = linja.length === 1 ? 'Wan' : 'Tu';
    return this.baseRender(linja.map((ni, nanpa) =>
      <span className={`nimi linja${nanpaLinja}`} key={nanpa}>
        {ni.nimiLili}
      </span>
    ));
  }
}
