import './lukinMusi.css';
import lipuMaAli from './lipu/lipuMa.json'
import { Component } from 'react';
import { Musi } from './insa/musi';
import { IloPalisa, Palisa } from './iloPalisa';
import { Ma } from './ma';
import { pilinELipuMa } from './insa/lipuMa';

export class LukinMusi extends Component<{ }, { musi: Musi }>
{
  constructor(jo: { })
  {
    super(jo);
    const lipuMa = pilinELipuMa(lipuMaAli[1]);
    this.state = { musi: new Musi(lipuMa.nimiMa, lipuMa.suliMa, lipuMa.ijoAli) };
  }
  
  render()
  {
    const musi = this.state.musi;
    const tawaNi = musi.tawaNi;
    
    return (
      <main>
        <div className='nimiMa'>
          {musi.nimiMa}
        </div>
        <Ma
          suli={musi.suliMa}
          lipuIjo={tawaNi.lipuIjo}
          lukinWawa={tawaNi.lukinWawa}
        />
        <IloPalisa palisaLa={this.lukaPalisa} />
      </main>
    );
  }
  
  private lukaPalisa = (palisa: Palisa) =>
  {
    const pali = this.paliPalisa[palisa];
    this.setState({ musi: pali(this.state.musi) });
  };
  
  private paliPalisa: { [palisa in Palisa]: (musi: Musi) => Musi } =
  {
    'sewi':   musi => musi.tawa('sewi'),
    'anpa':   musi => musi.tawa('anpa'),
    'soto':   musi => musi.tawa('soto'),
    'teje':   musi => musi.tawa('teje'),
    'monsi':  musi => musi.tenpoMonsi(),
    'sinpin': musi => musi.tenpoSinpin(),
    'open':   musi => musi.tenpoMonsi(true),
    'pini':   musi => musi.tenpoSinpin(true),
  } as const;
}
