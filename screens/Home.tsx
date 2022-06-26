import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";

import { Text, View } from "../components/Themed";

export const Home = () => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your zip code"
        onChangeText={() => ({})}
        value={`123`}
        keyboardType="numeric"
      />
      <Pressable onPress={() => ({})}>
        <Text>Submit</Text>
      </Pressable>
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
