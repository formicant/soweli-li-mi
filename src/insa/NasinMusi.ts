import Im from 'immutable';
import { apply, expectEOF, str, tok, seq, rep, alt, kmid, opt } from 'typescript-parsec';
import { LonIjo } from './LonIjo';
import { Lon } from './Lon';
import { panaETokiAli } from './toki';

const pilinJaki = rep(alt(tok('ala'), tok('ijo'), tok('kulupu'), tok('toki'), tok('pali')));

const pilinIjo    = tok('ijo'    as const);
const pilinKulupu = tok('kulupu' as const);
const pilinPali   = tok('pali'   as const);

const pilinLi  = str<'toki'>('li');
const pilinAla = str<'toki'>('ala');
const pilinLon = str<'toki'>('lon');

const pilinSeme = alt(pilinIjo, pilinKulupu);
const pilinLonSeme = seq(pilinLon, pilinSeme, opt(pilinAla));
const pilinLeko = alt(pilinSeme, seq(pilinSeme, pilinLonSeme));

const pilinNasinMusi = seq(
  pilinLeko,
  pilinLi,
  alt(pilinPali, pilinIjo),
  opt(pilinAla)
);

const pilin = kmid(pilinJaki, pilinNasinMusi, pilinJaki);

export function test(suli: Lon, lonIjo: LonIjo): any
{
  const tokiAli = panaETokiAli(suli, lonIjo);
  const nasinAli = tokiAli
    .map(linja => expectEOF(pilin.parse(linja)))
    .filter(linja => linja.successful)
    .flatMap(linja => linja.successful ? linja.candidates : undefined as never)
    .map(ken => ken.result.map(t => ({ ...t, next: undefined })))
    .toArray();
  
  return nasinAli;
}
