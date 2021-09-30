import './lukinMusi.css';
import lipuMaAli from './lipu/lipuMa.json'
import { Component } from 'react';
import { Musi, tawaNi, openEMusi, tenpoMonsi, tenpoSinpin, tawa } from './insa/musi';
import { IloPalisa, Palisa } from './iloPalisa';
import { Ma } from './ma';
import { pilinELipuMa } from './insa/lipuMa';

export class LukinMusi extends Component<{ }, Musi>
{
  constructor(jo: { })
  {
    super(jo);
    const lipuMa = pilinELipuMa(lipuMaAli[2]);
    this.state = openEMusi(lipuMa.nimiMa, lipuMa.suliMa, lipuMa.ijoAli);
  }
  
  render()
  {
    const ni = tawaNi(this.state);
    
    return (
      <main>
        <div className='nimiMa'>
          {this.state.nimiMa}
        </div>
        <Ma
          suli={this.state.suliMa}
          lipuIjo={ni.lipuIjo}
          lukinWawa={ni.lukinWawa}
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
