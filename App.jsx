import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import StackNavigator from "./src/navigation/StackNavigator";

import ThemeProvider from "./src/context/ThemeContext";
import { Provider } from "react-redux";
import { store } from "./src/store/store";

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeProvider>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
}