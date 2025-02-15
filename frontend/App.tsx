import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigation from "./src/navigation/App";
import { DataProvider } from "./src/hooks";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DataProvider>
        <AppNavigation />
      </DataProvider>
    </GestureHandlerRootView>
  );
}
