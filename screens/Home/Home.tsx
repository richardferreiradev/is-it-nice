import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HomeList } from './components/home-flatlist';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HomeList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: '#ccc',
  },
});
