import './LukinMusi.css';
import { Component } from 'react';
import { lipuMaAli } from './insa/LipuMa';
import { Musi, tawaNi, openEMusi, tenpoMonsi, tenpoSinpin, tawa } from './insa/Musi';
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
    const lipuIjo = tawaNi(this.state).lipuIjo;
    
    return (
      <main>
        <div className='nimiMa'>
          {this.state.lipuMa.nimi}
        </div>
        <Ma
          suli={this.state.lipuMa.suli}
          lipuIjo={lipuIjo}
        />
        <IloPalisa palisaLa={this.lukaPalisa} />
      </main>
    );
  }
  
  private lukaPalisa = (palisa: Palisa) =>
  {
    const pali = this.paliPalisa[palisa];
    this.setState(pali(this.state));
  };
  
  private paliPalisa: { [palisa in Palisa]: (musi: Musi) => Musi } =
  {
    'sewi':   musi => tawa(musi, 'sewi'),
    'anpa':   musi => tawa(musi, 'anpa'),
    'soto':   musi => tawa(musi, 'soto'),
    'teje':   musi => tawa(musi, 'teje'),
    'monsi':  musi => tenpoMonsi(musi),
    'sinpin': musi => tenpoSinpin(musi),
    'open':   musi => tenpoMonsi(musi, true),
    'pini':   musi => tenpoSinpin(musi, true),
  } as const;
}
