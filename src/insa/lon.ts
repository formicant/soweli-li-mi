import Im from 'immutable';

export type NasinTawa = 'sewi' | 'anpa' | 'soto' | 'teje';

interface ILon
{
  readonly x: number,
  readonly y: number;
}
const lonAla: ILon = { x: NaN, y: NaN };

export class Lon extends Im.Record<ILon>(lonAla) implements ILon
{
  constructor(x: number, y: number)
  {
    super({ x: x, y: y });
  }
  
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

  liInsaMa(suliMa: Lon)
  {
    return (
      this.x >= 0 && this.x < suliMa.x &&
      this.y >= 0 && this.y < suliMa.y
    );
  }
}
