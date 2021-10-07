import './ma.css';
import Im from 'immutable';
import { Lon } from '../insa/lon';
import { LipuIjo } from '../insa/lipuIjo';
import { Leko } from './leko';

interface JoMa
{
  readonly suli: Lon;
  readonly lipuIjo: LipuIjo;
  readonly lukinWawa: Im.Set<number>;
  readonly liPini: boolean;
}

export function Ma(jo: JoMa)
{
  const lekoAli = jo.lipuIjo
    .map((ijo, nanpaTaso) =>
      <Leko key={nanpaTaso} ijo={ijo} lukinWawa={jo.lukinWawa.contains(nanpaTaso)} />
    )
    .toIndexedSeq();
  
    const suli = {
      width: `${jo.suli.x}em`,
      height: `${jo.suli.y}em`,
    };
  
  return (
    <div className='ma' style={suli}>
      <div>
        {lekoAli}
      </div>
      {
        jo.liPini &&
          <div className='pini' style={suli}>
            <p className='pona sitelen'>pona</p>
            <p className='pona toki'>pona!</p>
          </div>
      }
    </div>
  );
}
