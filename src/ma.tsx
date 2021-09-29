import './ma.css';
import Im from "immutable";
import { Component } from 'react';
import { Lon } from './insa/lon';
import { LipuIjo } from './insa/ijo';
import { Leko } from './leko';

interface JoMa
{
  readonly suli: Lon;
  readonly lipuIjo: LipuIjo;
  readonly lukinWawa: Im.Set<number>;
}

export class Ma extends Component<JoMa>
{
  render()
  {
    const lekoAli = this.props.lipuIjo
      .map((ijo, nanpaTaso) =>
        <Leko key={nanpaTaso} ijo={ijo} lukinWawa={this.props.lukinWawa.contains(nanpaTaso)} />
      )
      .toIndexedSeq();
    
    return (
      <div className='ma' style={{
        width: `${this.props.suli.x}em`,
        height: `${this.props.suli.y}em`,
      }}>
        {lekoAli}
      </div>
    );
  }
}
