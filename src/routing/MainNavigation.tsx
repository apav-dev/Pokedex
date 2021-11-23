import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { MainStack, MainRoutes } from './routes';

import { SearchScreen } from '../screens/SearchScreen';
import { PokeSummaryScreen } from '../screens/PokeSummaryScreen';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

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
          options={{
            headerStyle: {
              backgroundColor: '#C0C0C0',
            },
            // headerBackTitle: 'Search',
            headerTitle: '',
            headerLeft: () => (
              <TouchableOpacity
              // style={{styles.backButton}}
              // onPressOut={() => navigation.navigate('Search')}
              >
                <Text style={styles.backButton}>{'< Search'}</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigation;

const styles = StyleSheet.create({
  backButton: {
    fontFamily: 'Exo2-Regular',
    fontWeight: '600',
    fontSize: 16,
    color: '#006ee6',
  },
});
