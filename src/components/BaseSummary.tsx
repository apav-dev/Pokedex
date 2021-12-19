import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { MainRoutes } from '../routing/routes';
import { MainNavigationProp, MainRouteProp } from '../routing/types';
import { PokeInfo } from './PokeInfo';
import { Pokemon } from './Pokemon';
import { Result } from '@yext/answers-core';
import { BaseStats } from './BaseStatChart';
import { Typography } from '../styles';

type BaseSummaryScreenProps = {
  navigation: MainNavigationProp<MainRoutes.PokeSummary>;
  pokemon: Result;
};

export const BaseSummary = ({
  navigation,
  pokemon,
}: BaseSummaryScreenProps): React.ReactElement => {
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

  useEffect(() => {
    console.log(pokemon);
  }, []);

  const getPokeStat = (statName: string) =>
    pokemon.c_stats.find(stat => stat.name === statName).baseStat;

  return (
    <View style={styles.container}>
      <Pokemon
        id={pokemon?.id as string}
        name={pokemon?.name as string}
        imageUrl={pokemon?.c_sprites.officialArtwork.sourceUrl}
      />
      <PokeInfo
        genus={pokemon?.c_genus as string}
        description={
          pokemon?.c_pokedexDescriptions[
            pokemon?.c_pokedexDescriptions.length - 1
          ].description
        }
        height={pokemon?.c_height as number}
        weight={pokemon?.c_weight as number}
        stats={getPokeStats() as BaseStats}
        types={pokemon?.c_types}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    marginLeft: 12,
  },
  backButtonText: {
    ...Typography.titleFont,
    fontSize: 16,
    color: '#006ee6',
  },
});
