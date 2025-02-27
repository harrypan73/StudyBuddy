import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EndStudySessionScreen({ navigation }) {
    const [location, setLocation] = useState('');
    const [subject, setSubject] = useState('');

    return (
        <View style = { styles.container }>
            <TextInput
                style = { styles.input }
                label = "Rating"
                mode = "outlined"
                value = { location }
                onChangeText = { setLocation }
                theme = { styles.inputTheme }
            />

            <TextInput
                style = { styles.input }
                label = "Notes"
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
                    style = { styles.endStudySessionButton }
                    contentStyle = {{ height: 60 }}
                    labelStyle = {{ fontSize: 20 }}
                    mode = "contained"
                    onPress = {() => {}}
                >
                    End Study Session
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
    endStudySessionButton: {
        width: '63%',
        justifyContent: 'center',
        backgroundColor: '#FA7070',
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