import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { DataRow } from './DataRow';
import { CardPricing } from './CardPricing';

const win = Dimensions.get('window');

const CARD_WIDTH = win.width * 0.75;

type PokeCardProps = {
  card: PokeCard;
  loading: boolean;
};

export type PokeCard = {
  imgSrc: string;
  artist: string;
  rarity: string;
  cardSetName: string;
  number: string;
  releaseDate: string;
  printedTotal: string;
  pricing: Pricing[];
};

export type Pricing = {
  version: string;
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow: number;
};

export const PokeCard = ({
  card,
  loading,
}: PokeCardProps): React.ReactElement => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        {!loading ? (
          <Image
            style={styles.cardImage}
            source={{
              uri: card.imgSrc,
            }}
          />
        ) : (
          <ActivityIndicator size="large" />
        )}
      </View>
      {!loading && (
        <View>
          <View style={styles.infoContainer}>
            <Text style={styles.titleText}>Card Info</Text>
            <DataRow
              cells={[
                {
                  label: 'Set',
                  value: (
                    <Text style={styles.valueText}>{card.cardSetName}</Text>
                  ),
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
                  value: (
                    <Text style={styles.valueText}>{card.releaseDate}</Text>
                  ),
                },
              ]}
            />
            <DataRow
              cells={[
                {
                  label: 'Artist',
                  value: <Text>{card.artist}</Text>,
                },
                {
                  label: 'Rarity',
                  value: <Text>{card.rarity}</Text>,
                },
              ]}
            />
          </View>
          {<CardPricing card={card} />}
        </View>
      )}
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
    // height: 330,
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
    maxWidth: 75,
  },
});
