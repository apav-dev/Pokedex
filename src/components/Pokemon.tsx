import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import { Colors, Typography } from '../styles';
import { formatDexNumber } from '../utils/formatDexNumber';

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
  <SafeAreaView style={styles.container}>
    <Text style={styles.pokeTitle}>{`${formatDexNumber(parseInt(id))}`}</Text>
    <Text style={styles.pokeTitle}>{name}</Text>
    <Image style={styles.pokeImage} source={{ uri: imageUrl }} />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    backgroundColor: Colors.lightSilver,
  },
  pokeImage: {
    height: 200,
    width: 200,
  },
  pokeTitle: {
    ...Typography.titleFont,
    fontSize: 39,
  },
});
