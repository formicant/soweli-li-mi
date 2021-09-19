import { Lon } from "./Lon";
import { Ijo } from "./Ijo";

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
      { x: 4, y: 2, liSitelen: true, nimi: 'soweli' },
      { x: 8, y: 2, liSitelen: true, nimi: 'kiwen' },
      { x: 3, y: 6, liSitelen: false, nimi: 'soweli' },
      { x: 4, y: 6, liSitelen: false, nimi: 'li' },
      { x: 5, y: 6, liSitelen: false, nimi: 'mi' },
      { x: 8, y: 5, liSitelen: false, nimi: 'kiwen' },
      { x: 8, y: 6, liSitelen: false, nimi: 'li' },
      { x: 8, y: 6, liSitelen: false, nimi: 'awen' },
    ]
  },
];
