import { PokeCard } from '../components/PokeCard';

export const getCardFromResult = (result: any): PokeCard => {
  const rawData = result.rawData;

  let pokeCard: PokeCard = {
    imgSrc: rawData.c_smallImage?.sourceUrl,
    artist: rawData.c_artist || 'N/A',
    rarity: rawData.c_rarity,
    cardSetName: rawData.c_cardSet?.name || 'N/A',
    number: rawData.c_number,
    printedTotal: rawData.c_cardSet?.printedTotal || 'N/A',
    releaseDate: rawData.c_cardSet?.releaseDate,
    pricing: [],
  };

  if (rawData.c_normalPricing) {
    pokeCard.pricing.push({
      version: 'Normal',
      low: rawData.c_normalPricing.low,
      mid: rawData.c_normalPricing.mid,
      high: rawData.c_normalPricing.high,
      market: rawData.c_normalPricing.market,
      directLow: rawData.c_normalPricing.directLow,
    });
  }

  if (rawData.c_holofoilPricing) {
    pokeCard.pricing.push({
      version: 'Holofoil',
      low: rawData.c_holofoilPricing.low,
      mid: rawData.c_holofoilPricing.mid,
      high: rawData.c_holofoilPricing.high,
      market: rawData.c_holofoilPricing.market,
      directLow: rawData.c_holofoilPricing.directLow,
    });
  }

  if (rawData.c_reverseHolofoilPricing) {
    pokeCard.pricing.push({
      version: 'Reverse Holofoil',
      low: rawData.c_reverseHolofoilPricing.low,
      mid: rawData.c_reverseHolofoilPricing.mid,
      high: rawData.c_reverseHolofoilPricing.high,
      market: rawData.c_reverseHolofoilPricing.market,
      directLow: rawData.c_reverseHolofoilPricing.directLow,
    });
  }

  if (rawData.c_1stEditionHolofoilPricing) {
    pokeCard.pricing.push({
      version: '1st Edition Holofoil',
      low: rawData.c_1stEditionHolofoilPricing.low,
      mid: rawData.c_1stEditionHolofoilPricing.mid,
      high: rawData.c_1stEditionHolofoilPricing.high,
      market: rawData.c_1stEditionHolofoilPricing.market,
      directLow: rawData.c_1stEditionHolofoilPricing.directLow,
    });
  }

  if (rawData.c_1stEditionNormalPricing) {
    pokeCard.pricing.push({
      version: '1st Edition Normal',
      low: rawData.c_1stEditionNormalPricing.low,
      mid: rawData.c_1stEditionNormalPricing.mid,
      high: rawData.c_1stEditionNormalPricing.high,
      market: rawData.c_1stEditionNormalPricing.market,
      directLow: rawData.c_1stEditionNormalPricing.directLow,
    });
  }

  return pokeCard;
};
