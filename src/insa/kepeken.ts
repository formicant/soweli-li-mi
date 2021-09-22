import Im from "immutable";

export function monsiEKulupu<TTan extends string, TTawa>(kulupu: { [tan in TTan]: readonly TTawa[] })
{
  return Im.Seq(kulupu)
    .flatMap((tawaMute, tan) => Im.Seq(tawaMute as TTawa[]).map(tawa => [tawa, tan as TTan]))
    .toMap();
  // o pona e ni!
}
