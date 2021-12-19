import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, Typography } from '../styles';
import { formatPrice } from '../utils/formatPrice';
import { DataCell, DataRow } from './DataRow';
import { PokeCard, Pricing } from './PokeCard';

export type CardPricingProps = {
  card: PokeCard;
};

export const CardPricing = ({ card }: CardPricingProps): React.ReactElement => {
  const [selectedPriceVersion, setSelectedPriceVersion] = useState(
    card.pricing.length > 0 ? card.pricing[0].version : [],
  );

  const getPricingCells = (): DataCell[] => {
    const pricing: Pricing | undefined = card.pricing.find(
      price => price.version === selectedPriceVersion,
    );

    return [
      {
        label: 'Low',
        value: (
          <Text style={styles.valueText}>{formatPrice(pricing?.low)}</Text>
        ),
      },
      {
        label: 'Mid',
        value: (
          <Text style={styles.valueText}>{formatPrice(pricing?.mid)}</Text>
        ),
      },
      {
        label: 'High',
        value: (
          <Text style={styles.valueText}>{formatPrice(pricing?.high)}</Text>
        ),
      },
      {
        label: 'Market',
        value: (
          <Text style={styles.valueText}>{formatPrice(pricing?.market)}</Text>
        ),
      },
      {
        label: 'Direct Low',
        value: (
          <Text style={styles.valueText}>
            {formatPrice(pricing?.directLow)}
          </Text>
        ),
      },
    ];
  };

  const versionPriceButton = (version: string) => (
    <Pressable
      style={styles.filterTab}
      disabled={card.pricing.length === 1 || selectedPriceVersion === version}
      onPressOut={() => setSelectedPriceVersion(version)}>
      <Text
        style={[
          styles.buttonText,
          { color: selectedPriceVersion === version ? 'blue' : 'black' },
        ]}>
        {version}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.infoContainer}>
      <Text style={styles.titleText}>TCG Pricing</Text>
      {card.pricing.length > 0 ? (
        <View>
          <View style={styles.versionRow}>
            {card.pricing.map(price => versionPriceButton(price.version))}
          </View>
          <DataRow cells={getPricingCells()} />
        </View>
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Text>No Pricing Data Available</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    marginVertical: 6,
    backgroundColor: Colors.lightSilver,
    borderRadius: 8,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.7,
  },
  titleText: {
    ...Typography.titleFont,
    fontSize: 18,
    alignSelf: 'center',
  },
  filterTab: {
    backgroundColor: Colors.silver,
    alignSelf: 'flex-start',
    padding: 2,
    borderRadius: 8,
    marginRight: 8,
    width: 80,
  },
  valueText: {
    ...Typography.bodyFont,
    fontSize: 14,
    maxWidth: 75,
  },
  buttonText: {
    ...Typography.bodyFont,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  versionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
