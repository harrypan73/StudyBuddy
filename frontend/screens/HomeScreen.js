import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style = { styles.container }>
            <Text>Home Screen</Text>
            <Button title = "Log Out" onPress = {() => navigation.navigate('Login')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});