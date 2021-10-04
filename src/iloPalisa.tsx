import { Component } from 'react';
import { monsiELukinKulupu } from "./insa/kepeken";
import { NasinTawa } from "./insa/lon";

type TawaTenpo = 'monsi' | 'sinpin' | 'open' | 'pini';
export type Palisa = NasinTawa | TawaTenpo;

const palisaAli: { [palisa in Palisa]: ReadonlyArray<string> } =
{
  '↑':      ['KeyW', 'ArrowUp'],
  '↓':      ['KeyS', 'ArrowDown'],
  '←':      ['KeyA', 'ArrowLeft'],
  '→':      ['KeyD', 'ArrowRight'],
  
  'monsi':  ['KeyZ', 'Backspace'],
  'sinpin': ['KeyX', 'Space'],
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
    if(palisa)
      this.props.palisaLa(palisa);
  }
}
