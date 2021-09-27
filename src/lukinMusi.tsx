import './lukinMusi.css';
import { Component } from 'react';
import { lipuMaAli } from './insa/lipuMa';
import { Musi, tawaNi, openEMusi, tenpoMonsi, tenpoSinpin, tawa } from './insa/musi';
import { IloPalisa, Palisa } from './iloPalisa';
import { Ma } from './ma';
import { panaETokiPiNasinMusi } from './insa/pilinToki';
import { LonIjo } from './insa/lonIjo';

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
    
    // O WEKA E NI:
    const lonIjo = new LonIjo(lipuIjo);
    const lipuPiNasinMusi =
      panaETokiPiNasinMusi(this.state.lipuMa.suli, lonIjo)
        .map(toki => <p>{toki}</p>);
    // ^^^
    
    return (
      <main>
        <div className='nimiMa'>
          {this.state.lipuMa.nimi}
        </div>
        <Ma
          suli={this.state.lipuMa.suli}
          lipuIjo={lipuIjo}
        />
        <div>
          {lipuPiNasinMusi}
        </div>
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
