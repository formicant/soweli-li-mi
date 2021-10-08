import './sijelo.css';
import { LukinMusi } from './lukinMusi';
import { MaSeme } from './maSeme';
import { LipuMa } from '../insa/lipuMa';
import { Component } from 'react';

interface InsaSijelo
{
  readonly lipuMa?: LipuMa;
}

export class Sijelo extends Component<{ }, InsaSijelo>
{
  constructor(jo: { })
  {
    super(jo);
    this.state = { };
  }
  
  render()
  {
    return (
      <>
        <header onClick={this.lukaMonsi}>
          <h1>soweli li mi</h1>
          <h2>soweli li mi</h2>
          <h3>nimi li lon la ijo li lon</h3>
        </header>
        {
          this.state.lipuMa
            ? <LukinMusi lipuMa={this.state.lipuMa} />
            : <MaSeme paliLa={this.lukaPali} />
        }
      </>
    );
  }

  private lukaPali = (lipuMa: LipuMa) =>
    this.setState({ lipuMa: lipuMa });
  
  private lukaMonsi = () =>
    this.setState({ lipuMa: undefined });
}
