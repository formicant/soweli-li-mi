import './lukinMusi.css';
import lipuMaAli from '../lipu/lipuMa.json'
import { Component } from 'react';
import { Musi } from '../insa/musi';
import { IloPalisa, Palisa } from './iloPalisa';
import { Ma } from './ma';

export class LukinMusi extends Component<{ }, { musi: Musi }>
{
  constructor(jo: { })
  {
    super(jo);
    const lipuMa = lipuMaAli[1];
    this.state = { musi: new Musi(lipuMa) };
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
  
  private paliPalisa: Record<Palisa, (musi: Musi) => Musi> =
  {
    '↑':      musi => musi.tawa('↑'),
    '↓':      musi => musi.tawa('↓'),
    '←':      musi => musi.tawa('←'),
    '→':      musi => musi.tawa('→'),
    'monsi':  musi => musi.tenpoMonsi(),
    'sinpin': musi => musi.tenpoSinpin(),
    'open':   musi => musi.tenpoMonsi(true),
    'pini':   musi => musi.tenpoSinpin(true),
  } as const;
}
