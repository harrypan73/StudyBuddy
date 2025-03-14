import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './frontend/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View } from 'react-native';

import LoginScreen from './frontend/screens/LoginScreen';
import SignupScreen from './frontend/screens/SignupScreen';
import NavigationBar from './frontend/components/NavigationBar';
import HomeScreen from './frontend/screens/HomeScreen';
import CalendarScreen from './frontend/screens/CalendarScreen';
import FriendsScreen from './frontend/screens/FriendsScreen';
import MapScreen from './frontend/screens/MapScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState('');
  const [activeSession, setActiveSession] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(!!token);
      if (token) {
        console.log("Auto-logged in from past session, starting at route: Home");
        setCurrentRoute('Home');
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const fetchActiveSession = async () => {
      if (isLoggedIn) {
        try {
          const response = await fetch('http://localhost:5001/api/study-sessions/active');
          const data = await response.json();
          setActiveSession(data);
          console.log('Active session:', data);
        } catch (err) {
          console.error('Error fetching active session:', err);
        }
      }
    };
    if (isLoggedIn) {
      fetchActiveSession();
    }
  }, [isLoggedIn]);

  if (loading) {
    return <Text>Loading...</Text>
  }

  return (
    <>
      <Provider store = { store }>
        <NavigationContainer
          onStateChange = { (state) => {
            const routeName = state.routes[state.index]?.name;
            console.log("Navigated to route:", routeName);  // Debugging route changes
            setCurrentRoute(routeName);  // Update current route when it changes
          }}
        >
          <Stack.Navigator initialRouteName = { isLoggedIn ? "Home" : "Login" } screenOptions = {{ headerShown: false }}>
            {/* Screens WITHOUT navigation bar */}
            <Stack.Screen name = "Login" component = { LoginScreen } />
            <Stack.Screen name = "Signup" component = { SignupScreen } />
            {/* Screens WITH navigation bar */}
            <Stack.Screen name = "Home" component = { HomeScreen } />
            <Stack.Screen name = "Calendar" component = { CalendarScreen } />
            <Stack.Screen name = "Friends" component = { FriendsScreen } />
            <Stack.Screen name = "Map" component = { MapScreen } />
            
          </Stack.Navigator>
          { currentRoute !== '' &&
            currentRoute !== 'Login' && 
            currentRoute !== 'Signup' && (
            <View style = { styles.navBarContainerStyle }>
              <NavigationBar />
            </View>
          )}
        </NavigationContainer>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  navBarContainerStyle: {
    // borderColor: 'black',
    // borderWidth: 1,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 100,
  }
})