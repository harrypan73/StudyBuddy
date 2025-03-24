import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authSlice';

export default function HomeScreen({ navigation, setIsLoggedIn }) {
    console.log("Home screen rendered");
    const dispatch = useDispatch();

    const handleLogout = () => {
        // Log the user out and navigate to the Login screen
        dispatch(logoutUser())
            .then(() => {
                setIsLoggedIn(false);
                navigation.navigate('Login');
            })
            .catch((err) => {
                console.error(err);
                Alert.alert('Error', 'Logout failed, please try again');
            })
    }

    return (
        <View style = { styles.container }>
            <Text>Home Screen</Text>
            <Button title = "Log Out" onPress = {handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
    },
});