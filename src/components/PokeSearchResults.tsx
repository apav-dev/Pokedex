import {
  useAnswersActions,
  useAnswersState,
} from '@yext/answers-headless-react';
import React, { FC, useState } from 'react';
import {
  ViewProps,
  StyleSheet,
  Animated,
  ActivityIndicator,
  // NativeScrollEvent,
  // NativeSyntheticEvent,
} from 'react-native';
import { PokeTile } from './PokeTile';

interface IPokeSearchResultsProps extends ViewProps {}

export const PokeSearchResults: FC<IPokeSearchResultsProps> = () => {
  // const answersActions = useAnswersActions();
  const [inSummary, setInSummary] = useState(false);
  const pokemon = useAnswersState(
    state => state.vertical.results?.verticalResults.results,
  );
  const searchLoading = useAnswersState(state => state.vertical.searchLoading);
  const answersActions = useAnswersActions();

  // const rows = pokemon ? Math.floor(pokemon?.length / 3) : 0;
  // const halfwayPoint = (116 * rows) / 2;

  // const handleOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
  //   console.log(halfwayPoint);
  //   console.log(e.nativeEvent.contentOffset.y);
  //   if (e.nativeEvent.contentOffset.y === halfwayPoint) {
  //     answersActions.setOffset(25);
  //     answersActions.executeVerticalQuery();
  //   }
  // };

  const onNavigateFromTile = (pokemonName: string) => {
    answersActions.setVerticalKey('pokemon_card');
    answersActions.setQuery(pokemonName);
    answersActions.executeVerticalQuery();
    setInSummary(true);
  };

  return (
    <Animated.ScrollView
      style={styles.container}
      contentContainerStyle={styles.tilesGrid}
      decelerationRate="fast"
      snapToInterval={116}
      // onScroll={e => handleOnScroll(e)}
      snapToAlignment="start">
      {!searchLoading && pokemon && !inSummary ? (
        pokemon.map((p, i) => (
          <PokeTile
            key={i}
            diagonal={Math.floor(i / 3) + (i % 3)}
            // pokemonName={p.rawData.name as string}
            // pokedexNumber={p.rawData.id as number}
            // spriteUrl={p.rawData.c_sprites.officialArtwork.sourceUrl as string}
            pokemon={p}
            onPressTile={onNavigateFromTile}
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
