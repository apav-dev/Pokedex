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
  const cells = [
    {
      label: 'Artist',
      value: <Text>{card.artist}</Text>,
    },
    {
      label: 'Rarity',
      value: <Text>{card.rarity}</Text>,
    },
    {
      label: 'Set',
      value: <Text>{card.cardSetName}</Text>,
    },
  ];

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
      <DataRow cells={cells} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#DCDCDC',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  card: {
    flex: 1,
    width: CARD_WIDTH,
    alignItems: 'center',
  },
  //240 x 330
  cardImage: {
    width: CARD_WIDTH,
    height: 330 * (CARD_WIDTH / 240),
  },
});
