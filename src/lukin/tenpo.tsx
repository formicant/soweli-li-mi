import classNames from 'classnames';
import { NasinTawa } from '../insa/lon';
import { LukinTawa } from '../insa/musi';
import './tenpo.css';

interface JoTenpo
{
  readonly tenpo: readonly LukinTawa[];
  readonly tenpoNi: number;
  readonly tenpoNanpaLa: (nanpa: number) => void;
  readonly panaTanPokiLa: (nasin: string) => void;
}

export const Tenpo = ({ tenpo, tenpoNi, tenpoNanpaLa, panaTanPokiLa }: JoTenpo) =>
  <>
    <div className='pokiTenpo'>
      <div className='tenpo' style={{ left: `${lon(tenpoNi, tenpo.length)}em` }}>
        {tenpo.map(lukinTawa =>
          <Tawa key={lukinTawa.nanpa} lukinTawa={lukinTawa} tenpoNanpaLa={tenpoNanpaLa} />
        )}
      </div>
    </div>
    <div className='panaTenpo'>
      <button title='pana e tenpo tawa poki' onClick={() => panaTawaPoki(tenpo, tenpoNi)}>content_copy</button>
      <button title='pana e tenpo tan poki' onClick={() => panaTanPoki(panaTanPokiLa)}>content_paste</button>
      <textarea id='panaTanPoki' />
    </div>
  </>;

interface JoTawa
{
  readonly lukinTawa: LukinTawa;
  readonly tenpoNanpaLa: (nanpa: number) => void;
}

const Tawa = ({ lukinTawa, tenpoNanpaLa }: JoTawa) =>
  <div className='tawa'>
    <button
      className={classNames({ 'kama': lukinTawa.liKama })}
      onClick={() => tenpoNanpaLa(lukinTawa.nanpa)}
    >
      {lukinTawa.nasin ? nimiNasin[lukinTawa.nasin] : ''}
    </button>
  </div>;

function lon(ni: number, nanpa: number)
{
  const poka = nanpa <= suli
    ? (suli - nanpa) / 2
    : ni >= suli
      ? suli - ni - 1
      : 0;
  return namako + poka;
}

// O PALI pona e ni!
const suli = 24;
const namako = 1.5;

function panaTawaPoki(tenpo: readonly LukinTawa[], tenpoNi: number)
{
  const nasin = tenpo.slice(1, tenpoNi + 1).map(tawa => tawa.nasin).join('');
  navigator.clipboard.writeText(nasin);
}

function panaTanPoki(panaTanPokiLa: (nasin: string) => void)
{
  if(navigator.clipboard.readText)
    navigator.clipboard.readText().then(nasin => panaTanPokiLa(nasin));
}

const nimiNasin: Record<NasinTawa, string> =
{
  '↑': 'north',
  '↓': 'south',
  '←': 'west',
  '→': 'east',
//   '↑': 'arrow_upward',
//   '↓': 'arrow_downward',
//   '←': 'arrow_back',
//   '→': 'arrow_forward',
};
