import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './frontend/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native';

import LoginScreen from './frontend/screens/LoginScreen';
import SignupScreen from './frontend/screens/SignupScreen';
import NavigationBar from './frontend/components/NavigationBar';

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
        <Stack.Navigator initialRouteName = { isLoggedIn ? "NavTabs" : "Login" } screenOptions = {{ headerShown: false }}>
          {/* Screens WITHOUT navigation bar */}
          <Stack.Screen name = "Login" component = { LoginScreen } />
          <Stack.Screen name = "Signup" component = { SignupScreen } />
          {/* Screens WITH navigation bar */}
          <Stack.Screen name = "NavTabs" component = { NavigationBar } />
          
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};