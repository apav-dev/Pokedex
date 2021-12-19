import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Colors, Typography } from '../styles';
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
      <View style={styles.baseInfoContainer}>
        <View style={styles.genusContainer}>
          <Text style={styles.genusText}>{genus}</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
        <DataRow cells={rowOne} />
      </View>
      <View style={styles.statChartContainer}>
        <BaseStatChart stats={stats} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: Colors.lightSilver,
    // padding: 10,
    // borderWidth: 1,
  },
  baseInfoContainer: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    borderRadius: 8,
    borderWidth: 2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.7,
  },
  genusContainer: {
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 40,
  },
  genusText: {
    ...Typography.titleFont,
    fontSize: 24,
  },
  statText: {
    ...Typography.bodyFont,
    fontSize: 14,
  },
  descriptionText: {
    ...Typography.bodyFont,
    fontSize: 14,
    textAlign: 'center',
  },
  statChartContainer: {
    alignItems: 'center',
  },
});

// blind barber
