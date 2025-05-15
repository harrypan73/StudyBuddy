import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function FriendsScreen({ navigation }) {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [friends, setFriends] = useState([]);
    const [requests, setRequests] = useState([]);

    const token = useSelector(state => state.auth.token);
    console.log('Token:', token);

    useEffect(() => {
        console.log('Fetching friends and requests');
        if (token) {
            fetchFriends();
            fetchRequests();
        }
    }, [token]);

    useEffect(() => {
        console.log('Searching users');
        if (search) {
            searchUsers();
        } else {
            setSearchResults([]);
        }
    }, [search]);

    const fetchFriends = async () => {
        const response = await axios.get('http://localhost:5001/api/friendships/friends', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setFriends(response.data);
    };

    const fetchRequests = async () => {
        const response = await axios.get('http://localhost:5001/api/friendships/requests', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setRequests(response.data);
    };
    
    const searchUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/api/users/search?username=${search}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSearchResults(response.data);
        } catch (err) {
            console.error('Error searching users:', err);
            setSearchResults([]);
        }
    };

    return (
        <View style = { styles.container }>
            <View style = {{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }} >
                <Text style = { styles.title }>
                    Friends
                </Text>
            </View>
            <TextInput
                style = { styles.input }
                label = "Search"
                mode = "outlined"
                value = { search }
                onChangeText = { setSearch }
                theme = { styles.inputTheme }
            />
            { requests.length > 0 && (
                <>
                    <Text style = { styles.text }>Friend Requests:</Text>
                    <FlatList
                        data = { requests }
                        keyExtractor = { item => item.id }
                        renderItem = { ({ item }) => (
                            <View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>{item.username}</Text>
                                <Button title = 'Accept' onPress = { () => {} } />
                            </View>
                        )}
                    />
                </>
            )}
            <Text style = { styles.text }>Friends:</Text>
            <FlatList
                data = { friends }
                keyExtractor = { item => item.id }
                renderItem = { ({ item }) => (
                    <View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>{item.username}</Text>
                        <Button title = 'Message' onPress = { () => {} } />
                    </View>
                )}
            />
            <Text style = { styles.text }>Search Results:</Text>
            <FlatList
                style = { styles.searchResultList }
                data = { searchResults }
                keyExtractor = { item => item.id }
                renderItem = { ({ item }) => (
                    <View style = { styles.searchResultCard }>
                        <View style = {{ flex: 1.1, justifyContent: 'center', marginLeft: '1.5%' }}>
                            <View style = { styles.imageWrapper }>
                                <Image
                                    style = { styles.profileImage }
                                    source = {{ uri: item.profile_image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }}
                                />
                            </View>
                        </View>
                        <View style = {{ flex: 3, justifyContent: 'center',  }}>
                            <Text style = { styles.username }>{item.username}</Text>
                        </View>
                        <View style = {{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                            <Button title = 'Add Friend' onPress = { () => {} } />
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingHorizontal: 20,
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
    text: {
        color: 'white',
        fontSize: 18,
        marginBottom: 10
    },
    username: {
        color: 'white',
        fontSize: 18,
    },
    input: {
        width: '100%',
        height: 60,
        marginBottom: 20,
        backgroundColor: '#212836',
        fontSize: 20,
    },
    inputTheme: {
        colors: {
            outline: 'none',
            placeholder: '#747474',
            onSurface: 'white',
        },
        roundness: 12
    },
    searchResultList: {
        width: '100%',
        marginBottom: 20
    },
    searchResultCard: {
        flexDirection: 'row',
        width: '100%',
        height: 60,
        backgroundColor: '#334155',
        marginTop: 6,
        marginBottom: 20,
        borderRadius: 12,
    },
    imageWrapper: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'black',
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
});