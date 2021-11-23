import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { DataRow } from './DataRow';

const win = Dimensions.get('window');

const CARD_WIDTH = win.width * 0.75;

type PokeCardProps = {
  card: PokeCard;
};

type PokeCard = {
  imgSrc: string;
  artist: string;
  rarity: string;
  cardSetName: string;
  number: number;
  releaseDate: string;
  printedTotal: number;
  versionPrices: VersionPricing[];
};

type VersionPricing = {
  version: string;
  pricing: Pricing;
};

type Pricing = {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow: number;
};

export const PokeCard = ({ card }: PokeCardProps): React.ReactElement => {
  const artCells = [
    {
      label: 'Artist',
      value: <Text>{card.artist}</Text>,
    },
    {
      label: 'Rarity',
      value: <Text>{card.rarity}</Text>,
    },
  ];

  const setCells = [
    {
      label: 'Set',
      value: <Text style={styles.valueText}>{card.cardSetName}</Text>,
    },
    {
      label: 'Set No.',
      value: (
        <Text
          style={
            styles.valueText
          }>{`${card.number}/${card.printedTotal}`}</Text>
      ),
    },
    {
      label: 'Release Date',
      value: <Text style={styles.valueText}>{card.releaseDate}</Text>,
    },
  ];

  const getPricingCells = (version: string) =>
    Object.entries(
      card.versionPrices.find(versionPrice => versionPrice.version === version)
        ?.pricing,
    ).map(entry => ({
      label: entry[0],
      value: <Text style={styles.valueText}>{entry[1]}</Text>,
    }));

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image
          style={styles.cardImage}
          source={{
            uri: card.imgSrc,
          }}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.titleText}>Card Info</Text>
        <DataRow cells={setCells} />
        <DataRow cells={artCells} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.titleText}>TCG Pricing</Text>
        <DataRow cells={getPricingCells('Holofoil')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#C0C0C0',
    padding: 12,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  infoContainer: {
    marginVertical: 6,
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.7,
  },
  card: {
    flex: 1,
    width: CARD_WIDTH,
    alignItems: 'center',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.7,
    marginBottom: 6,
  },
  //240 x 330
  cardImage: {
    width: CARD_WIDTH,
    height: 330 * (CARD_WIDTH / 240),
  },
  titleText: {
    fontFamily: 'Exo2-Regular',
    fontWeight: '600',
    fontSize: 18,
    alignSelf: 'center',
  },
  valueText: {
    fontFamily: 'Exo2-Regular',
    fontWeight: '400',
    fontSize: 14,
  },
});
