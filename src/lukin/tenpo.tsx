import classNames from 'classnames';
import { LukinTawa } from '../insa/musi';
import './tenpo.css';

interface JoTenpo
{
  readonly tenpo: readonly LukinTawa[];
  readonly tenpoNi: number;
  readonly palisaLa: (nanpa: number) => void;
}

export const Tenpo = ({ tenpo, tenpoNi, palisaLa }: JoTenpo) =>
  <div className='pokiTenpo'>
    <div className='tenpo' style={{ left: `${lon(tenpoNi, tenpo.length)}em` }}>
      {tenpo.map(lukinTawa =>
        <Tawa key={lukinTawa.nanpa} lukinTawa={lukinTawa} palisaLa={palisaLa} />
      )}
    </div>
  </div>;

interface JoTawa
{
  readonly lukinTawa: LukinTawa;
  readonly palisaLa: (nanpa: number) => void;
}

const Tawa = ({ lukinTawa, palisaLa }: JoTawa) =>
  <div className='tawa'>
    <button
      className={classNames({ 'kama': lukinTawa.liKama })}
      onClick={() => palisaLa(lukinTawa.nanpa)}
    >
      {lukinTawa.nasin}
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

const suli = 24;
const namako = 1.5;
