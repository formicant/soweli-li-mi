import './Ma.css';
import { Component } from 'react';
import { LekoNimi, LekoSitelen } from './Leko';

interface JoMa
{
}

interface InsaMa
{
}

export class Ma extends Component<JoMa, InsaMa>
{
  render = () =>
    <div className='Ma'>
      <LekoNimi x={0} y={0} nimi='soweli' />
      <LekoNimi x={1} y={1} nimi='li' />
      <LekoNimi x={2} y={2} nimi='mi' />
      <LekoSitelen x={3} y={3} nimi='soweli' />
      <LekoNimi x={5} y={1} nimi='kasi' />
      <LekoNimi x={6} y={1} nimi='li' />
      <LekoNimi x={7} y={1} nimi='awen' />
      <LekoNimi x={5} y={2} nimi='pakala' />
      <LekoNimi x={6} y={2} nimi='kiwen' />
      <LekoNimi x={7} y={2} nimi='ala' />
      <LekoSitelen x={2} y={4} nimi='kasi' />
      <LekoSitelen x={3} y={4} nimi='kasi' />
      <LekoSitelen x={4} y={4} nimi='kasi' />
      <LekoSitelen x={5} y={4} nimi='kiwen' />
      <LekoSitelen x={6} y={4} nimi='kiwen' />
      <LekoSitelen x={7} y={4} nimi='ko' />
      <LekoSitelen x={8} y={4} nimi='leko' />
    </div>;
}
