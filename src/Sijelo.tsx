import './Sijelo.css';
import { Component } from 'react';
import { lipuMaAli } from './insa/LipuMa';
import { Musi, openEMusi } from './insa/Musi';
import { Ma } from './Ma';

export class Sijelo extends Component<{ }, Musi>
{
  constructor()
  {
    super({ });
    
    this.state = openEMusi(lipuMaAli[0]);
  }
  
  render()
  {
    return (
      <div>
        <header>
          <h1>soweli li mi</h1>
          <h2>soweli li mi</h2>
          <h3>nimi li lon la ijo li lon</h3>
        </header>
        <main>
          <Ma
            nimi={this.state.lipuMa.nimi}
            suli={this.state.lipuMa.suli}
            lipuIjo={this.lipuIjo}
          />
        </main>
      </div>
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
