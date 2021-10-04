import Im from 'immutable';

/**
 * nasin pi tawa e ijo.
 * (‘soto’ en ‘teje’ li nimi pi pu ala, li poka tu:
 *   soto ← · → teje)
 */
export type NasinTawa = 'sewi' | 'anpa' | 'soto' | 'teje';

interface ILon
{
  readonly x: number,
  readonly y: number;
}
// ni li ike. taso, ni li nasin pali pi ilo Im.Record:
const lonAla: ILon = { x: NaN, y: NaN };

/**
 * li jo e suli tan poka soto (x), e suli tan sewi (y).
 */
export class Lon extends Im.Record<ILon>(lonAla) implements ILon
{
  constructor(x: number, y: number)
  {
    super({ x: x, y: y });
  }
  
  /**
   * li tawa e Lon kepeken leko wan tawa nasin.
   * @param nasin li nasin tawa.
   * @returns e Lon sin.
   */
  tawa(nasin: NasinTawa)
  {
    switch(nasin)
    {
      case 'sewi': return new Lon(this.x, this.y - 1);
      case 'anpa': return new Lon(this.x, this.y + 1);
      case 'soto': return new Lon(this.x - 1, this.y);
      case 'teje': return new Lon(this.x + 1, this.y);
      default: throw new RangeError('nasin li ike!');
    }
  }
  
  /**
   * Lon ni li insa ala insa ma?
   */
  liInsaMa(suliMa: Lon)
  {
    return (
      this.x >= 0 && this.x < suliMa.x &&
      this.y >= 0 && this.y < suliMa.y
    );
  }
}
