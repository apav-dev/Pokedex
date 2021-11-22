import { useAnswersState } from '@yext/answers-headless-react';
import React from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BaseSummary } from '../components/BaseSummary';
import { CardCarousel } from '../components/CardCarousel';
import { MainRoutes } from '../routing/routes';
import { MainNavigationProp, MainRouteProp } from '../routing/types';

const { width, height } = Dimensions.get('window');

type PokeSummaryScreenProps = {
  navigation: MainNavigationProp<MainRoutes.PokeSummary>;
  route: MainRouteProp<MainRoutes.PokeSummary>;
};

export const PokeSummaryScreen = ({
  navigation,
  route,
}: PokeSummaryScreenProps): React.ReactElement => {
  const { pokeId } = route.params;

  const pokemon = useAnswersState(
    state => state.vertical.results?.verticalResults.results,
  )?.find(result => result.id === pokeId);

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
