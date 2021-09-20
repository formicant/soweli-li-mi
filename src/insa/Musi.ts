import Im from "immutable";
import { LipuMa } from "./LipuMa";
import { NasinTawa, Tawa, tawaOpen } from "./Tawa";

export interface Musi
{
  readonly lipuMa: LipuMa;
  readonly tenpo: Im.List<Tawa>;
  readonly tenpoNi: number;
}

export function openEMusi(lipuMa: LipuMa): Musi
{
  return {
    lipuMa: lipuMa,
    tenpo: Im.List.of(tawaOpen(lipuMa.ijoAli)),
    tenpoNi: 0,
  };
}

export function tenpoMonsi(musi: Musi, ali: boolean): Musi
{
  if(musi.tenpoNi > 0)
    return { ...musi, tenpoNi: ali ? 0 : musi.tenpoNi - 1 };
  else
    return musi;
}

export function tenpoSinpin(musi: Musi, ali: boolean): Musi
{
  if(musi.tenpoNi < musi.tenpo.size - 1)
    return { ...musi, tenpoNi: ali ? musi.tenpo.size - 1 : musi.tenpoNi - 1 };
  else
    return musi;
}

export function tawa(musi: Musi, nasin: NasinTawa): Musi
{
  return musi; // O PALI!
}
