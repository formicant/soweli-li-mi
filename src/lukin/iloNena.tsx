import { Component } from 'react'
import { monsiELukinKulupu } from '../insa/kepeken'
import { liNasinTawa, NasinTawa } from '../insa/lon'

type TawaTenpo = 'monsi' | 'sinpin' | 'open' | 'pini'
export type Nena = NasinTawa | TawaTenpo

const nenaAle: Record<Nena, readonly string[]> = {
  '↑':    ['KeyW', 'ArrowUp'   ],
  '↓':    ['KeyS', 'ArrowDown' ],
  '←':    ['KeyA', 'ArrowLeft' ],
  '→':    ['KeyD', 'ArrowRight'],

  monsi:  ['KeyZ', 'Backspace' ],
  sinpin: ['KeyX', 'Insert'    ],
  open:   ['KeyR', 'Home'      ],
  pini:   ['KeyT', 'End'       ],
} as const

const nenaPiNimiNena = monsiELukinKulupu(nenaAle)

export interface JoPiIloNena {
  nenaLa(nena: Nena): void
}

export class IloNena extends Component<JoPiIloNena> {
  render = () => null

  componentDidMount() {
    window.addEventListener('keydown', this.lukaNena)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.lukaNena)
  }

  private lukaNena = (pali: KeyboardEvent) => {
    const nena = nenaPiNimiNena.get(pali.code)
    if (nena && !(pali.repeat && liNasinTawa(nena))) {
      this.props.nenaLa(nena)
      pali.preventDefault()
    }
  }
}

export function panaENimiNena(nena: Nena): readonly string[] {
  return nenaAle[nena].map(nimi => `[${nimi.replace(/^Key/, '')}]`)
}
