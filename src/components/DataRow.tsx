import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Typography } from '../styles';

export type DataCell = {
  label: string;
  value?: React.ReactChild;
};

type DataRowProps = {
  cells: DataCell[];
};

export const DataRow = ({ cells }: DataRowProps): React.ReactElement => (
  <View style={[styles.container]}>
    {cells.map((cell, i) => (
      <View key={i} style={[styles.cell]}>
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
    marginVertical: 4,
    justifyContent: 'space-around',
  },
  cell: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  label: {
    ...Typography.titleFont,
  },
});
