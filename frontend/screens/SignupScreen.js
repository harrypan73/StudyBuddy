import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { signupUser } from '../redux/authSlice';

export default function SignupScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSignup = () => {
        if (!username || !email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        // Sign the user up and navigate to the Home screen
        dispatch(signupUser(username, email, password))
            .then(() => {
                navigation.navigate('Home');
            })
            .catch((err) => {
                console.error(err);
                Alert.alert('Error', 'Signup failed, please try again');
            });
    }

    return (
        <View style = { styles.container }>
            <Text>Signup Screen</Text>

            <TextInput
                style = { styles.input }
                placeholder = "Username"
                value = { username }
                onChangeText = { setUsername }
            />
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
            <Button title = "Register" onPress = {handleSignup} />

            <Text>Already have an account?</Text>
            <Button title = "Log In" onPress = {() => navigation.navigate('Login')} />
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