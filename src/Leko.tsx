import React from 'react';
import './Leko.css';
import Lon from './Lon';
import Kule from './Kule';
import { Nimi, lukinPiNnimiAli } from './NimiAli'

export interface LekoProps extends Lon
{
  nimi: Nimi;
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
  
  public baseRender = (content: JSX.Element) =>
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
  public render = () => this.baseRender(
    <span className='nimi'>
      {this.props.nimi}
    </span>
  );
}
