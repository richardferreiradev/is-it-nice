import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text, View } from "../components/Themed";

import { useGetForecastQuery } from "../global/api/weatherApi";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export const Home = () => {
  const [zipCode, setZipCode] = useState<string>(`68007`);

  const { data, isSuccess, isLoading, error, isError, isFetching } =
    useGetForecastQuery(zipCode);

  if (isLoading) return <ActivityIndicator size="large" />;

  if (isError || !data) {
    return <View>Something went wrong</View>;
  }

  if (isSuccess) {
    data.forecast.forecastday.map((x) => console.log(x.day.maxtemp_f));
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data.forecast.forecastday}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Text style={styles.temp}>Max: {item.day.maxtemp_f}</Text>
            <Text style={styles.temp}>Wind: {item.day.maxwind_mph}/mph</Text>
          </View>
        )}
        keyExtractor={(item) => item.date}
        ListHeaderComponent={
          <Text style={styles.heading}>
            {data.location.name}, {data.location.region}
          </Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: "#ccc",
  },
  cardContainer: {
    justifyContent: "flex-start",
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f3abcd",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  temp: {
    fontSize: 16,
  },
});
