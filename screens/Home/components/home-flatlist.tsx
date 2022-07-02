import React, { FC, useState, useMemo } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {
  useGetForecastQuery,
  weatherApi,
} from '../../../global/api/weatherApi';

export const HomeList = () => {
  const [params, setParams] = useState('68007');
  const { data, isSuccess, isLoading, isError, error } =
    useGetForecastQuery(params);

  let forecast;

  if (isLoading) {
    forecast = <ActivityIndicator size="large" />;
  } else if (isSuccess) {
    forecast = data.forecast.forecastday;
  } else if (isError) {
    forecast = (
      <View>
        <Text>There was an error displaying data</Text>
      </View>
    );
  }

  const ListHeaderComponent = useMemo(() => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.city}>{data!.location.name}</Text>
        <Text style={styles.currentTemp}>{data!.current.temp_f}</Text>
        <View style={styles.currentForecastContainer}>
          <Text style={styles.currentForecast}>
            H: {forecast[0].day.maxtemp_f}
          </Text>
          <Text style={styles.currentForecast}>
            L: {forecast[0].day.mintemp_f}
          </Text>
        </View>
      </View>
    );
  }, []);

  return (
    <FlatList
      data={forecast}
      renderItem={({ item }) => (
        <View style={styles.cardContainer}>
          <Text>Max: {item.day.maxtemp_f}</Text>
          <Text>Wind: {item.day.temp}/mph</Text>
        </View>
      )}
      keyExtractor={item => item.date}
      ListHeaderComponent={ListHeaderComponent}
      stickyHeaderIndices={[0]}
    />
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
    fontSize: 28,
    textAlign: 'center',
  },
  currentTemp: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  currentForecastContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  currentForecast: { paddingHorizontal: 5 },
  headerContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});
