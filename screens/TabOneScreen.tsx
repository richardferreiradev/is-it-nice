import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export const TabOneScreen = ({ navigation }: RootTabScreenProps<"TabOne">) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your zip code"
        onChangeText={() => ({})}
        value={"123"}
        keyboardType="numeric"
      />
      <Pressable onPress={() => ({})}>
        <Text>Submit</Text>
      </Pressable>
      <Text style={styles.title}>
        The current temp in your area is aight, therefore - it is okay.
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
