import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MainRoutes } from '../routing/routes';
import { MainNavigationProp, MainRouteProp } from '../routing/types';
import { PokeInfo } from './PokeInfo';
import { Pokemon } from './Pokemon';
import { Result } from '@yext/answers-core';

type BaseSummaryScreenProps = {
  navigation: MainNavigationProp<MainRoutes.PokeSummary>;
  pokemon: Result | undefined;
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

  const getPokeStat = (statName: string) =>
    pokemon?.rawData.c_stats.find(stat => stat.name === statName).baseStat;

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.backButton}
          onPressOut={() => navigation.navigate('Search')}>
          <Text style={styles.backButtonText}>{'< Search'}</Text>
        </TouchableOpacity>
      </View>
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
        types={pokemon?.rawData.c_types}
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
    fontFamily: 'Exo2-Regular',
    fontWeight: '600',
    fontSize: 16,
    color: '#006ee6',
  },
});
