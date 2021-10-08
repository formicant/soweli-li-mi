import './lukinMusi.css';
import lipuMaAli from '../lipu/lipuMa.json'
import { Component } from 'react';
import { Musi } from '../insa/musi';
import { IloPalisa, Palisa } from './iloPalisa';
import { Ma } from './ma';
import { Tenpo } from './tenpo';
import { liNasinTawa } from '../insa/lon';

export class LukinMusi extends Component<{ }, { musi: Musi }>
{
  constructor(jo: { })
  {
    super(jo);
    const lipuMa = lipuMaAli[0];
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
          liPini={tawaNi.pilin === 'pini'}
        />
        <Tenpo
          nasin={musi.panaENasin(true)}
          tenpoNi={musi.tenpoNi}
          tenpoNanpaLa={this.lukaTenpoNanpa}
          panaTanPokiLa={this.lukaPanaTanPoki}
        />
        <IloPalisa palisaLa={this.lukaPalisa} />
      </main>
    );
  }
  
  private lukaTenpoNanpa = (nanpa: number) =>
    this.setState({ musi: this.state.musi.tenpoNanpa(nanpa) });
  
  private lukaPanaTanPoki = (nasin: string) =>
    this.setState({ musi: this.state.musi.sinETenpoAli(nasin) });
  
  private lukaPalisa = (palisa: Palisa) =>
  {
    if(!liNasinTawa(palisa) ||
      this.state.musi.tawaNi.pilin === 'palisa')
    {
      const pali = this.paliPalisa[palisa];
      this.setState({ musi: pali(this.state.musi) });
    }
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
