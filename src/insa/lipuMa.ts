import { Lon } from "./lon";
import { Ijo } from "./ijo";

export interface LipuMa
{
  readonly nimi: string;
  readonly suli: Lon;
  readonly ijoAli: Ijo[];
}

export const lipuMaAli: LipuMa[] =
[
  {
    nimi: 'ma pona',
    suli: { x: 15, y: 10 },
    ijoAli:
    [
      { x: 2, y: 2, liSitelen: true, nimi: 'soweli' },
      { x: 6, y: 3, liSitelen: true, nimi: 'kala' },
      { x: 8, y: 1, liSitelen: true, nimi: 'kiwen' },
      { x: 1, y: 7, liSitelen: false, nimi: 'soweli' },
      { x: 2, y: 6, liSitelen: false, nimi: 'en' },
      { x: 3, y: 6, liSitelen: false, nimi: 'kala' },
      { x: 4, y: 6, liSitelen: false, nimi: 'li' },
      { x: 5, y: 6, liSitelen: false, nimi: 'mi' },
      { x: 8, y: 5, liSitelen: false, nimi: 'kiwen' },
      { x: 8, y: 6, liSitelen: false, nimi: 'li' },
      { x: 8, y: 7, liSitelen: false, nimi: 'awen' },
      { x: 11, y: 3, liSitelen: false, nimi: 'nimi' },
      { x: 12, y: 3, liSitelen: false, nimi: 'li' },
      { x: 13, y: 3, liSitelen: false, nimi: 'tawa' },
    ]
  },
];
