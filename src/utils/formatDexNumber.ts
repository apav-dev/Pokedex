export const formatDexNumber = (dexNumber: number) => {
  const dexNumberStr = dexNumber.toString();

  if (dexNumberStr.length === 3) {
    return `No. ${dexNumberStr}`;
  } else if (dexNumberStr.length === 2) {
    return `No. 0${dexNumberStr}`;
  } else {
    return `No. 00${dexNumberStr}`;
  }
};
