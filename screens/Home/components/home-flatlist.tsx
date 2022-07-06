import { Current, Forecastday, Location } from 'global/interfaces/getForecast';
import React, { FC, useState, useMemo } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';

import { Autocomplete } from 'react-native-autocomplete-input';

import {
  useGetForecastQuery,
  weatherApi,
} from '../../../global/api/weatherApi';

export const HomeList = () => {
  const [params, setParams] = useState('68007');
  const [search, onChangeText] = useState<string | number>();
  const { data, isSuccess, isLoading, isError, error } =
    useGetForecastQuery(params);

  let response;
  let forecast: Forecastday[] | [];
  let current: Current;
  let location: Location;

  if (isLoading) {
    response = <ActivityIndicator size="large" />;
  } else if (isSuccess) {
    forecast = data.forecast.forecastday;
    current = data.current;
    location = data.location;
    // console.log(current, 'current');
    // console.log(location, 'location');
  } else if (isError) {
    response = (
      <View>
        <Text>There was an error displaying data</Text>
      </View>
    );
  }

  const ListHeaderComponent = useMemo(() => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.city}>{location.name}</Text>
        <Text style={styles.currentTemp}>{current.temp_f}</Text>
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

  const searchData = ['bennington, test', 'test2'];

  // const SearchBar = useMemo(() => {
  //   return <Autocomplete listStyle={styles.input} data={searchData} />;
  // }, []);

  return (
    <View>
      {data && (
        <FlatList
          data={data.forecast}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <Text>Max: {item.day.maxtemp_f}</Text>
              <Text>Wind: {item.day.maxwind_kph}/mph</Text>
            </View>
          )}
          keyExtractor={item => item.date}
          ListHeaderComponent={ListHeaderComponent}
          stickyHeaderIndices={[0]}
        />
      )}
      );
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
