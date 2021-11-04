import React, { FC } from 'react';
import { Image, StyleSheet, View, ViewProps, Text } from 'react-native';
import { formatDexNumber } from './utils/formatDexNumber';

interface IPokeTileProps extends ViewProps {
  pokedexNumber: number;
  pokemonName: string;
  spriteUrl: string;
}

export const PokeTile: FC<IPokeTileProps> = ({
  pokedexNumber,
  pokemonName,
  spriteUrl,
}) => {
  return (
    <View style={styles.tile}>
      <Image
        style={styles.pokeImage}
        source={{
          uri: spriteUrl,
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.font}>{formatDexNumber(pokedexNumber)}</Text>
        <Text style={styles.font}>{pokemonName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    height: 96,
    width: 96,
    color: 'black',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 4,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 6,
  },
  font: {
    fontFamily: 'Exo2-Regular',
    fontWeight: '600',
  },
  pokeImage: {
    width: 60,
    height: 60,
  },
});
