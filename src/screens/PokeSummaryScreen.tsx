import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
  const { pokeId } = route.params;

  return (
    <View style={styles.container}>
      <Text>Pokémon Summary for #{pokeId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
