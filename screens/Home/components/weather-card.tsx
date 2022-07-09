import { Hour } from 'global/interfaces/getForecast';
import React, { FC } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface WeatherCardProps {
  hourlyTemp: Array<Hour>;
}

export const WeatherCard: FC<WeatherCardProps> = ({ hourlyTemp }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.cardContainer}
      horizontal
      showsHorizontalScrollIndicator={false}>
      {hourlyTemp?.map((x, index) => (
        <View>
          <Text style={styles.hourlyTemp}>{x.time}</Text>
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
    backgroundColor: '#f3abcd',
    shadowColor: 'black',
    shadowOffset: { width: -2, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  hourlyTemp: {
    paddingHorizontal: 10,
    alignSelf: 'flex-end',
  },
});
