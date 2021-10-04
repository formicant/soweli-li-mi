import Im from "immutable";

/**
 * li pali e lukin monsi tan lukin kulupu.
 * @param lukin li lukin tan ijo pi nanpa wan tawa kulupu pi ijo pi nanpa tu.
 * @returns e lukin tan ijo pi nanpa tu tawa ijo pi nanpa wan.
 */
export function monsiELukinKulupu<TWan extends string, TTu>(lukin: { [tan in TWan]: readonly TTu[] })
{
  return Im.Seq(lukin)
    .flatMap((tawaMute, tan) => Im.Seq(tawaMute as readonly TTu[]).map(tawa => [tawa, tan as TWan]))
    .toMap();
}
