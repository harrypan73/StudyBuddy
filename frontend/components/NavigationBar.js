import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import FriendsScreen from '../screens/FriendsScreen';
import MapScreen from '../screens/MapScreen';
import StartStudySessionModal from './StartStudySessionModal';

const Stack = createStackNavigator();

const CustomBottomNavigationBar = ({ navigation, onStartStudySession }) => {

    return (
        <View style = { styles.navBarStyle }>
            <TouchableOpacity 
                style = { styles.tabStyle }
                onPress = { () => navigation.navigate('Home')}
            >
                <MaterialCommunityIcons 
                    name = "home" 
                    size = { 30 }
                    color = 'white'
                />
                <Text style = {{ color: 'white' }}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style = { styles.tabStyle }
                onPress = { () => navigation.navigate('Calendar')}
            >
                <MaterialCommunityIcons 
                    name = "calendar" 
                    size = { 30 }
                    color = 'white'
                />
                <Text style = {{ color: 'white' }}>Calendar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style = { styles.floatingButton }
                onPress = { onStartStudySession }
            >
                <View style = { styles.innerCircle }>
                    <Image
                        style = { styles.iconImage }
                        source = { require('../../assets/icons/StudyBuddyLogo.png') }
                    /> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                style = { styles.tabStyle }
                onPress = { () => navigation.navigate('Friends')}
            >
                <MaterialCommunityIcons 
                    name = "account-group" 
                    size = { 30 }
                    color = 'white'
                />
                <Text style = {{ color: 'white' }}>Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style = { styles.tabStyle }
                onPress = { () => navigation.navigate('Map')}
            >
                <MaterialCommunityIcons 
                    name = "map" 
                    size = { 30 }
                    color = 'white'
                />
                <Text style = {{ color: 'white' }}>Map</Text>
            </TouchableOpacity>
        </View>
    )
};

const NavigationBar = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    return (
        <View style = {{ flex: 1 }}>
            <CustomBottomNavigationBar navigation = { navigation } onStartStudySession = { () => setModalVisible(true) } />

            <StartStudySessionModal
                visible = { modalVisible }
                onClose = { () => setModalVisible(false) }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    navBarStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#334155',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    tabStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'pink',
        flex: 1,
        height: '100%',
        // borderWidth: 2,
    },
    floatingButton: {
        top: -25,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    innerCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: '#334155',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        // shadowColor: 'black',
        // shadowOpacity: 0.5,
        // shadowRadius: 5,
        // elevation: 5,
    },
    iconImage: {
        height: 50,
        aspectRatio: 1.1,
    },
});

export default NavigationBar;