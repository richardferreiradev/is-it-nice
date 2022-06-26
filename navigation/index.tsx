import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ColorSchemeName, useColorScheme } from "react-native";
import { Home } from "../screens/Home";

const Stack = createNativeStackNavigator();

export const Navigation = ({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) => {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
