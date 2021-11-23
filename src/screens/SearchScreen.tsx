import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { PokeSearchResults } from '../components/PokeSearchResults';
import { SearchBar } from '../components/SearchBar';

const statusBarHeight = getStatusBarHeight();

export const SearchScreen = () => (
  <ImageBackground
    source={require('../assets/images/pokeBackground.png')}
    style={styles.container}>
    <View
      style={[
        styles.statusBar,
        {
          height: statusBarHeight,
        },
      ]}
    />
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <SearchBar style={styles.container} />
        <PokeSearchResults style={styles.container} />
      </View>
    </SafeAreaView>
  </ImageBackground>
);

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#C0C0C0',
  },
  container: {
    flex: 1,
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
  },
});
