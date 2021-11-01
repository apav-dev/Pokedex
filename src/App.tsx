/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {AnswersHeadlessProvider} from '@yext/answers-headless-react';
import {PokeTile} from './PokeTile';

// TODO:
// red background with search bar and filter options at the top
// rows of tiles, tile representing one pokemon. Each will have front sprite, name, and number
// when clicking on tile, pull up summary of Pokemon
// write guide on how to build the search for these different elements

const App = () => {
  return (
    <AnswersHeadlessProvider
      apiKey="55511319ffb8213b10c200d281668382"
      experienceKey="pokemon-search"
      locale="en"
      verticalKey="people">
      <SafeAreaView style={styles.backgroundStyle}>
        <View style={styles.backgroundStyle}>
          <View style={styles.rowStyle}>
            <PokeTile
              pokemonName={'Bulbasaur'}
              pokedexNumber={1}
              spriteUrl={
                'https://a.mktgcdn.com/p-sandbox/cjPY2LA7X6kdg1owadJXaRVduTye-RtgZuIV7TiV6dg/196x196.png'
              }
            />
            <PokeTile
              pokemonName={'Ivysaur'}
              pokedexNumber={2}
              spriteUrl={
                'https://a.mktgcdn.com/p-sandbox/ggE0J65O8ygRf33szuIZ4_9IZd1XaHGUk2KMVTkrfqU/196x196.png'
              }
            />
            <PokeTile
              pokemonName={'Venusaur'}
              pokedexNumber={3}
              spriteUrl={
                'https://a.mktgcdn.com/p-sandbox/EG0AQKp3X5WHFwbDDd1Kuu8sliIV9ei9QUHgyu8O-OQ/196x196.png'
              }
            />
          </View>
        </View>
      </SafeAreaView>
    </AnswersHeadlessProvider>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#e4000f',
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  rowStyle: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});

export default App;
