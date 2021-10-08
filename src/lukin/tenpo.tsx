import classNames from 'classnames';
import { NasinTawa } from '../insa/lon';
import { panaENimiPalisa } from './iloPalisa';
import './tenpo.css';

interface JoTenpo
{
  readonly nasin: readonly (NasinTawa | undefined)[];
  readonly tenpoNi: number;
  readonly tenpoNanpaLa: (nanpa: number) => void;
  readonly panaTanPokiLa: (nasin: string) => void;
}

export const Tenpo = ({ nasin, tenpoNi, tenpoNanpaLa, panaTanPokiLa }: JoTenpo) =>
  <>
    <div className='pokiTenpo'>
      <div className='tenpo' style={{ left: `${lon(tenpoNi, nasin.length)}em` }}>
        {nasin.map((nasinTawa, nanpa) =>
          <Tawa
            key={nanpa}
            nasinTawa={nasinTawa}
            nanpaTanNi={nanpa - tenpoNi}
            paliLa={() => tenpoNanpaLa(nanpa)}
          />
        )}
      </div>
    </div>
    
    <div className='panaTenpo'>
      <button
        className={classNames({ 'kama': tenpoNi === 0 })}
        title='pana e nasin tawa poki'
        onClick={tenpoNi > 0 ? () => panaTawaPoki(nasin, tenpoNi) : () => {}}
      >
        content_copy
      </button>
      <button
        title={'pana e nasin tan poki.\npali ala lon ilo lukin Firefox :('}
        onClick={() => panaTanPoki(panaTanPokiLa)}
      >
        content_paste
      </button>
    </div>
  </>;

interface JoTawa
{
  readonly nasinTawa: NasinTawa | undefined;
  readonly nanpaTanNi: number;
  readonly paliLa: () => void;
}

function Tawa({ nasinTawa, nanpaTanNi, paliLa }: JoTawa)
{
  const kulupuLukin = classNames({ 'kama': nanpaTanNi > 0 });
  const sitelen = nasinTawa ? nimiNasin[nasinTawa] : '';
  
  const nanpaTawa = Math.abs(nanpaTanNi);
  const nimiNanpa = nanpaTawa <= 2 ? nanpaTawa === 1 ? 'wan' : 'tu' : 'mute';
  const sinpinAnuMonsi = nanpaTanNi > 0 ? 'sinpin': 'monsi';
  const insaLinja = '\n';
  const palisa = nanpaTawa === 1 ? `${insaLinja}palisa ${panaENimiPalisa(sinpinAnuMonsi).join(' anu ')}` : '';
  const toki = nasinTawa
    ? nanpaTanNi === 0
      ? 'tenpo ni'
      : `tawa ${nimiNanpa} ${sinpinAnuMonsi}${palisa}`
    : `open musi${insaLinja}palisa ${panaENimiPalisa('open').join(' anu ')}`;
  
  return (
    <div className='tawa'>
      <button
        className={kulupuLukin}
        title={toki}
        onClick={paliLa}
      >
        {sitelen}
      </button>
    </div>
  );
}

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
const suli = 23;
const namako = 1.5;

function panaTawaPoki(nasin: readonly (NasinTawa | undefined)[], tenpoNi: number)
{
  const tokiNasin = nasin.slice(1, tenpoNi + 1).join('');
  navigator.clipboard.writeText(tokiNasin);
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
