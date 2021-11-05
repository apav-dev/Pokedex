import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native';
import { AnswersHeadlessProvider } from '@yext/answers-headless-react';
import { SearchBar } from './SearchBar';
import { PokeSearchResults } from './PokeSearchResults';

// TODO:
// filter options at the top
// when clicking on tile, pull up summary of Pokemon
// tile press effect
// search bar press effect
// loading icon until pictures are all loaded
// pagination

// write guide on how to build the search for these different elements
const endpoints = {
  universalSearch:
    'https://liveapi-sandbox.yext.com/v2/accounts/me/answers/query',
  verticalSearch:
    'https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/query',
  questionSubmission:
    'https://liveapi-sandbox.yext.com/v2/accounts/me/createQuestion',
  status: 'https://answersstatus.pagescdn.com',
  universalAutocomplete:
    'https://liveapi-sandbox.yext.com/v2/accounts/me/answers/autocomplete',
  verticalAutocomplete:
    'https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/autocomplete',
  filterSearch:
    'https://liveapi-sandbox.yext.com/v2/accounts/me/answers/filtersearch',
};

const App = () => {
  return (
    <AnswersHeadlessProvider
      apiKey="55511319ffb8213b10c200d281668382"
      experienceKey="pokemon-search"
      locale="en"
      verticalKey="pokémon"
      endpoints={endpoints}>
      <ImageBackground
        source={require('./assets/images/pokeBackground.png')}
        style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <SearchBar />
            <PokeSearchResults />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </AnswersHeadlessProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#e4000f',
    flex: 1,
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
  },
});

export default App;
