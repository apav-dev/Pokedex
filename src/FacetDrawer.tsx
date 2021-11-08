import React, { FC, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import SelectMultiple from 'react-native-select-multiple';

const { width, height } = Dimensions.get('window');

interface IFacetDrawerProps extends ViewProps {
  facetName: string;
  facetOptions: string[];
}

export const FacetDrawer: FC<IFacetDrawerProps> = ({
  facetName,
  facetOptions,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const flipAnimation = useRef(new Animated.Value(0)).current;

  const getFlipAnimation = () => {
    const rotate = flipAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    return { rotate };
  };

  useEffect(() => {
    Animated.timing(flipAnimation, {
      toValue: open ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [open]);

  return (
    <View style={styles.filterContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.font}>{facetName}</Text>
        <Pressable onPressOut={() => setOpen(!open)}>
          <Animated.View
            style={{
              transform: [getFlipAnimation()],
            }}>
            <Icon name={'chevron-down'} size={18} />
          </Animated.View>
        </Pressable>
      </View>
      {open && (
        <SelectMultiple
          style={styles.dropdownContainer}
          rowStyle={styles.rowStyle}
          labelStyle={styles.checkboxText}
          items={facetOptions}
          selectedItems={selectedFilters}
          onSelectionsChange={selectedItems =>
            setSelectedFilters(selectedItems)
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: '#F0F0F0',
    width: width * 0.235,
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
  dropdownContainer: {
    position: 'absolute',
    marginTop: 30,
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
  },
});
