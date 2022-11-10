import React, { FC } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import moment from 'moment';

import { Hour } from 'global/interfaces/getForecast';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

interface WeatherCardProps {
  hourlyTemp: Array<Hour>;
}

/**
  * TODO
  *  Create FlatList component to render all days
  * <FlatList<Forecastday>
        data={forecast}
        renderItem={({ item }) => <WeatherCard hourlyTemp={item.hour} />}
        keyExtractor={item => item.date}
        ListHeaderComponent={listHeaderComponent}
        stickyHeaderIndices={[0]}
      />
  */
export const WeatherCard: FC<WeatherCardProps> = ({ hourlyTemp }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.cardContainer}
      horizontal
      showsHorizontalScrollIndicator={false}>
      {hourlyTemp?.map((x, index) => (
        <View style={styles.contentContainer}>
          <Text style={styles.hourlyTemp}>{moment(x.time).format('HA')}</Text>
          <Text style={styles.hourlyTemp}>{x.temp_f}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'flex-start',
    height: 100,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#404040',
  },
  contentContainer: {
    flexDirection: 'column',
  },
  hourlyTemp: {
    paddingHorizontal: 10,
    alignSelf: 'flex-end',
    color: '#B3B3B3',
  },
});
