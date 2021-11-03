import {
  useAnswersActions,
  useAnswersState,
} from '@yext/answers-headless-react';
import React, { FC, useEffect, useState } from 'react';
import {
  ViewProps,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  View,
  FlatList,
} from 'react-native';

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
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Pokémon..."
        onChangeText={onChangeText}
        value={query}
      />
      {!hideResults && (
        <FlatList
          data={autoCompleteResults}
          renderItem={item => renderAutoCompleteRow(item.item)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  font: {
    fontFamily: 'Exo2-Regular',
    fontWeight: '600',
  },
  rowTextContainer: {
    marginHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#C0C0C0',
  },
  searchInput: {
    backgroundColor: '#F0F0F0',
    height: 40,
    marginHorizontal: 18,
    borderRadius: 10,
    paddingLeft: 3,
    fontFamily: 'Exo2-Regular',
    fontWeight: '600',
  },
  searchContainer: {
    zIndex: 1,
  },
});
