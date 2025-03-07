import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CalendarScreen({ navigation }) {
    return (
        <View style = { styles.container }>
            <Text>Calendar Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
    },
});