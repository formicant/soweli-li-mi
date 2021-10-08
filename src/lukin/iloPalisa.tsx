import { Component } from 'react';
import { monsiELukinKulupu } from '../insa/kepeken';
import { liNasinTawa, NasinTawa } from '../insa/lon';

type TawaTenpo = 'monsi' | 'sinpin' | 'open' | 'pini';
export type Palisa = NasinTawa | TawaTenpo;

const palisaAli: Record<Palisa, readonly string[]> =
{
  '↑':      ['KeyW', 'ArrowUp'],
  '↓':      ['KeyS', 'ArrowDown'],
  '←':      ['KeyA', 'ArrowLeft'],
  '→':      ['KeyD', 'ArrowRight'],
  
  'monsi':  ['KeyZ', 'Backspace'],
  'sinpin': ['KeyX', 'Insert'],
  'open':   ['KeyR', 'Home'],
  'pini':   ['KeyT', 'End'],
} as const;

const palisaPiNimiPalisa = monsiELukinKulupu(palisaAli);

export interface JoPiIloPalisa
{
  palisaLa(palisa: Palisa): void;
}

export class IloPalisa extends Component<JoPiIloPalisa>
{
  render = () => null;
  
  componentDidMount()
  {
    window.addEventListener('keydown', this.lukaPalisa);
  }
  
  componentWillUnmount()
  {
    window.removeEventListener('keydown', this.lukaPalisa);
  }
  
  private lukaPalisa = (pali: KeyboardEvent) =>
  {
    const palisa = palisaPiNimiPalisa.get(pali.code);
    if(palisa && !(pali.repeat && liNasinTawa(palisa)))
    {
      this.props.palisaLa(palisa);
      pali.preventDefault();
    }
  }
}

export function panaENimiPalisa(palisa: Palisa): readonly string[]
{
  return palisaAli[palisa]
    .map(nimi => `[${nimi.replace(/^Key/, '')}]`);
}
