import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

import { useGetCurrentWeatherQuery } from "../global/api/weatherSlice";

export const TabOneScreen = ({ navigation }: RootTabScreenProps<"TabOne">) => {
  const [response, setResponse] = useState<any>();
  const [temp, setTemp] = useState<number>(0);
  const [zipCode, onChangeText] = useState<string>("");

  const {
    data: currentWeather,
    isLoading,
    isSuccess,
  } = useGetCurrentWeatherQuery(68007);

  const onPress = async (zipCode: string) => {
    if (isSuccess) {
      setTemp(currentWeather.current.temp_f);
    }
    onChangeText("");
  };

  let content;

  if (isLoading) {
    content = <ActivityIndicator />;
  } else if (isSuccess) {
    content = (
      <Text style={styles.title}>
        The current temp in your area is {currentWeather.current.temp_f},
        therefore - it is okay.
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your zip code"
        onChangeText={onChangeText}
        value={zipCode}
        keyboardType="numeric"
      />
      <Pressable onPress={() => onPress(zipCode)}>
        <Text>Submit</Text>
      </Pressable>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
