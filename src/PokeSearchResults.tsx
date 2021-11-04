import { useAnswersState } from '@yext/answers-headless-react';
import React, { FC } from 'react';
import { ViewProps, StyleSheet, Text, View, Animated } from 'react-native';
import { PokeTile } from './PokeTile';

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

  const searchLoading = useAnswersState(state => state.vertical.searchLoading);

  const renderTileRow = (pokeChunks, key) => (
    <View key={key} style={styles.rowStyle}>
      {pokeChunks.map((pokemon, i) => (
        <PokeTile
          key={i}
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
    <Animated.ScrollView style={styles.container}>
      {!searchLoading ? (
        verticalSearchResults.map((chunk, i) => renderTileRow(chunk, i))
      ) : (
        <Text>Loading</Text>
      )}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 50,bu
  },
  rowStyle: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
});
