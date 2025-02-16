import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useData, ThemeProvider, DataProvider } from "../hooks";
SplashScreen.preventAutoHideAsync();

const App = () => {
  const { theme, setTheme } = useData();

  // load custom fonts
  const [fontsLoaded] = useFonts({
    "OpenSans-Light": theme?.assets?.OpenSansLight,
    "OpenSans-Regular": theme?.assets?.OpenSansRegular,
    "OpenSans-SemiBold": theme?.assets?.OpenSansSemiBold,
    "OpenSans-ExtraBold": theme?.assets?.OpenSansExtraBold,
    "OpenSans-Bold": theme?.assets?.OpenSansBold,
  });

  if (fontsLoaded) {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };
    hideSplash();
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <DataProvider>
          <AppNavigator />
        </DataProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
