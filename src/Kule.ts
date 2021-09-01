type Hex =
  '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' |
  'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

type Kule = `#${Hex}${Hex}${Hex}`
// O PALI: nasin ante mute pi toki e kule

export default Kule;