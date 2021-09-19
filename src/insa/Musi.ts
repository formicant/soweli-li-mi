import { List } from "immutable";
import { LipuMa } from "./LipuMa";
import { NasinTawa, Tawa, tawaOpen } from "./Tawa";

export interface Musi
{
  readonly lipuMa: LipuMa;
  readonly tenpo: List<Tawa>;
  readonly tenpoNi: number;
}

export function openEMusi(lipuMa: LipuMa): Musi
{
  return {
    lipuMa: lipuMa,
    tenpo: List.of(tawaOpen(lipuMa.ijoAli)),
    tenpoNi: 0,
  };
}

export function tenpoOpen(musi: Musi): Musi
{
  if(musi.tenpoNi > 0)
    return { ...musi, tenpoNi: 0 };
  else
    return musi;
}

export function tenpoMonsi(musi: Musi): Musi
{
  if(musi.tenpoNi > 0)
    return { ...musi, tenpoNi: musi.tenpoNi - 1 };
  else
    return musi;
}

export function tenpoSinpin(musi: Musi): Musi
{
  if(musi.tenpoNi < musi.tenpo.size - 1)
    return { ...musi, tenpoNi: musi.tenpoNi - 1 };
  else
    return musi;
}

export function tenpoPini(musi: Musi): Musi
{
  if(musi.tenpoNi < musi.tenpo.size - 1)
    return { ...musi, tenpoNi: musi.tenpo.size - 1 };
  else
    return musi;
}

export function tawa(musi: Musi, nasin: NasinTawa): Musi
{
  return musi; // O PALI!
}
