import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { heightFromDecimeters } from '../utils/heightFromDecimeters';
import { toProperCase } from '../utils/toProperCase';
import { weightFromHectograms } from '../utils/weightFromHectograms';
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
  const getPlainValueText = (value: string | number) => (
    <Text style={styles.statText}>{value}</Text>
  );

  const rowOne = [
    {
      label: 'Height',
      value: getPlainValueText(heightFromDecimeters(height)),
    },
    {
      label: 'Weight',
      value: getPlainValueText(weightFromHectograms(weight)),
    },
    {
      label: 'Types',
      value:
        types.length === 1
          ? getPlainValueText(toProperCase(types[0].name))
          : getPlainValueText(
              `${toProperCase(types[0].name)}, ${toProperCase(types[1].name)}`,
            ),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.genusContainer}>
        <Text style={styles.genusText}>{genus}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
      <DataRow cells={rowOne} />
      <View style={styles.statChartContainer}>
        <BaseStatChart stats={stats} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    // padding: 10,
    // borderWidth: 1,
  },
  genusContainer: {
    alignItems: 'center',
    width: width,
    marginVertical: 30,
  },
  genusText: {
    fontFamily: 'Exo2-Regular',
    fontWeight: '600',
    fontSize: 24,
  },
  statText: {
    fontFamily: 'Exo2-Regular',
    fontWeight: '400',
    fontSize: 14,
  },
  descriptionText: {
    fontFamily: 'Exo2-Regular',
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
  },
  statChartContainer: {
    alignItems: 'center',
  },
});

// blind barber
