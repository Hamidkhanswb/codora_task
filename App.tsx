import 'react-native-gesture-handler'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from "@react-navigation/stack";

// files
import HomeScreen from './src/screens/HomeScreen';
import SendTokensScreen from './src/screens/SendTokensScreen';

const Stack = createStackNavigator()

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer
      >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
          />
          <Stack.Screen
            name="SendTokensScreen"
            component={SendTokensScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
};

export default App;