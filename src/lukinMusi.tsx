import './lukinMusi.css';
import { Component } from 'react';
import { lipuMaAli } from './insa/lipuMa';
import { Musi, tawaNi, openEMusi, tenpoMonsi, tenpoSinpin, tawa } from './insa/musi';
import { IloPalisa, Palisa } from './iloPalisa';
import { Ma } from './ma';
import { panaENasinMusiAli } from './insa/pilinToki';
import { tokiENasinMusi } from './insa/nasinMusi';
import { paliELonIjo } from './insa/lonIjo';

export class LukinMusi extends Component<{ }, Musi>
{
  constructor(jo: { })
  {
    super(jo);
    this.state = openEMusi(lipuMaAli[0]);
  }
  
  render()
  {
    const ni = tawaNi(this.state);
    
    // O WEKA E NI:
    const lonIjo = paliELonIjo(ni.lipuIjo);
    const lipuPiNasinMusi =
      panaENasinMusiAli(this.state.lipuMa.suli, lonIjo)
        .map(tokiENasinMusi)
        .map((toki, nanpa) => <p key={nanpa}>{toki}</p>);
    // ^^^
    
    return (
      <main>
        <div className='nimiMa'>
          {this.state.lipuMa.nimi}
        </div>
        <Ma
          suli={this.state.lipuMa.suli}
          lipuIjo={ni.lipuIjo}
          lukinWawa={ni.lukinWawa}
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
