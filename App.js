import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './frontend/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native';

import HomeScreen from './frontend/screens/HomeScreen';
import LoginScreen from './frontend/screens/LoginScreen';
import SignupScreen from './frontend/screens/SignupScreen';
import StartStudySessionScreen from './frontend/screens/StartStudySessionScreen';
import EndStudySessionScreen from './frontend/screens/EndStudySessionScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(!!token);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>
  }

  return (
    <Provider store = { store }>
      <NavigationContainer>
        {/* <Stack.Navigator initialRouteName = { isLoggedIn ? "Home" : "Login" } screenOptions = {{ headerShown: false }}> */}
        <Stack.Navigator initialRouteName = "EndStudySession" screenOptions = {{ headerShown: false }}>
          <Stack.Screen name = "Home" component = { HomeScreen } />
          <Stack.Screen name = "Login" component = { LoginScreen } />
          <Stack.Screen name = "Signup" component = { SignupScreen } />
          <Stack.Screen name = "StartStudySession" component = { StartStudySessionScreen } />
          <Stack.Screen name = "EndStudySession" component = { EndStudySessionScreen } />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};