import { Component } from 'react';

export interface JoPiIloTenpo
{
  tenpoLa(): void;
}

export class IloTenpo extends Component<JoPiIloTenpo>
{
  render = () => null;
  
  componentDidMount()
  {
    this.pali();
  }
  
  componentDidUpdate(prevProps: JoPiIloTenpo)
  {
    this.weka();
    this.pali();
  }
  
  componentWillUnmount()
  {
    this.weka();
  }
  
  private suli = 20;
  
  private timer?: NodeJS.Timeout;
  
  private lukaTenpo = () =>
  {
    this.weka();
    this.props.tenpoLa();
  }
  
  private pali()
  {
    this.timer = setInterval(this.lukaTenpo, this.suli);
  }
  
  private weka()
  {
    if(this.timer)
      clearInterval(this.timer);
  }
}
