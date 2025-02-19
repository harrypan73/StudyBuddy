import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
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
            <Text style = { styles.title }>StudyBuddy</Text>

            <TextInput
                style = { styles.input }
                label = "Email"
                mode = "outlined"
                value = { email }
                onChangeText = { setEmail }
                theme = {{
                    colors: {
                        outline: 'none',
                        placeholder: '#747474',
                        onSurface: 'white',
                    },
                    roundness: 12
                }}
            />
            <TextInput
                style = { styles.input }
                label = "Password"
                mode = "outlined"
                value = { password }
                onChangeText = { setPassword }
                secureTextEntry
                theme = {{
                    colors: {
                        outline: 'none',
                        placeholder: '#747474',
                        onSurface: 'white',
                    },
                    roundness: 12
                }}
            />
            <Button 
                style = { styles.loginButton }
                labelStyle = {{ fontSize: 20 }}
                mode = "contained"
                title = "Log In"
                onPress = {handleLogin} 
            >Log In</Button>
            <Button
                style = { styles.signupButton }
                labelStyle = {{ fontSize: 20 }}
                mode = "contained"
                title = "Sign Up" 
                onPress = {() => navigation.navigate('Signup')}
            >Sign Up</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 40,
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        height: 60,
        marginBottom: 20,
        backgroundColor: '#212836',
        fontSize: 20,
    },
    loginButton: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        backgroundColor: '#2563EB',
        marginTop: 6,
        marginBottom: 20,
        borderRadius: 12,
    },
    signupButton: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        backgroundColor: '#334155',
        marginTop: 6,
        marginBottom: 20,
        borderRadius: 12,
    }
});