export const heightFromDecimeters = (decimeters: number) => {
  let inches = Math.round(decimeters * 3.93701);
  const feet = Math.floor(inches / 12);
  inches = inches % 12;

  if (feet) {
    return `${feet} ft. ${inches} in.`;
  } else {
    return `${inches} in.`;
  }
};
