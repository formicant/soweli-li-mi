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
}

export function Ma(jo: JoMa)
{
  const lekoAli = jo.lipuIjo
    .map((ijo, nanpaTaso) =>
      <Leko key={nanpaTaso} ijo={ijo} lukinWawa={jo.lukinWawa.contains(nanpaTaso)} />
    )
    .toIndexedSeq();
  
  return (
    <div className='ma' style={{
      width: `${jo.suli.x}em`,
      height: `${jo.suli.y}em`,
    }}>
      {lekoAli}
    </div>
  );
}
