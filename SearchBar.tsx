import {
  useAnswersActions,
  useAnswersState,
} from '@yext/answers-headless-react';
import React, { FC, useEffect, useState } from 'react';
import { ViewProps, StyleSheet, Text, Pressable } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

interface ISearchBar extends ViewProps {}

export const SearchBar: FC<ISearchBar> = () => {
  const [hideResults, setHideResults] = useState(false);

  const answersActions = useAnswersActions();
  const query = useAnswersState(state => state.query.query);
  const autoCompleteResults = useAnswersState(
    state =>
      state.vertical.autoComplete?.results.map(result => result.value) || [],
  );
  const verticalLimit = useAnswersState(state => state.vertical.limit);

  useEffect(() => {
    answersActions.setVerticalLimit(50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    answersActions.executeVerticalQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verticalLimit]);

  useEffect(() => {
    answersActions.executeVerticalAutoComplete();
    answersActions.executeVerticalQuery();
  }, [answersActions, query]);

  const renderAutoCompleteRow = (item: string) => (
    <Pressable
      style={({ pressed }) => [
        { backgroundColor: pressed ? '#A9A9A9' : '#F0F0F0' },
        styles.rowTextContainer,
      ]}
      onPressOut={() => onPressOut(item)}>
      <Text style={styles.font}>{item}</Text>
    </Pressable>
  );

  const onPressOut = (item: string) => {
    answersActions.setQuery(item);
    setHideResults(true);
  };

  const onChangeText = (text: string) => {
    setHideResults(false);
    answersActions.setQuery(text);
  };

  return (
    <Autocomplete
      hideResults={hideResults}
      data={autoCompleteResults}
      inputContainerStyle={styles.searchBar}
      listContainerStyle={styles.autocompleteOptions}
      value={query}
      onChangeText={text => onChangeText(text)}
      flatListProps={{
        keyExtractor: (_, idx) => idx,
        renderItem: ({ item }) => renderAutoCompleteRow(item),
      }}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#F0F0F0',
    marginHorizontal: 20,
    borderRadius: 30,
  },
  autocompleteOptions: {
    marginHorizontal: 20,
  },
  font: {
    fontFamily: 'Exo2-Regular',
    fontWeight: '600',
  },
  rowTextContainer: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#C0C0C0',
  },
});
