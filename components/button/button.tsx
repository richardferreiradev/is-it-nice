import { StyleSheet, Text, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { View } from "../Themed";
import { getCurrentWeather } from "../../global/api/weather";

interface ButtonProps {
  onPress: () => void;
  buttonText: string;
}

const styles = StyleSheet.create({});

const Button = ({ onPress, buttonText }: ButtonProps) => {
  const [value, onChangeText] = useState<string>("");

  const handlePress = (value: string) => {
    getCurrentWeather(value);
  };

  return (
    <View>
      <TextInput
        placeholder="Enter your zip code"
        onChangeText={onChangeText}
        value={value}
      />
      <Pressable onPress={onPress}>
        <Text>{buttonText}</Text>
      </Pressable>
    </View>
  );
};

export default Button;
