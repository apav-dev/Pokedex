import { useAnswersState } from '@yext/answers-headless-react';
import React, { FC } from 'react';
import { ViewProps, StyleSheet, Text, View, Animated } from 'react-native';
import { PokeTile } from './src/PokeTile';

interface IPokeSearchResults extends ViewProps {}

export const PokeSearchResults: FC<IPokeSearchResults> = () => {
  const verticalSearchResults = useAnswersState(state =>
    state.vertical.results?.verticalResults.results.reduce(
      (resultArray, item, index) => {
        const chunkIndex = Math.floor(index / 3);

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []; // start a new chunk
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
      },
      [],
    ),
  );

  const renderTileRow = pokeChunks => (
    <View style={styles.rowStyle}>
      {pokeChunks.map(pokemon => (
        <PokeTile
          pokemonName={pokemon.rawData.name as string}
          pokedexNumber={pokemon.rawData.id as number}
          spriteUrl={
            pokemon.rawData.c_sprites.officialArtwork.sourceUrl as string
          }
        />
      ))}
    </View>
  );

  return (
    <Animated.ScrollView>
      {verticalSearchResults ? (
        verticalSearchResults.map(chunk => renderTileRow(chunk))
      ) : (
        <Text>Loading</Text>
      )}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  rowStyle: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
});

/* <PokeTile
  pokemonName={'Bulbasaur'}
  pokedexNumber={1}
  spriteUrl={
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
  }
/>
<PokeTile
  pokemonName={'Ivysaur'}
  pokedexNumber={2}
  spriteUrl={
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png'
  }
/>
<PokeTile
  pokemonName={'Venusaur'}
  pokedexNumber={3}
  spriteUrl={
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png'
  }
/> */
