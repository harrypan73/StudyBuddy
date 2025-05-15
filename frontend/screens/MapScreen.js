import React, { useEffect, useState } from 'react';
import { Alert, ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MapScreen({ navigation }) {
    const [location, setLocation] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get user's current location
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            console.log('Current location:', currentLocation);
            setLocation(currentLocation.coords);
        })();
    }, []);

    // Fetch active sessions from the server
    useEffect(() => {
        const fetchSessions = async () => {
            const token = await AsyncStorage.getItem('token');
            
            if (!token) {
            console.error('No token found, cannot fetch active sessions');
            return;
            }

            try {
                const response = await axios.get('http://localhost:5001/api/study-sessions/allActive', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setSessions(response.data);
                console.log('SESSIONS:', response.data);
            } catch (error) {
                console.error('Error fetching sessions:', error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSessions();
    }, []);

    if (!location || loading) {
        return (
            <View style = { styles.loading }>
                <ActivityIndicator size = 'large' />
            </View>
        )
    }

    return (
        <MapView
            style = { styles.map }
            showsUserLocation
            initialRegion = {{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }}
        >
            {sessions.map((session, index) => {
                if (!session.coordinates.lat || !session.coordinates.lng) {
                    return null;
                }
                const { lat, lng } = session.coordinates;
                
                const profile_image = session.userProfileImage || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
                
                return (
                    <Marker
                        key = { index }
                        coordinate = {{ latitude: lat, longitude: lng }}
                        title = { session.username.toUpperCase() }
                        description = { session.subject }
                    >
                        <View style = { styles.customMarker }>
                            <View style = { styles.imageWrapper }>
                                <Image
                                    source = {{ uri : profile_image }}
                                    style = { styles.profileImage }
                                />
                            </View>
                        </View>
                    </Marker>
                )
            })}
        </MapView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
    },
    map: {
        flex: 1,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    customMarker: {
        alignItems: 'center',
    },
    imageWrapper: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: '#ccc',
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        resideMode: 'cover',
    },
    placeholder: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#888',
    },
    point: {
        width: 0,
        height: 0,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderTopWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#ccc',
        marginTop: -1
    }
});