import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HomeList } from './components/home-flatlist';
import { Text, View } from '../../components/Themed';

import { useGetForecastQuery } from '../../global/api/weatherApi';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export const Home = () => {
  const [zipCode, setZipCode] = useState<string>(`68007`);

  const { data, isSuccess, isLoading, error, isError, isFetching } =
    useGetForecastQuery(zipCode);

  if (isLoading) return <ActivityIndicator size="large" />;

  if (isError || !data) {
    return <View>Something went wrong</View>;
  }

  if (isSuccess) {
    data.forecast.forecastday.map(x => console.log(x.day.maxtemp_f));
  }

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
