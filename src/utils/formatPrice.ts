export const formatPrice = (price?: number): string => {
  if (price) {
    const priceStr = price.toString();
    if (!priceStr.includes('.')) {
      return `$${priceStr}.00`;
    } else {
      return `$${priceStr}`;
    }
  } else {
    return 'N/A';
  }
};
