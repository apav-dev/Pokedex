import { useAnswersState } from '@yext/answers-headless-react';
import React, { FC } from 'react';
import {
  ViewProps,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { PokeTile } from './PokeTile';

interface IPokeSearchResults extends ViewProps {}

export const PokeSearchResults: FC<IPokeSearchResults> = () => {
  const pokemon = useAnswersState(
    state => state.vertical.results?.verticalResults.results,
  );
  const searchLoading = useAnswersState(state => state.vertical.searchLoading);

  return (
    <Animated.ScrollView
      style={styles.container}
      contentContainerStyle={styles.tilesGrid}
      decelerationRate="fast"
      snapToInterval={116}
      snapToAlignment="start">
      {!searchLoading && pokemon ? (
        // verticalSearchResults.map((chunk, i) => renderTileRow(chunk, i))
        pokemon.map((p, i) => (
          <PokeTile
            key={i}
            pokemonName={p.rawData.name as string}
            pokedexNumber={p.rawData.id as number}
            spriteUrl={p.rawData.c_sprites.officialArtwork.sourceUrl as string}
          />
        ))
      ) : (
        <ActivityIndicator style={styles.spinner} size="large" />
      )}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tilesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  rowStyle: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  spinner: {
    alignItems: 'center',
    marginTop: 50,
  },
});
