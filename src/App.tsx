import React from 'react';
import { AnswersHeadlessProvider } from '@yext/answers-headless-react';
import MainNavigation from './routing/MainNavigation';

// TODO:
// pagination

export type RootStackParamsList = {
  SearchScreen: undefined;
  PokeSummaryScreen: { pokeId: string };
};

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
      <MainNavigation />
    </AnswersHeadlessProvider>
  );
};

export default App;
