import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './frontend/redux/store';
import HomeScreen from './frontend/screens/HomeScreen';
import LoginScreen from './frontend/screens/LoginScreen';
import SignupScreen from './frontend/screens/SignupScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store = { store }>
      <NavigationContainer>
        <Stack.Navigator initialRouteName = "Login" screenOptions = {{ headerShown: false }}>
          <Stack.Screen name = "Home" component = {HomeScreen} />
          <Stack.Screen name = "Login" component = {LoginScreen} />
          <Stack.Screen name = "Signup" component = {SignupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};