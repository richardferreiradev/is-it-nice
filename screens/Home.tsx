import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text, View } from "../components/Themed";

import { useGetCurrentWeatherQuery } from "../global/api/weatherApi";

const deviceWidth = Dimensions.get("window").width;

export const Home = () => {
  const [zipCode, setZipCode] = useState<string>(`68007`);

  const { data, isSuccess, isLoading, error, isError } =
    useGetCurrentWeatherQuery(zipCode);

  if (isLoading) return <ActivityIndicator size="large" />;

  if (isError || !data) {
    return <View>Something went wrong</View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.cardContainer}>
          <Text style={styles.heading}>
            {data.location.name}, {data.location.region}
          </Text>
          <Text style={styles.temp}>Currently: {data.current.temp_f}</Text>
          <Text style={styles.temp}>
            Wind: {data.current.wind_mph}/mph {data.current.wind_dir}
          </Text>
          <Text style={styles.temp}>
            Precipitation: {data.current.precip_in}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  scrollViewContainer: {
    justifyContent: "flex-start",
    width: deviceWidth,
    backgroundColor: "white",
  },
  cardContainer: {
    justifyContent: "flex-start",
    marginTop: 110,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "aliceblue",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  temp: {
    fontSize: 16,
    paddingTop: 10,
  },
});
