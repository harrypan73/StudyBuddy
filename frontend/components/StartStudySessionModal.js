import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StartStudySessionModal({ visible, onClose }) {
    const [location, setLocation] = useState('');
    const [subject, setSubject] = useState('');

    const handleStartStudySession = async () => {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
            Alert.alert('Authentication Error', 'Please log in again');
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/api/study-sessions/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    startTime: new Date(),
                    location: location,
                    coordinates: {
                        lat: 0, // Replace with actual latitude
                        lng: 0, // Replace with actual longitude
                    },
                    subject: subject,
                })
            });

            if (response.ok) {
                Alert.alert('Success', 'Study session created successfully');
                onClose();
                setLocation('');
                setSubject('');
            } else {
                Alert.alert('Error', 'Failed to create study session');
            }
        } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Server error');
        }
    }

    return (
        <Modal
            visible = { visible }
            transparent = { true }
            animationType = 'fade'
            onRequestClose={ onClose }
        >
            <View style = { styles.overlay }>
                <View style = { styles.modalContainer }>
                    <Text style = { styles.title }>Start Study Session</Text>
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
                        style = { styles.buttonContainer }
                    >
                        <Button
                            style = { styles.startStudySessionButton }
                            contentStyle = {{ height: 48}}
                            labelStyle = {{ fontSize: 20, fontWeight: 'bold', marginHorizontal: 10 }}
                            mode = "contained"
                            onPress = { handleStartStudySession }
                        >
                            Start Session
                        </Button>
                        <Button
                            style = { styles.cancelButton }
                            contentStyle = {{ height: 48 }}
                            labelStyle = {{ fontSize: 20, fontWeight: 'bold', marginHorizontal: 10 }}
                            mode = "contained"
                            onPress = { onClose }
                        >
                            Cancel
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: '#1E1E1E',
        padding: 20,
        borderRadius: 12,
        paddingVertical: 30,
    },
    title: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    input: {
        width: '100%',
        // height: 48,
        marginBottom: 16,
        backgroundColor: '#2C2C2C',
    },
    inputTheme: {
        colors: {
            outline: 'none',
            placeholder: '#747474',
            onSurface: 'white',
        },
        roundness: 12,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
        marginTop: 4,
    },
    startStudySessionButton: {
        flex: 2,
        backgroundColor: '#32AA72',
        borderRadius: 12,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#334155',
        borderRadius: 12,
    },
})