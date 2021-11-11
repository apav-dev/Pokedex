import { useNavigation } from '@react-navigation/core';
import React, { FC, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  View,
  ViewProps,
  Text,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { formatDexNumber } from '../utils/formatDexNumber';

interface IPokeTileProps extends ViewProps {
  diagonal: number;
  pokedexNumber: number;
  pokemonName: string;
  spriteUrl: string;
}

export const PokeTile: FC<IPokeTileProps> = ({
  diagonal,
  pokedexNumber,
  pokemonName,
  spriteUrl,
}) => {
  const navigation = useNavigation();

  const fadeAnimation = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      // TODO: add delay
      delay: 75 * diagonal,
    }).start();
  }, []);

  return (
    <TouchableOpacity
      onPressOut={() => navigation.navigate('PokeSummary', { pokeId: '1' })}>
      <Animated.View
        style={[
          styles.tile,
          {
            opacity: fadeAnimation,
          },
        ]}>
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
      </Animated.View>
    </TouchableOpacity>
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
    shadowOpacity: 0.7,
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
