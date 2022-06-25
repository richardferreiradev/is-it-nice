import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

import { getCurrentWeather } from "../global/api/weather";
import Button from "../components/button/button";

export const TabOneScreen = ({ navigation }: RootTabScreenProps<"TabOne">) => {
  const [response, setResponse] = useState<any>();
  const [temp, setTemp] = useState<number>(0);
  const [zipCode, onChangeText] = useState<string>("");

  useEffect(() => {
    (async () => {
      const res = await getCurrentWeather(`68007`);
      setResponse(res);
      if (res) {
        setTemp(res.current.temp_f);
      }
    })();
  }, []);

  const onPress = async (zipCode: string) => {
    const test = await getCurrentWeather(zipCode);
    setTemp(test.current.temp_f);
    onChangeText("");
  };

  const handlePress = (value: string) => {
    getCurrentWeather(value);
  };
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
      <Text style={styles.title}>
        The current temp in your area is {temp}, therefore - it is okay.
      </Text>
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
