import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import FriendsScreen from '../screens/FriendsScreen';
import MapScreen from '../screens/MapScreen';
import StartStudySessionModal from './StartStudySessionModal';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ onPress }) => (
    <TouchableOpacity
        style = { styles.floatingButton }
        onPress = { onPress }
    >
        <View style = { styles.innerCircle }>
            <Image
                style = { styles.iconImage }
                source = { require('../../assets/icons/StudyBuddyLogo.png') }
            />
        </View>
    </TouchableOpacity>
)

const NavigationBar = () => {
    const [modalVisible, setModalVisible] = useState(false);
    
    const handleStartStudySession = () => {
        // Start a new study session
        console.log('Starting study session...');
    }

    return (
        <>
            <Tab.Navigator
                initialRouteName = "Home"
                screenOptions = {{
                    headerShown: false,
                    tabBarStyle: styles.tabBar,
                    tabBarShowLabel: true,
                    tabBarActiveTintColor: '#2563EB',
                    tabBarInactiveTintColor: 'white',
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: 'bold',
                    },
                    tabBarItemStyle: styles.tabItemContainer
                }}>
                    <Tab.Screen
                        name = "Home"
                        component = { HomeScreen }
                        options = {{
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons 
                                    name = "home" 
                                    color = { color } 
                                    size = { 30 } 
                                />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name = "Calendar"
                        component = { CalendarScreen }
                        options = {{
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons 
                                    name = "calendar" 
                                    color = { color } 
                                    size = { 30 } 
                                />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name = "Study"
                        component = { () => null }
                        options = {{
                            tabBarButton: () => 
                                <CustomTabBarButton 
                                    onPress = { () => setModalVisible(true) }
                                />,
                            tabBarItemStyle: [styles.tabItemContainer, { marginRight: 10, marginLeft: 10 }],
                        }}
                    />
                    <Tab.Screen
                        name = "Friends"
                        component = { FriendsScreen }
                        options = {{
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons 
                                    name = "account-group" 
                                    color = { color } 
                                    size = { 30 } 
                                />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name = "Map"
                        component = { MapScreen }
                        options = {{
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons 
                                    name = "map" 
                                    color = { color } 
                                    size = { 30 } 
                                />
                            ),
                        }}
                    />
            </Tab.Navigator>
            <StartStudySessionModal
                visible = { modalVisible }
                onClose = { () => setModalVisible(false) }
                onStartSession = { handleStartStudySession }
            />
        </>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: "#334155",
        height: '10%',
        position: "absolute",
        spacing: 100,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    floatingButton: {
        top: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        width: 100,
        height: 100,
        borderRadius: 45,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    iconImage: {
        height: 60,
        aspectRatio: 1.1,
    },
    tabItemContainer: {
        height: '120%',
        // borderColor: 'white',
        // borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
})

export default NavigationBar;