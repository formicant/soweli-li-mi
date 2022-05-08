import Im from 'immutable';
import { apply, expectEOF, str, tok, seq, rep, alt, kmid, Parser, ParserOutput } from 'typescript-parsec';
import { MaIjo } from './maIjo';
import { panaELinjaTokiAli, Toki } from './toki';
import { Seme, LiSeme, NasinMusi } from './nasinMusi';

/**
 * li lukin e nimi ali lon ma ijo li pilin e nasin musi ali li pana e ona.
 * @param maIjo li ijo ali insa kulupu lon.
 * @returns nasin musi ali pi ma ni.
 */
 export function panaENasinMusiAli(maIjo: MaIjo): readonly NasinMusi[]
 {
   const tokiAli = panaELinjaTokiAli(maIjo);
   const nasinAli = Im.Seq(tokiAli)
     .map(linja => expectEOF(pilin.parse(linja)))
     .flatMap(panaENasinMusiLinja);
   
   return nasinAli.toArray();
 }
 
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

const pilinLonSeme = apply(
  muteEnSinpin(alt(pilinIjo, pilinKulupu), pilinLon),
  ([mute, lon]) =>
  ({
    seme: Im.Seq(mute).map(ni => ni.text as Seme).toSet(),
    nanpaIjo: Im.Seq(mute).map((ni: Toki) => ni.nanpaIjo!)
      .concat(Im.Seq(lon).map((ni: Toki) => ni.nanpaIjo!))
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
    seq(pilinSeme, pilinLonSeme),
    ([seme, lonSeme]) =>
    ({
      seme: seme.seme,
      lonSeme: lonSeme.seme,
      nanpaIjo: seme.nanpaIjo.union(lonSeme.nanpaIjo)
    })
  )
);

const pilinPiNasinMusi = apply(
  seq(pilinLeko, pilinLi, alt(pilinPali, pilinIjo)),
  ([leko, li, liSeme]) =>
  ({
    seme: leko.seme,
    lonSeme: leko.lonSeme,
    liSeme: Im.Set.of(liSeme.text as LiSeme),
    nanpaIjo: Im.Set.of((li as Toki).nanpaIjo!, (liSeme as Toki).nanpaIjo!).union(leko.nanpaIjo)
  } as NasinMusi)
);

const pilin = kmid(pilinJaki, pilinPiNasinMusi, pilinJaki);

function panaENasinMusiLinja(linja: ParserOutput<string, NasinMusi>)
{
  const nasinLinja = linja.successful
    ? linja.candidates.map(ken => ken.result)
    : [];
  return Im.Seq(nasinLinja)
    .filterNot(nasinNi =>
      nasinLinja.some(nasinAnte => liLiliPiNasinMusiAnte(nasinNi.nanpaIjo, nasinAnte.nanpaIjo)));
}

function liLiliPiNasinMusiAnte(nanpaIjoMuteNi: Im.Set<number>, nanpaIjoMuteAnte: Im.Set<number>)
{
  return nanpaIjoMuteNi.size < nanpaIjoMuteAnte.size &&
    nanpaIjoMuteNi.isSubset(nanpaIjoMuteAnte);
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

function muteEnSinpin<TKulupu, TMute, TSinpin>(
  pilinMute: Parser<TKulupu, TMute>,
  pilinSinpin: Parser<TKulupu, TSinpin>
): Parser<TKulupu, [TMute[], TSinpin[]]>
{
  return apply(
    rep(seq(pilinSinpin, pilinMute)),
    (tu) =>
    [
      tu.map(([sinpin, mute]) => mute),
      tu.map(([sinpin, mute]) => sinpin)
    ]
  );
}
