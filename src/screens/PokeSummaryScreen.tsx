import {
  useAnswersActions,
  useAnswersState,
} from '@yext/answers-headless-react';
import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BaseSummary } from '../components/BaseSummary';
import { CardCarousel } from '../components/CardCarousel';
import { PokeCard } from '../components/PokeCard';
import { MainRoutes } from '../routing/routes';
import { MainNavigationProp, MainRouteProp } from '../routing/types';
import AntIcon from 'react-native-vector-icons/AntDesign';

type PokeSummaryScreenProps = {
  navigation: MainNavigationProp<MainRoutes.PokeSummary>;
  route: MainRouteProp<MainRoutes.PokeSummary>;
};

export const PokeSummaryScreen = ({
  navigation,
  route,
}: PokeSummaryScreenProps): React.ReactElement => {
  const { pokemon } = route.params;

  const answersActions = useAnswersActions();

  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity onPressOut={onSearchButtonPress}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',

            // padding: 8,
          }}>
          <AntIcon name={'left'} color={'#147EFB'} />
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Exo2-Regular',
              paddingLeft: 4,
              color: '#147EFB',
            }}>
            Search
          </Text>
        </View>
      </TouchableOpacity>
    ),
  });

  const onSearchButtonPress = () => {
    answersActions.setVerticalKey('pokémon');
    answersActions.setQuery('');
    answersActions.resetFacets('');
    answersActions.executeVerticalQuery();
    navigation.navigate('Search');
  };

  return (
    <ScrollView
      style={styles.container}
      snapToAlignment="start"
      decelerationRate="fast">
      {[
        <BaseSummary key={0} pokemon={pokemon} navigation={navigation} />,
        <View>
          <CardCarousel key={1} />
        </View>,
      ]}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
