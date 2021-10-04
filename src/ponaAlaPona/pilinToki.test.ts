import Im from "immutable";
import { pilinELipuMa } from '../insa/lipuMa';
import { MaIjo } from "../insa/maIjo";
import { panaENasinMusiAli } from '../insa/pilinToki';
import { tokiENasinMusi } from "../insa/nasinMusi";

test.each([
  {
    lipuMa: {
      nimi: 'nasin wan',
      ma: ['Soweli Li Mi']
    },
    nasinMusi: ['soweli li mi']
  },
  {
    lipuMa: {
      nimi: 'linja anpa en linja poka',
      ma: [
        ' .  Sow  . ',
        'Tom Li  Pin',
        ' .  Mi   . ',
      ]
    },
    nasinMusi: [
      'soweli li mi',
      'tomo li pini',
    ]
  },
  {
    lipuMa: {
      nimi: 'nasin mute lon linja wan',
      ma: ['.Kal Lon Kon En Ma Li Mol Kas Pip En Ake Li Mi En Wek.tel En Kiw Li Taw.']
    },
    nasinMusi: [
      'kala lon kon en ma li moli',
      'akesi en pipi li mi',
      'kiwen li tawa'],
  },
  // O PALI: leko wan li wile ken jo e nimi mute!
  // {
  //   lipuMa: {
  //     nimi: 'nimi mute lon leko wan',
  //     ma: ['1 2 3 4 5 6 7'],
  //     namako: {
  //       '1': '          Soweli',
  //       '2': 'Tomo      Li    ',
  //       '3': 'Li        Mi    ',
  //       '4': 'Pini  Nimi  Supa',
  //       '5': 'Kiwen     Li    ',
  //       '6': 'Li    Tawa  Moli',
  //       '7': 'Awen            ',
  //     }
  //   },
  //   nasinMusi: [
  //     'soweli li mi',
  //     'tomo li pini',
  //     'nimi li tawa',
  //     'supa li tawa',
  //     'nimi li moli',
  //     'supa li moli',
  //     'kiwen li awen',
  //   ]
  // },
])('', ({ lipuMa, nasinMusi }) =>
{
  const ma = pilinELipuMa(lipuMa);
  const lipuIjo = Im.Map(Im.Seq(ma.ijoAli).toKeyedSeq());
  const maIjo = new MaIjo(ma.suliMa, lipuIjo);
  const nasinMusiAli = panaENasinMusiAli(maIjo);
  const toki = nasinMusiAli.map(tokiENasinMusi);
  
  expect(toki.sort()).toEqual(nasinMusi.sort());
});
