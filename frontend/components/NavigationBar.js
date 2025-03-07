import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CustomBottomNavigationBar = ({ onStartStudySession }) => {
    const navigation = useNavigation();

    return (
        <View style = { styles.navBarStyle }>
            <TouchableOpacity style = { styles.tabStyle }>
                <MaterialCommunityIcons 
                    name = "home" 
                    size = { 30 }
                    color = 'white'
                />
                <Text style = {{ color: 'white' }}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style = { styles.tabStyle }>
                <MaterialCommunityIcons 
                    name = "calendar" 
                    size = { 30 }
                    color = 'white'
                />
                <Text style = {{ color: 'white' }}>Calendar</Text>
            </TouchableOpacity>
            <TouchableOpacity style = { styles.floatingButton }>
                <View style = { styles.innerCircle }>
                    <Image
                        style = { styles.iconImage }
                        source = { require('../../assets/icons/StudyBuddyLogo.png') }
                    /> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity style = { styles.tabStyle }>
                <MaterialCommunityIcons 
                    name = "account-group" 
                    size = { 30 }
                    color = 'white'
                />
                <Text style = {{ color: 'white' }}>Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity style = { styles.tabStyle }>
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

const styles = StyleSheet.create({
    navBarStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        bottom: 0,
        width: '100%',
        height: '12%',
        position: 'absolute',
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

export default CustomBottomNavigationBar;