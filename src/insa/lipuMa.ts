import Im from 'immutable';
import { buildLexer, apply, expectSingleResult, expectEOF, tok, rep, alt, Parser } from 'typescript-parsec';
import { nimiAli, nimiInsaKulupu } from './nimiAli';
import { Ijo } from './ijo';

interface LipuMa
{
  readonly nimi: string;
  readonly ma: string[];
  readonly namako?: { [sitelen: string]: string | undefined };
}

enum KulupuToki { Nimi, Sitelen, Namako, Kon, Insa }

const mamaToki = buildLexer<KulupuToki>([
  [true,  /^[A-Z][A-Za-z]*/g,      KulupuToki.Nimi   ],
  [true,  /^[a-z]+/g,              KulupuToki.Sitelen],
  [true,  /^[^A-Za-z.\s][^.\s]*/g, KulupuToki.Namako ],
  [true,  /^\./g,                  KulupuToki.Kon    ],
  [false, /^\s+/g,                 KulupuToki.Insa   ],
]);

const nimiNimi = Im.Set<string>(nimiAli);
const nimiSitelen = Im.Set<string>(nimiInsaKulupu['ijo']);

function panaENimi(nimi: string, liSitelen: boolean)
{
  const nimiLili = nimi.toLowerCase();
  const tan = liSitelen ? nimiSitelen : nimiNimi;
  if(tan.contains(nimiLili))
    return nimiLili;
  else
  {
    const nimiOpen = tan.filter(ni => ni.startsWith(nimiLili));
    if(nimiOpen.size === 1)
      return nimiOpen.first()!;
    else if(nimiOpen.isEmpty())
      throw new Error(`nimi '${nimi}' li ken open e ala!`);
    else
      throw new Error(`nimi '${nimi}' li ken open e '${nimiOpen.join("' anu '")}''!`);
  }
}

type Wan = { readonly liSitelen: boolean, readonly nimi: string };

const pilinPiIjoNimi = apply(
  tok(KulupuToki.Nimi),
  (toki): readonly Wan[] =>
  [{
    liSitelen: false,
    nimi: panaENimi(toki.text, false),
  }]
);

const pilinPiIjoSitelen = apply(
  tok(KulupuToki.Sitelen),
  (toki): readonly Wan[] =>
  [{
    liSitelen: true,
    nimi: panaENimi(toki.text, true),
  }]
);

const pilinKon = apply(
  tok(KulupuToki.Kon),
  (toki): readonly Wan[] => []
);
  
const pilinPiLinjaNamako = rep(alt(pilinPiIjoNimi, pilinPiIjoSitelen));

function pilin<T>(pilinLinja: Parser<KulupuToki, T>, linja: string)
{
  return expectSingleResult(expectEOF(pilinLinja.parse(mamaToki.parse(linja))))
}

export function pilinELipuMa(lipuMa: LipuMa)
{
  const namakoAli = lipuMa.namako !== undefined
    ? Im.Map(lipuMa.namako).map(linja => pilin(pilinPiLinjaNamako, linja as string).flat())
    : Im.Map<string, Wan[]>();

  const pilinPiIjoNamako = apply(
    tok(KulupuToki.Namako),
    (toki): readonly Wan[] =>
    {
      const namako = namakoAli.get(toki.text);
      if(namako !== undefined)
        return namako;
      else
        throw new Error(`namako ${toki.text} li lon ala!`);
    }
  );
  const pilinPiLinjaMa = rep(alt(pilinPiIjoNimi, pilinPiIjoSitelen, pilinPiIjoNamako, pilinKon));
  
  const ma = Im.Seq(lipuMa.ma)
    .map(linja => pilin(pilinPiLinjaMa, linja))
    .cacheResult();
  
  const suliLinja = ma.map(linja => linja.length).toList();
  if(suliLinja.size === 0)
    throw new Error('ma li jo e linja ala!');
  
  const suli = { x: suliLinja.first()!, y: suliLinja.size };
  if(suli.x === 0)
    throw new Error('linja ma li jo e leko ala!');
  if(suliLinja.skip(1).some(ni => ni !== suli.x))
    throw new Error('suli pi linja ma li sama ala!');
  
  const ijoAli = ma
    .flatMap((linja, y) =>
      Im.Seq(linja).flatMap((leko, x) =>
        Im.Seq(leko).map(wan =>
          ({
            x: x,
            y: y,
            ...wan,
          } as Ijo))))
    .toArray();
  
  return {
    nimiMa: lipuMa.nimi,
    suliMa: suli,
    ijoAli: ijoAli,
  };
}
