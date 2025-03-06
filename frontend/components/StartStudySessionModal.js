import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function StartStudySessionModal({ visible, onClose, onStartSession }) {
    const [location, setLocation] = useState('');
    const [subject, setSubject] = useState('');

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
                            onPress = { onStartSession }
                        >
                            Start Study Session
                        </Button>
                        <Button
                            style = { styles.cancelButton }
                            contentStyle = {{ height: 60 }}
                            labelStyle = {{ fontSize: 20 }}
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
        width: '80%',
        backgroundColor: '#1E1E1E',
        padding: 20,
        borderRadius: 12,
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        marginBottom: 15,
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
        marginTop: 10,
    },
    startStudySessionButton: {
        flex: 1,
        marginRight: 5,
        backgroundColor: '#32AA72',
    },
    cancelButton: {
        flex: 1,
        marginLeft: 5,
        backgroundColor: '#334155',
    },
})