import Im from 'immutable';
import { Lon } from './lon';
import { buildLexer, apply, expectSingleResult, expectEOF, tok, rep, alt, Parser } from 'typescript-parsec';
import { Nimi, nimiAli, nimiInsaKulupu } from './nimiAli';
import { Ijo, KulupuIjo } from './ijo';

/**
 * ma wan tan lipu Json.
 */
 export interface LipuMa
 {
   readonly nimi: string;
   readonly ma: string[];
   readonly namako?: { [sitelen: string]: string | undefined };
   // pona la, ni li { [sitelen: string]: string }. taso, ni li nasin pali pi ilo Import pi lipu Json.
 }
 
/**
 * li pilin e lipu ma tan lipu Json.
 * @param lipuMa li ma wan tan lipu Json.
 * @returns e jo ali pi ma ni.
 */
export function pilinELipuMa(lipuMa: LipuMa)
{
  // O PALI: pilin ike la, pana e nimi ma, e nanpa pi linja ike!
  
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
  
  const suliMa = new Lon(suliLinja.first()!, suliLinja.size);
  if(suliMa.x === 0)
    throw new Error('linja ma li jo e leko ala!');
  if(suliLinja.skip(1).some(ni => ni !== suliMa.x))
    throw new Error('suli pi linja ma li sama ala!');
  const ijoAli = ma
    .flatMap((linja, y) =>
      Im.Seq(linja).flatMap((leko, x) =>
        Im.Seq(leko).map(wan => ({  ...wan, lon: new Lon(x, y) }))))
    .map((ijo, nanpa) => new Ijo({ ...ijo, nanpa: nanpa }))
    .toArray();
  
  return {
    nimiMa: lipuMa.nimi,
    suliMa: suliMa,
    ijoAli: ijoAli,
  };
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
    return nimiLili as Nimi;
  else
  {
    const nimiOpen = tan.filter(ni => ni.startsWith(nimiLili));
    if(nimiOpen.size === 1)
      return nimiOpen.first()! as Nimi;
    else if(nimiOpen.isEmpty())
      throw new Error(`nimi '${nimi}' li ken open e ala!`);
    else
      throw new Error(`nimi '${nimi}' li ken open e '${nimiOpen.join("' anu '")}''!`);
  }
}

type Wan = { readonly kulupu: KulupuIjo, readonly nimi: Nimi };

const pilinPiIjoNimi = apply(
  tok(KulupuToki.Nimi),
  (toki): readonly Wan[] =>
  [{
    kulupu: 'nimi',
    nimi: panaENimi(toki.text, false),
  }]
);

const pilinPiIjoSitelen = apply(
  tok(KulupuToki.Sitelen),
  (toki): readonly Wan[] =>
  [{
    kulupu: 'sitelen',
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
