import { test, assert } from 'vitest';
import { nimiInsaKulupu } from '../insa/nimiAli';

test('nimi tu sama li lon ala', () => {
  const nimiAli = [
    ...nimiInsaKulupu.toki,
    ...nimiInsaKulupu.kulupu,
    ...nimiInsaKulupu.pali,
    ...nimiInsaKulupu.ijo,
  ];
  const nimiPiWanTaso = new Set();
  for (const nimi of nimiAli) {
    if (nimiPiWanTaso.has(nimi)) {
      assert.fail(`nimi '${nimi}' li tu!`);
    } else {
      nimiPiWanTaso.add(nimi);
    }
  }
});
