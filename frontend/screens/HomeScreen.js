import React, { useEffect } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/authSlice';
import { fetchSessions } from '../redux/studySessionSlice';

const SessionCard = ({ session }) => {
    return (
        <View style = {{ padding: 16, margin: 8, backgroundColor: session.endTime != null ? 'green' : 'f0f0f0', borderRadius: 10}}>
            <Text>{session.endTime == null ? 'Active' : 'Inactive'} Session</Text>
            <Text>Start: {new Date(session.startTime).toLocaleString()}</Text>
            {session.endTime != null && <Text>End: {new Date(session.endTime).toLocaleString()}</Text>}
            <Text>Location: {session.location}</Text>
        </View>
    )
}

export default function HomeScreen({ navigation, setIsLoggedIn }) {
    console.log("Home screen rendered");
    const dispatch = useDispatch();
    const { activeSession, sessions, status } = useSelector(state => state.studySession);

    useEffect(() => {
        dispatch(fetchSessions());
    }, []);

    const allSessions = [];
    if (activeSession) {
        console.log('DISPLAY ACTIVE:', activeSession);
        allSessions.push({...activeSession, _id: 'active-session'});
    }
    allSessions.push(...sessions.map(session => ({...session, _id: session._id})));
    console.log('DISPLAY ALL SESSIONS:', allSessions);

    const handleLogout = () => {
        // Log the user out and navigate to the Login screen
        dispatch(logoutUser())
            .then(() => {
                setIsLoggedIn(false);
                navigation.navigate('Login');
            })
            .catch((err) => {
                console.error(err);
                Alert.alert('Error', 'Logout failed, please try again');
            })
    }

    return (
        <View style = { styles.container }>
            <Button title = "Log Out" onPress = {handleLogout} />
            <FlatList
                data = { allSessions }
                keyExtractor = {(item) => item._id}
                renderItem = {({ item }) => (
                    <SessionCard session = { item } />
                )}
                ListEmptyComponent = {() => (
                    <Text>No study sessions found</Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
    },
});