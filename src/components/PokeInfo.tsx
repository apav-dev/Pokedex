import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { BaseStatChart, BaseStats } from './BaseStatChart';
import { DataRow } from './DataRow';

const { width, _height } = Dimensions.get('window');

type PokeInfoProps = {
  genus: string;
  description: string;
  height: number;
  weight: number;
  types: any;
  stats: BaseStats;
};

export const PokeInfo = ({
  genus,
  description,
  height,
  weight,
  types,
  stats,
}: PokeInfoProps): React.ReactElement => {
  const getPlainValueText = (value: string | number) => <Text>{value}</Text>;

  const rowOne = [
    {
      label: 'Height',
      value: getPlainValueText(height),
    },
    {
      label: 'Weight',
      value: getPlainValueText(weight),
    },
    {
      label: 'Types',
      value: getPlainValueText('Grass'),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.genusContainer}>
        <Text style={styles.genusText}>{genus}</Text>
      </View>
      <DataRow cells={rowOne} />
      <BaseStatChart stats={stats} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
  },
  genusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    width: width,
  },
  genusText: {
    fontFamily: 'Exo2-Regular',
    fontWeight: '600',
    fontSize: 24,
  },
  infoContainer: {
    flex: 6,
  },
});

// blind barber
