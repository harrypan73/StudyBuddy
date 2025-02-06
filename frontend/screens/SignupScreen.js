import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
    return (
        <View style = { styles.container }>
            <Text>Signup Screen</Text>
            <Button title = "Register" onPress = {() => navigation.navigate('Login')} />
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