import './maSeme.css';
import lipuMaAli from '../lipu/lipuMa.json'
import { LipuMa } from '../insa/lipuMa';

export const MaSeme = ({ paliLa }: { paliLa: (lipuMa: LipuMa) => void }) =>
  <div className='maSeme'>
    <p>sina wile musi lon ma seme?</p>
    <div className='pokiMa'>
      {lipuMaAli.map((lipuMa, nanpa) =>
        <button
          key={nanpa}
          onClick={() => paliLa(lipuMa)}
        >
          {lipuMa.nimi}
        </button>
      )}
    </div>
  </div>;
