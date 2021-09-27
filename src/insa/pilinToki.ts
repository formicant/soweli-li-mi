import Im from 'immutable';
import { apply, expectEOF, str, tok, seq, rep, alt, kmid, Parser } from 'typescript-parsec';
import { LonIjo } from './lonIjo';
import { Lon } from './lon';
import { panaETokiAli, Toki } from './toki';
import { Seme, LiSeme, NasinMusi, tokiENasinMusi } from './nasinMusi';

const pilinJaki = rep(alt(tok('ala'), tok('ijo'), tok('kulupu'), tok('toki'), tok('pali')));

const pilinIjo    = tok('ijo'    as const);
const pilinKulupu = tok('kulupu' as const);
const pilinPali   = tok('pali'   as const);

const pilinLi  = str<'toki'>('li');
const pilinEn  = str<'toki'>('en');
const pilinLon = str<'toki'>('lon');
//const pilinAla = str<'toki'>('ala');

const pilinSeme = apply(
  muteEnInsa(alt(pilinIjo, pilinKulupu), pilinEn),
  ([mute, insa]) =>
  ({
    seme: Im.Seq(mute).map(ni => ni.text as Seme).toSet(),
    nanpaIjo: Im.Seq(mute).map((ni: Toki) => ni.nanpaIjo!)
      .concat(Im.Seq(insa).map((ni: Toki) => ni.nanpaIjo!))
      .toSet()
  } as const)
);

const pilinLeko = alt(
  apply(
    pilinSeme,
    ({ nanpaIjo, seme }) =>
    ({
      seme: seme,
      lonSeme: Im.Set.of('ali' as Seme),
      nanpaIjo: nanpaIjo
    })
  ),
  apply(
    seq(pilinSeme, pilinLon, pilinSeme),
    ([seme, lon, lonSeme]) =>
    ({
      seme: seme.seme,
      lonSeme: lonSeme.seme,
      nanpaIjo: Im.Set.of((lon as Toki).nanpaIjo!).union(seme.nanpaIjo, lonSeme.nanpaIjo)
    })
  )
);

const pilinNasinMusi = apply(
  seq(pilinLeko, pilinLi, alt(pilinPali, pilinIjo)),
  ([leko, li, liSeme]) =>
  ({
    seme: leko.seme,
    lonSeme: leko.lonSeme,
    liSeme: Im.Set.of(liSeme.text as LiSeme),
    nanpaIjo: Im.Set.of((li as Toki).nanpaIjo!, (liSeme as Toki).nanpaIjo!).union(leko.nanpaIjo)
  } as NasinMusi)
);

const pilin = kmid(pilinJaki, pilinNasinMusi, pilinJaki);

export function panaETokiPiNasinMusi(suli: Lon, lonIjo: LonIjo): string[]
{
  const tokiAli = panaETokiAli(suli, lonIjo);
  const nasinAli = tokiAli
    .map(linja => expectEOF(pilin.parse(linja)))
    .filter(linja => linja.successful)
    .flatMap(linja => linja.successful
      ? Im.Seq(linja.candidates).map(ken => ken.result).cacheResult().update(wekaENasinMusiInsa)
      : undefined as never)
    .map(ken => tokiENasinMusi(ken))
    .toArray();
  
  return nasinAli;
}

function wekaENasinMusiInsa(nasinMute: Im.Seq.Indexed<NasinMusi>)
{
  return nasinMute
    .filterNot(nasinNi =>
      nasinMute.some(nasinAnte =>
        nasinAnte !== nasinNi && nasinNi.nanpaIjo.isSubset(nasinAnte.nanpaIjo)));
}

function muteEnInsa<TKulupu, TMute, TInsa>(
  pilinMute: Parser<TKulupu, TMute>,
  pilinInsa: Parser<TKulupu, TInsa>
): Parser<TKulupu, [TMute[], TInsa[]]>
{
  return apply(
    seq(pilinMute, rep(seq(pilinInsa, pilinMute))),
    ([lawa, sijelo]) =>
    [
      [lawa].concat(sijelo.map(([insa, mute]) => mute)),
      sijelo.map(([insa, mute]) => insa)
    ]
  );
}
