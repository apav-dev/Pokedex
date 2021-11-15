const romanToNum = (roman: string): number => {
  if (roman === '') {
    return 0;
  }
  if (roman.startsWith('L')) {
    return 50 + romanToNum(roman.substr(1));
  }
  if (roman.startsWith('XL')) {
    return 40 + romanToNum(roman.substr(2));
  }
  if (roman.startsWith('X')) {
    return 10 + romanToNum(roman.substr(1));
  }
  if (roman.startsWith('IX')) {
    return 9 + romanToNum(roman.substr(2));
  }
  if (roman.startsWith('V')) {
    return 5 + romanToNum(roman.substr(1));
  }
  if (roman.startsWith('IV')) {
    return 4 + romanToNum(roman.substr(2));
  }
  if (roman.startsWith('I')) {
    return 1 + romanToNum(roman.substr(1));
  }
  return 0;
};

const romanize = (num: number): string => {
  const lookup = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  let roman = '';
  let i;
  for (i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
};

export const sortRomans = (romans: string[]): string[] =>
  romans
    .map(roman => romanToNum(roman))
    .sort((a, b) => a - b)
    .map(num => romanize(num));
