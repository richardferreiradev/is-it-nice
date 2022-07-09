import { Current, Forecastday, Location } from 'global/interfaces/getForecast';
import React, { FC, useState, useMemo, useCallback } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';

import { Autocomplete } from 'react-native-autocomplete-input';
import { WeatherCard } from './weather-card';

import { useGetForecastQuery } from '../../../global/api/weatherApi';

export const HomeList = () => {
  const [params, setParams] = useState('68007');
  const [search, onChangeText] = useState<string | number>();
  const { data, isSuccess, isLoading, isError, error } =
    useGetForecastQuery(params);

  const forecast = data?.forecast?.forecastday;
  const current = data?.current;
  const location = data?.location;

  const ListHeaderComponent = useMemo(() => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.city}>{location?.name}</Text>
        <Text style={styles.currentTemp}>{current?.temp_f}</Text>
        <View style={styles.currentForecastContainer}>
          <Text style={styles.currentForecast}>
            H: {forecast?.[0].day.maxtemp_f}
          </Text>
          <Text style={styles.currentForecast}>
            L: {forecast?.[0].day.mintemp_f}
          </Text>
        </View>
      </View>
    );
  }, [forecast]);

  const searchData = ['bennington, test', 'test2'];

  // const SearchBar = useMemo(() => {
  //   return <Autocomplete listStyle={styles.input} data={searchData} />;
  // }, []);

  return (
    <View>
      <FlatList
        data={forecast}
        renderItem={({ item }) => <WeatherCard hourlyTemp={item.hour} />}
        keyExtractor={item => item.date}
        ListHeaderComponent={ListHeaderComponent}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'flex-start',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f3abcd',
  },
  city: {
    fontSize: 30,
    textAlign: 'center',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: 10,
    paddingVertical: 10,
    zIndex: -1,
  },
  currentTemp: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  currentForecastContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  currentForecast: { paddingHorizontal: 20 },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginTop: 30,
    marginBottom: 15,
  },
  inputContainer: {},
});
