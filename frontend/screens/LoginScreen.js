import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
    return (
        <View style = { styles.container }>
            <Text>Login Screen</Text>
            <Button title = "Log In" onPress = {() => navigation.navigate('Home')} />
            <Button title = "Sign Up" onPress = {() => navigation.navigate('Signup')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});