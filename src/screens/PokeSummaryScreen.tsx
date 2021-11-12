import { useAnswersState } from '@yext/answers-headless-react';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BaseStats } from '../components/BaseStatChart';
import { PokeInfo } from '../components/PokeInfo';
import { Pokemon } from '../components/Pokemon';
import { MainRoutes } from '../routing/routes';
import { MainNavigationProp, MainRouteProp } from '../routing/types';

type PokeSummaryScreenProps = {
  navigation: MainNavigationProp<MainRoutes.PokeSummary>;
  route: MainRouteProp<MainRoutes.PokeSummary>;
};

export const PokeSummaryScreen = ({
  navigation,
  route,
}: PokeSummaryScreenProps): React.ReactElement => {
  const { pokeId } = route.params;

  const pokemon = useAnswersState(
    state => state.vertical.results?.verticalResults.results,
  )?.find(result => result.id === pokeId);

  const getPokeStats = () => {
    if (pokemon) {
      return {
        hp: getPokeStat('hp'),
        attack: getPokeStat('attack'),
        defense: getPokeStat('defense'),
        spAttack: getPokeStat('special-attack'),
        spDefense: getPokeStat('special-defense'),
        speed: getPokeStat('speed'),
      };
    }
  };

  const getPokeStat = (statName: string) =>
    pokemon?.rawData.c_stats.find(stat => stat.name === statName).baseStat;

  return (
    <SafeAreaView style={styles.container}>
      <Pokemon
        id={pokemon?.id as string}
        name={pokemon?.rawData.name as string}
        imageUrl={pokemon?.rawData.c_sprites.officialArtwork.sourceUrl}
      />
      <PokeInfo
        genus={pokemon?.rawData.c_genus as string}
        description={
          pokemon?.rawData.c_pokedexDescriptions[
            pokemon?.rawData.c_pokedexDescriptions.length - 1
          ].description
        }
        height={pokemon?.rawData.c_height as number}
        weight={pokemon?.rawData.c_weight as number}
        stats={getPokeStats() as BaseStats}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pokeImage: {
    height: 60,
    width: 60,
  },
});
