import './Ma.css';
import { Component } from 'react';
import { Lon } from './insa/Lon';
import { LipuIjo } from './insa/Ijo';
import { Leko } from './Leko';

interface JoMa
{
  readonly nimi: string;
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
      <div className='Ma' style={{
        width: `${this.props.suli.x}em`,
        height: `${this.props.suli.y}em`,
      }}>
        {lekoAli}
      </div>
    );
  }
}
