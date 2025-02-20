import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { signupUser } from '../redux/authSlice';

export default function SignupScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();

    const handleSignup = () => {
        if (!username || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        // Sign the user up and navigate to the Home screen
        dispatch(signupUser(username, email, password))
            .then(() => {
                navigation.navigate('Home');
            })
            .catch((err) => {
                console.error(err);
                Alert.alert('Error', err.message);
            });
    }

    return (
        <View style = { styles.container }>
            <View style = {{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }} >
                <Image
                    style = {{ width: 50, height: 50, marginRight: 15 }}
                    source = { require('../../assets/icons/StudyBuddyLogo.png') }
                />
                <Text style = { styles.title }>
                    StudyBuddy
                </Text>
            </View>

            <TextInput
                style = { styles.input }
                label = "Username"
                mode = "outlined"
                value = { username }
                onChangeText = { setUsername }
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
            <TextInput
                style = { styles.input }
                label = "Confirm Password"
                mode = "outlined"
                value = { confirmPassword }
                onChangeText = { setConfirmPassword }
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
                style = { styles.createAccountButton }
                contentStyle = {{ height: 60 }}
                labelStyle = {{ fontSize: 20 }}
                mode = "contained"
                onPress = { handleSignup }
            >
                Create Account
            </Button>
            <Button
                style = { styles.loginButton }
                contentStyle = {{ height: 60 }}
                labelStyle = {{ fontSize: 20 }}
                mode = "contained"
                onPress = {() => navigation.navigate('Login')}
            >
                Log In To Existing Account
            </Button>
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
        fontSize: 45,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        height: 60,
        marginBottom: 20,
        backgroundColor: '#212836',
        fontSize: 20,
    },
    createAccountButton: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#2563EB',
        marginTop: 6,
        marginBottom: 20,
        borderRadius: 12,
    },
    loginButton: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#334155',
        marginTop: 6,
        marginBottom: 20,
        borderRadius: 12,
    }
});