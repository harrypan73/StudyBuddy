import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/authSlice';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        // Log the user in and navigate to the Home screen
        dispatch(loginUser(email, password))
            .then(() => {
                navigation.navigate('Home');
            })
            .catch((err) => {
                console.error(err);
                Alert.alert('Error', 'Login failed, please try again');
            });
    }

    return (
        <View style = { styles.container }>
            <Text>Login Screen</Text>

            <TextInput
                style = { styles.input }
                placeholder = "Email"
                value = { email }
                onChangeText = { setEmail }
            />
            <TextInput
                style = { styles.input }
                placeholder = "Password"
                value = { password }
                onChangeText = { setPassword }
                secureTextEntry
            />
            <Button title = "Log In" onPress = {handleLogin} />

            <Button title = "Sign Up" onPress = {() => navigation.navigate('Signup')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    }
});