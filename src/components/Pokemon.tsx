import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { formatDexNumber } from '../utils/formatDexNumber';
import { BaseStats } from './BaseStatChart';

type PokemonProps = {
  id: string;
  name: string;
  imageUrl: string;
};

const { width, height } = Dimensions.get('window');

export const Pokemon = ({
  id,
  name,
  imageUrl,
}: PokemonProps): React.ReactElement => (
  <View style={styles.container}>
    <Image style={styles.pokeImage} source={{ uri: imageUrl }} />
    <Text style={styles.pokeTitle}>{`${formatDexNumber(parseInt(id))}`}</Text>
    <Text style={styles.pokeTitle}>{name}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    width: width,
  },
  pokeImage: {
    // flex: 1,
    height: 200,
    width: 200,
  },
  pokeTitle: {
    fontFamily: 'Exo2-Regular',
    fontWeight: '600',
    fontSize: 39,
  },
});
