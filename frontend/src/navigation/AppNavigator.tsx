import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../(private)";
import { Platform } from "react-native";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const isWeb = Platform.OS === "web";
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
