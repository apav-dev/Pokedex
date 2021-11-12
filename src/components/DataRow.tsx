import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export type DataCell = {
  label: string;
  value: React.ReactChild;
};

type DataRowProps = {
  cells: DataCell[];
};

export const DataRow = ({ cells }: DataRowProps): React.ReactElement => (
  <View style={styles.container}>
    {cells.map(cell => (
      <View style={[styles.cell, { width: width / cells.length }]}>
        <Text style={styles.label}>{cell.label}</Text>
        {cell.value}
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  label: {
    fontFamily: 'Exo2-Regular',
    fontWeight: '600',
  },
});
