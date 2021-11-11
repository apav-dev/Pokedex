import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { MainStack, MainRoutes } from './routes';

import { SearchScreen } from '../screens/SearchScreen';
import { PokeSummaryScreen } from '../screens/PokeSummaryScreen';

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          name={MainRoutes.Search}
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={MainRoutes.PokeSummary}
          component={PokeSummaryScreen}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigation;
