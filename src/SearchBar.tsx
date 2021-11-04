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
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

const { width, height } = Dimensions.get('window');

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
    // answersActions.executeVertbuicalQuery();
  }, [answersActions, query]);

  const renderAutoCompleteRow = (item: string) => (
    <Pressable
      style={({ pressed }) => [
        { backgroundColor: pressed ? '#A9A9A9' : '#F0F0F0' },
        styles.rowTextContainer,
      ]}
      onPressOut={() => onRowPressOut(item)}>
      <Text style={styles.font}>{item}</Text>
    </Pressable>
  );

  const onRowPressOut = (item: string) => {
    setHideResults(true);
    answersActions.setQuery(item);
    answersActions.executeVerticalQuery();
  };

  const onSearchIconPressOut = () => {
    setHideResults(true);
    answersActions.executeVerticalQuery();
  };

  const onChangeText = (text: string) => {
    setHideResults(false);
    answersActions.setQuery(text);
  };

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchInput}>
        <Pressable
          // disabled={!query}
          onPressOut={() => onSearchIconPressOut()}>
          <Icon style={styles.searchIcon} size={22} name={'search'} />
        </Pressable>
        <TextInput
          style={styles.font}
          placeholder="Search Pokémon..."
          onChangeText={onChangeText}
          value={query}
        />
      </View>
      {!hideResults && (
        <FlatList
          style={styles.dropdownContainer}
          data={autoCompleteResults}
          renderItem={item => renderAutoCompleteRow(item.item)}
        />
      )}
    </View>
  );
};

// TODO: adjust styling for different phone screens
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
  searchInputContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  searchInput: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    height: 40,
    marginHorizontal: 18,
    borderRadius: 10,
    paddingLeft: 3,
    fontFamily: 'Exo2-Regular',
    fontWeight: '600',
    alignItems: 'center',
  },
  searchContainer: {
    zIndex: 1,
  },
  searchIcon: {
    paddingLeft: 10,
    paddingRight: 14,
  },
  dropdownContainer: {
    position: 'absolute',
    marginTop: 40,
    width: width - 5,
  },
});
