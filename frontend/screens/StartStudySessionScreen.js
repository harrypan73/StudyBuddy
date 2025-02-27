import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StartStudySessionScreen({ navigation }) {
    const [location, setLocation] = useState('');
    const [subject, setSubject] = useState('');

    return (
        <View style = { styles.container }>
            <TextInput
                style = { styles.input }
                label = "Location"
                mode = "outlined"
                value = { location }
                onChangeText = { setLocation }
                theme = { styles.inputTheme }
            />

            <TextInput
                style = { styles.input }
                label = "Subject"
                mode = "outlined"
                value = { subject }
                onChangeText = { setSubject }
                theme = { styles.inputTheme }
            />

            <View
                style = {{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                }}
            >
                <Button
                    style = { styles.startStudySessionButton }
                    contentStyle = {{ height: 60 }}
                    labelStyle = {{ fontSize: 20 }}
                    mode = "contained"
                    onPress = {() => {}}
                >
                    Start Study Session
                </Button>
                <Button
                    style = { styles.cancelButton }
                    contentStyle = {{ height: 60 }}
                    labelStyle = {{ fontSize: 20 }}
                    mode = "contained"
                    onPress = {() => {}}
                >
                    Cancel
                </Button>
            </View>
        </View>
    )
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
    inputTheme: {
        colors: {
            outline: 'none',
            placeholder: '#747474',
            onSurface: 'white',
        },
        roundness: 12
    },
    startStudySessionButton: {
        width: '63%',
        justifyContent: 'center',
        backgroundColor: '#32AA72',
        marginTop: 6,
        marginBottom: 20,
        borderRadius: 12,
    },
    cancelButton: {
        justifyContent: 'center',
        backgroundColor: '#334155',
        marginTop: 6,
        marginBottom: 20,
        borderRadius: 12,
    },
})