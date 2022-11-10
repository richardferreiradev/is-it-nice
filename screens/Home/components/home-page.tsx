import React, { FC, useState, useMemo, useCallback } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

import {
  Current,
  Forecastday,
  Location,
} from '../../../global/interfaces/getForecast';
import { useGetForecastQuery } from '../../../global/api/weatherApi';

import { WeatherCard } from './weather-card';

export const HomePage: FC = () => {
  const { data, isSuccess, isLoading, isError, error } =
    useGetForecastQuery('68007');

  const forecast: Array<Forecastday> = data?.forecast?.forecastday!;
  const current: Current = data?.current!;
  const location: Location = data?.location!;

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
};

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'flex-start',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#121212',
  },
  city: {
    fontSize: 30,
    textAlign: 'center',
    color: '#B3B3B3',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: '#121212',
    borderRadius: 5,
    marginHorizontal: 10,
    paddingVertical: 10,
    zIndex: -1,
  },
  currentTemp: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  currentForecastContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  currentForecast: { paddingHorizontal: 20, color: '#FFFFFF' },
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
