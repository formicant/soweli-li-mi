import './LukinMusi.css';
import { Component } from 'react';
import { lipuMaAli } from './insa/LipuMa';
import { Musi, openEMusi } from './insa/Musi';
import { Ma } from './Ma';

export class LukinMusi extends Component<{ }, Musi>
{
  constructor()
  {
    super({ });
    this.state = openEMusi(lipuMaAli[0]);
  }
  
  render()
  {
    return (
      <main>
        <Ma
          nimi={this.state.lipuMa.nimi}
          suli={this.state.lipuMa.suli}
          lipuIjo={this.lipuIjo}
        />
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
}
