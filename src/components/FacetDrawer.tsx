import React, { FC, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import SelectMultiple from 'react-native-select-multiple';
import {
  useAnswersActions,
  useAnswersState,
} from '@yext/answers-headless-react';
import { Matcher } from '@yext/answers-core';

const { width, height } = Dimensions.get('window');

interface IFacetDrawerProps extends ViewProps {
  filterName: string;
}

export interface Selection {
  label: string;
  value: string;
}

export const FacetDrawer: FC<IFacetDrawerProps> = ({ filterName }) => {
  const [open, setOpen] = useState(false);

  const flipAnimation = useRef(new Animated.Value(0)).current;
  const expandAnimation = useRef(new Animated.Value(0)).current;

  const answersActions = useAnswersActions();

  const facet = useAnswersState(state => state.filters.facets)?.find(
    facet => facet.displayName == filterName,
  );

  const selectedFacetOptions =
    facet?.options
      .filter(option => option.selected === true)
      .map(option => option.displayName) || [];

  const allFacetOptions =
    facet?.options.map(option => option.displayName) || [];

  const getFlipAnimation = () => {
    const rotate = flipAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    return { rotate };
  };

  useEffect(() => {
    if (open) {
      Animated.timing(expandAnimation, {
        toValue: 320,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(expandAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

    Animated.timing(flipAnimation, {
      toValue: open ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [open]);

  // TODO: maybe ask answers-headless team about a function that could set all facets at once
  const onFacetSelection = checkedRows => {
    const facetFieldId = facet?.fieldId;
    const checkedRowValues = checkedRows.map(cr => cr.value);
    // console.log(selectedFacets);

    if (facetFieldId) {
      allFacetOptions.forEach(option => {
        if (
          checkedRowValues.includes(option) &&
          !selectedFacetOptions.includes(option)
        ) {
          answersActions.selectFacetOption(facetFieldId, {
            matcher: Matcher.Equals,
            value: option,
          });
        } else if (
          !checkedRowValues.includes(option) &&
          selectedFacetOptions.includes(option)
        ) {
          answersActions.unselectFacetOption(facetFieldId, {
            matcher: Matcher.Equals,
            value: option,
          });
        }
      });
    }
  };

  return (
    <View style={styles.filterContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.font}>{filterName}</Text>
        <Pressable onPressOut={() => setOpen(!open)}>
          <Animated.View
            style={{
              transform: [getFlipAnimation()],
            }}>
            <Icon name={'chevron-down'} size={18} />
          </Animated.View>
        </Pressable>
      </View>
      <Animated.View
        style={[styles.animatedContainer, { height: expandAnimation }]}>
        <SelectMultiple
          rowStyle={styles.rowStyle}
          labelStyle={styles.checkboxText}
          items={facet?.options.map(option => option.displayName) || []}
          selectedItems={
            facet?.options
              .filter(option => option.selected === true)
              .map(option => option.displayName) || []
          }
          onSelectionsChange={(selectedItems: React.SetStateAction<never[]>) =>
            onFacetSelection(selectedItems)
          }
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: '#F0F0F0',
    width: width * 0.235,
    marginRight: 10,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
  },
  font: {
    fontFamily: 'Exo2-Regular',
    fontWeight: '400',
    fontSize: 12,
    marginRight: 8,
  },
  animatedContainer: {
    position: 'absolute',
    marginTop: 31,
    width: width * 0.235,
  },
  checkboxText: {
    fontFamily: 'Exo2-Regular',
    fontWeight: '400',
    fontSize: 12,
  },
  rowStyle: {
    paddingVertical: 7.5,
    backgroundColor: '#F0F0F0',
    height: 40,
  },
});