import './lukinMusi.css';
import { Component } from 'react';
import { Musi } from '../insa/musi';
import { IloPalisa, Palisa } from './iloPalisa';
import { Ma } from './ma';
import { Tenpo } from './tenpo';
import { liNasinTawa } from '../insa/lon';
import { IloTenpo } from './iloTenpo';
import { LipuMa } from '../insa/lipuMa';

export interface JoPiLukinMusi
{
  readonly lipuMa: LipuMa;
}

export class LukinMusi extends Component<JoPiLukinMusi, { musi: Musi }>
{
  constructor(jo: JoPiLukinMusi)
  {
    super(jo);
    this.state = { musi: new Musi(jo.lipuMa) };
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
        {
          tawaNi.pilin === 'tawa' &&
            <IloTenpo tenpoLa={this.lukaIloTenpo} />
        }
      </main>
    );
  }
  
  private lukaIloTenpo = () =>
    this.setState({ musi: this.state.musi.tawaTawa() });
  
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
    '↑':      musi => musi.tawaPalisa('↑'),
    '↓':      musi => musi.tawaPalisa('↓'),
    '←':      musi => musi.tawaPalisa('←'),
    '→':      musi => musi.tawaPalisa('→'),
    'monsi':  musi => musi.tenpoMonsi(),
    'sinpin': musi => musi.tenpoSinpin(),
    'open':   musi => musi.tenpoMonsi(true),
    'pini':   musi => musi.tenpoSinpin(true),
  } as const;
}
