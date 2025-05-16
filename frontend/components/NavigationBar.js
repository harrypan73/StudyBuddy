import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useNavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StartModal from './StudySessionModal';

const Stack = createStackNavigator();

const CustomBottomNavigationBar = ({ navigation, activeSession, openStudySessionModal }) => {
    const currentRoute = useNavigationState(state => state?.routes[state.index]?.name);
    const navigateIfNotCurrent = (targetRoute) => {
        if (currentRoute !== targetRoute) {
            navigation.reset({
                index: 0,
                routes: [{ name: targetRoute }],
            });
        }
    };

    console.log("CustomBottomNavigationBar rendered");
    return (
        <View style = { styles.navBarStyle }>
            <TouchableOpacity 
                style = { styles.tabStyle }
                onPress = { () => navigateIfNotCurrent('Home') }
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
                onPress = { () => navigateIfNotCurrent('Calendar') }
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
                onPress = { openStudySessionModal }
            >
                <View style = { activeSession ? styles.innerCircleActive : styles.innerCircle }>
                    <Image
                        style = { styles.iconImage }
                        source = { require('../../assets/icons/StudyBuddyLogo.png') }
                    /> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                style = { styles.tabStyle }
                onPress = { () => navigateIfNotCurrent('Friends') }
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
                onPress = { () => navigateIfNotCurrent('Map') }
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
    const activeSession = useSelector((state) => state.studySession.activeSession);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    return (
        <View style = {{ flex: 1 }}>
            <CustomBottomNavigationBar navigation = { navigation } activeSession = { activeSession } openStudySessionModal = { () => setModalVisible(true) } />

            <StartModal
                visible = { modalVisible }
                onClose = { () => setModalVisible(false) }
                mode = { activeSession ? 'end' : 'start' }
                activeSession = { activeSession }
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
    },
    innerCircleActive: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: '#334155',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconImage: {
        height: 50,
        aspectRatio: 1.1,
    },
});

export default NavigationBar;