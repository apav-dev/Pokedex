import {
  useAnswersActions,
  useAnswersState,
  useAnswersUtilities,
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
  TouchableOpacity,
} from 'react-native';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { sortRomans } from '../utils/sortRomans';
import { toProperCase } from '../utils/toProperCase';
import { AppliedFilters } from './AppliedFilters';
import { FacetDrawer } from './FacetDrawer';
import { Colors, Typography } from '../styles';

const { width, height } = Dimensions.get('window');

interface ISearchBarProps extends ViewProps {}

export const SearchBar: FC<ISearchBarProps> = () => {
  const [hideAutoComplete, setHideAutoComplete] = useState(false);

  const answersActions = useAnswersActions();
  const utils = useAnswersUtilities();
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
    verticalLimit === 50 && answersActions.executeVerticalQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verticalLimit]);

  useEffect(() => {
    answersActions.executeVerticalAutoComplete();
  }, [answersActions, query]);

  const renderAutoCompleteRow = (item: string) => (
    <Pressable
      style={({ pressed }) => [
        { backgroundColor: pressed ? Colors.darkGrey : Colors.offWhite },
        styles.rowTextContainer,
      ]}
      onPressOut={() => onRowPressOut(item)}>
      <Text style={styles.font}>{item}</Text>
    </Pressable>
  );

  const onRowPressOut = (item: string) => {
    setHideAutoComplete(true);
    answersActions.setQuery(item);
    answersActions.executeVerticalQuery();
  };

  const onSearchIconPressOut = () => {
    setHideAutoComplete(true);
    answersActions.resetFacets();
    answersActions.executeVerticalQuery();
  };

  const onXIconPressOut = () => {
    answersActions.setQuery('');
    answersActions.resetFacets();
    answersActions.executeVerticalQuery();
  };

  const onChangeText = (text: string) => {
    setHideAutoComplete(false);
    answersActions.setQuery(text);
  };

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchInput}>
        <TouchableOpacity onPressOut={() => onSearchIconPressOut()}>
          <OcticonsIcon style={styles.searchIcon} size={22} name={'search'} />
        </TouchableOpacity>
        <TextInput
          style={styles.font}
          placeholder="Search Pokémon..."
          onChangeText={onChangeText}
          value={query}
        />
        <TouchableOpacity
          style={styles.xIcon}
          disabled={query === ''}
          onPressOut={() => onXIconPressOut()}>
          <AntDesignIcon style={styles.searchIcon} size={22} name={'close'} />
        </TouchableOpacity>
      </View>
      {!hideAutoComplete && (
        <FlatList
          style={styles.dropdownContainer}
          data={autoCompleteResults}
          renderItem={item => renderAutoCompleteRow(item.item)}
        />
      )}
      <View style={styles.filtersContainer}>
        <FacetDrawer filterName={'Generation'} sort={sortRomans} />
        <FacetDrawer
          filterName={'Types Name'}
          displayName={'Types'}
          transform={toProperCase}
        />
      </View>
      <AppliedFilters />
    </View>
  );
};

// TODO: adjust styling for different phone screens
const styles = StyleSheet.create({
  font: {
    ...Typography.titleFont,
  },
  rowTextContainer: {
    marginHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.silver,
  },
  searchInputContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  searchInput: {
    flexDirection: 'row',
    backgroundColor: Colors.offWhite,
    height: 40,
    marginHorizontal: 18,
    borderRadius: 10,
    paddingLeft: 3,
    alignItems: 'center',
    ...Typography.titleFont,
  },
  searchContainer: {
    zIndex: 1,
    backgroundColor: Colors.silver,
    justifyContent: 'flex-start',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
  },
  searchIcon: {
    paddingLeft: 10,
    paddingRight: 14,
  },
  xIcon: {
    marginLeft: 'auto',
  },
  dropdownContainer: {
    position: 'absolute',
    marginTop: 40,
    width: width - 5,
    zIndex: 3,
  },
  filtersContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 18,
    height: 30,
    justifyContent: 'center',
    zIndex: 2,
  },
});
