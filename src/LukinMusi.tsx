import './LukinMusi.css';
import { Component } from 'react';
import { lipuMaAli } from './insa/LipuMa';
import { Musi, openEMusi } from './insa/Musi';
import { IloPalisa, Palisa } from './IloPalisa';
import { Ma } from './Ma';

export class LukinMusi extends Component<{ }, Musi>
{
  constructor(jo: { })
  {
    super(jo);
    this.state = openEMusi(lipuMaAli[0]);
  }
  
  render()
  {
    return (
      <main>
        <div className='nimiMa'>
          {this.state.lipuMa.nimi}
        </div>
        <Ma
          suli={this.state.lipuMa.suli}
          lipuIjo={this.lipuIjo}
        />
        <IloPalisa palisaLa={this.lukaPalisa} />
      </main>
    );
  }
  
  private get lipuIjo()
  {
    const tawaNi = this.state.tenpo.get(this.state.tenpoNi);
    if(tawaNi)
      return tawaNi.lipuIjo;
    else
      throw Error('tenpo ni li ike!');
  }
  
  private lukaPalisa(palisa: Palisa): void
  {
    console.log(palisa);
  }
}
