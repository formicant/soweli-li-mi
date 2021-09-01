import Kule from './Kule';

interface LukinPiNimiAli
{
  kule: Kule;
}

interface LukinPiNimiIjo extends LukinPiNimiAli
{
  kulupu: 'ijo';
  anteTawa: 'awen' | 'poka' | 'ali';
}

interface LukinPiNimiPali extends LukinPiNimiAli
{
  kulupu: 'pali';
}

interface LukinPiNimiToki extends LukinPiNimiAli
{
  kulupu: 'toki';
}

type LukinNimi = LukinPiNimiIjo | LukinPiNimiPali | LukinPiNimiToki;
export default LukinNimi;
