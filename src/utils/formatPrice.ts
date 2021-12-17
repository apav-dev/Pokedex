export const formatPrice = (priceStr: string) => {
  if (!priceStr.includes('.')) {
    return `$${priceStr}.00`;
  } else {
    return `$${priceStr}`;
  }
};
