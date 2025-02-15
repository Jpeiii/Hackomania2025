import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Home,
  UploadPost,
  PostDetailApp,
  PostDetailWeb,
  ChatBoxApp,
  ChatBoxWeb,
  isWebProfile,
} from "../(private)";
import { useDispatch } from "react-redux";
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
      <Stack.Screen
        name="UploadPost"
        component={UploadPost}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostDetailWeb"
        component={PostDetailWeb}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatBoxWeb"
        component={ChatBoxWeb}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IsWebProfile"
        component={isWebProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
