import Im from 'immutable';

export type NasinTawa = 'sewi' | 'anpa' | 'soto' | 'teje';

interface ILon
{
  readonly x: number,
  readonly y: number;
}

export class Lon extends Im.Record<ILon>({ x: 0, y: 0 }) implements ILon
{
  constructor(x: number, y: number)
  {
    super({ x: x, y: y });
  }
  
  anteEPokaESewi() { return new Lon(this.y, this.x); }
  
  tawa(nasin: NasinTawa)
  {
    switch(nasin)
    {
      case 'sewi': return new Lon(this.x, this.y - 1);
      case 'anpa': return new Lon(this.x, this.y + 1);
      case 'soto': return new Lon(this.x - 1, this.y);
      case 'teje': return new Lon(this.x + 1, this.y);
      default: throw new Error('nasin li ike!');
    }
  }
}
