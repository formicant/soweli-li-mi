import './ma.css';
import { Component } from 'react';
import { Lon } from './insa/lon';
import { LipuIjo } from './insa/ijo';
import { Leko } from './leko';

interface JoMa
{
  readonly suli: Lon;
  readonly lipuIjo: LipuIjo;
}

export class Ma extends Component<JoMa>
{
  render()
  {
    const lekoAli = this.props.lipuIjo
      .map((ijo, nanpaTaso) =>
        <Leko key={nanpaTaso} {...ijo} />
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
