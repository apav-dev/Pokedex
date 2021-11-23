import { useAnswersState } from '@yext/answers-headless-react';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { BaseSummary } from '../components/BaseSummary';
import { CardCarousel } from '../components/CardCarousel';
import { MainRoutes } from '../routing/routes';
import { MainNavigationProp, MainRouteProp } from '../routing/types';

type PokeSummaryScreenProps = {
  navigation: MainNavigationProp<MainRoutes.PokeSummary>;
  route: MainRouteProp<MainRoutes.PokeSummary>;
};

export const PokeSummaryScreen = ({
  navigation,
  route,
}: PokeSummaryScreenProps): React.ReactElement => {
  const { pokemon } = route.params;

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
