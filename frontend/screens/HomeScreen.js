import React, { useState, useEffect } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/authSlice';
import { fetchSessions } from '../redux/studySessionSlice';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

function formatElapsedTime(startTime, endTime) {
    const elapsedMs = endTime ? (new Date(endTime).getTime() - new Date(startTime).getTime()) 
                    : (new Date().getTime() - new Date(startTime).getTime());

    const hours = Math.floor(elapsedMs / 3600000);
    const minutes = Math.floor((elapsedMs % 3600000) / 60000);
    const seconds = Math.floor((elapsedMs % 60000) / 1000);

    return (hours > 0 ? `${hours}h ` : '') +
           (minutes > 0 ? `${minutes}m ` : '') +
            `${seconds}s`;
}

const SessionCard = ({ session }) => {
    const elapsedTime = formatElapsedTime(session.startTime, session.endTime);
    const cardStyle = [
        styles.sessionCard,
        { backgroundColor: session.isActive ? '#32AA72' : '#212836' },
    ];

    return (
        <View style = { cardStyle }>
            <View style = { styles.cardLeft }>
                <Text style = { styles.sessionText }>
                    {session.username.toUpperCase()} {session.isActive ? 'is studying' : 'studied'}
                </Text>
                <Text style = { styles.sessionText }>Time Elapsed:{'\n'}{elapsedTime}</Text>
                <Text style = { styles.sessionText }>Location:{'\n'}{session.location}</Text>
            </View>
            <View style = { styles.cardRight }>
                <View style = { styles.emptyPhoto }>
                    <MaterialCommunityIcons 
                        name = "camera" 
                        size = { 50 }
                        color = 'black'
                    />
                    <Text style = {{ color: 'black' }}>No photo</Text>
                </View>
            </View>
        </View>
    );
}

export default function HomeScreen({ navigation, setIsLoggedIn }) {
    console.log("Home screen rendered");
    const dispatch = useDispatch();
    const { activeSession, sessions, status } = useSelector(state => state.studySession);

    // State to trigger re-render every 5 seconds
    const [updateFlag, setUpdateFlag] = useState(false);

    // Fetch sessions when the screen is focused
    useFocusEffect(
        useCallback(() => {
            // Fetch sessions when screen is focused
            dispatch(fetchSessions());

            // Set up the interval
            const interval = setInterval(() => {
                setUpdateFlag(prev => !prev);
            }, 5000);

            // Clear interval when screen is unfocused
            return () => clearInterval(interval);
        }, [dispatch])
    );

    const allSessions = [];
    if (activeSession) {
        allSessions.push({...activeSession, _id: 'active-session'});
    }
    allSessions.push(...sessions.map(session => ({...session, _id: session._id})));

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
            <View style = {{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }} >
                <Text style = { styles.title }>
                    StudyBuddy
                </Text>
                <TouchableOpacity onPress = { handleLogout } style = {{ position: 'absolute', right: '5%' }}>
                    <MaterialCommunityIcons
                        name = "logout"
                        size = { 30 }
                        color = 'white'
                    />
                </TouchableOpacity>
                {/* <Button title = "Log Out" onPress = {handleLogout} /> */}
            </View>
            <FlatList
                style = { styles.sessionList }
                contentContainerStyle={{  }}
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
        paddingTop: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    title: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1
    },
    sessionList: {
        width: '100%',
        marginBottom: 100
    },
    sessionCard: {
        flexDirection: 'row',
        padding: 16,
        marginVertical: 8,
        borderRadius: 10,
        width: '90%',
        alignSelf: 'center',
        borderColor: 'white',
        borderWidth: 1,
        height: 200,
    },
    cardLeft: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    cardRight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sessionText: {
        fontSize: 16,
        color: 'white',
        marginBottom: 16,
    },
    emptyPhoto: {
        width: '100%',
        height: '80%',
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});