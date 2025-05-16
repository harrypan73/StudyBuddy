import React, { useEffect, useState } from 'react';
import { Button, FlatList, SectionList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function FriendsScreen({ navigation }) {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [friends, setFriends] = useState([]);
    const [requests, setRequests] = useState([]);
    const [outgoingRequests, setOutgoingRequests] = useState([]);

    const token = useSelector(state => state.auth.token);
    console.log('Token:', token);

    useEffect(() => {
        console.log('Fetching friends and requests');
        if (token) {
            fetchFriends();
            fetchRequests();
            fetchOutgoingRequests();
            searchUsers();
        }
    }, [token]);

    useEffect(() => {
        console.log('Searching users');
        searchUsers();
    }, [search]);

    const fetchAll = async () => {
        fetchFriends();
        fetchRequests();
        fetchOutgoingRequests();
        searchUsers();
    }

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

    const fetchOutgoingRequests = async () => {
        const response = await axios.get('http://localhost:5001/api/friendships/outgoingRequests', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setOutgoingRequests(response.data);
    };
    
    const searchUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/api/users/search?username=${search}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Filter out the current friends or requests from the search results
            const filteredResponse = await axios.post(`http://localhost:5001/api/friendships/filterUnrelated`, {
                users: response.data
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setSearchResults(filteredResponse.data);
        } catch (err) {
            console.error('Error searching users:', err);
            setSearchResults([]);
        }
    };

    const sendFriendRequest = async (recipientId) => {
        try {
            const response = await axios.post('http://localhost:5001/api/friendships/send', {
                recipientId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Friend request sent:', response.data);
            fetchAll();
        } catch (err) {
            console.error('Error sending friend request:', err);
        }
    };

    const cancelFriendRequest = async (recipientId) => {
        try {
            const response = await axios.post('http://localhost:5001/api/friendships/cancel', {
                recipientId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Friend request cancelled:', response.data);
            fetchAll();
        } catch (err) {
            console.error('Error cancelling friend request:', err);
        }
    }

    const acceptFriendRequest = async (requesterId) => {
        try {
            const response = await axios.post('http://localhost:5001/api/friendships/accept', {
                requesterId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Friend request accepted:', response.data);
            fetchAll();
        } catch (err) {
            console.error('Error accepting friend request:', err);
        }
    }

    const rejectFriendRequest = async (requesterId) => {
        try {
            const response = await axios.post('http://localhost:5001/api/friendships/reject', {
                requesterId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Friend request rejected:', response.data);
            fetchAll();
        } catch (err) {
            console.error('Error rejecting friend request:', err);
        }
    };

    const unfriend = async (friendId) => {
        try {
            const response = await axios.post('http://localhost:5001/api/friendships/unfriend', {
                friendId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Unfriended:', response.data);
            fetchAll();
        } catch (err) {
            console.error('Error unfriending:', err);
        }
    }

    const sections = [
        requests.length > 0 && { title: 'Friend Requests', data: requests, type: 'request' },
        outgoingRequests.length > 0 && { title: 'Outgoing Requests', data: outgoingRequests, type: 'outgoing' },
        friends.length > 0 && { title: 'Friends', data: friends, type: 'friend' },
        { title: 'Add Friends', data: searchResults, type: 'search' }
    ].filter(Boolean);

    const renderItem = ({ item, section }) => {
        const image = item.profile_image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

        return (
            <View style={styles.cardStyle}>
                <View style={{ flex: 1.1, justifyContent: 'center', marginLeft: '3%' }}>
                    <View style={styles.imageWrapper}>
                        <Image style={styles.profileImage} source={{ uri: image }} />
                    </View>
                </View>
                <View style={{ flex: 3, justifyContent: 'center' }}>
                    <Text style={styles.username}>{item.username}</Text>
                </View>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    {section.type === 'request' && (
                        <>
                            <TouchableOpacity style = { styles.acceptButton } onPress={() => acceptFriendRequest(item.id)}>
                                <Text style = { styles.buttonsText }>ACCEPT</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = { styles.removeButton } onPress={() => rejectFriendRequest(item.id)}>
                                <Text style = { styles.buttonsText }>DECLINE</Text>
                            </TouchableOpacity>
                        </>
                    )}
                    {section.type === 'outgoing' && (
                        <TouchableOpacity style = { styles.removeButton } onPress={() => cancelFriendRequest(item.id)}>
                            <Text style = { styles.buttonsText }>CANCEL</Text>
                        </TouchableOpacity>
                    )}
                    {section.type === 'friend' && (
                        <TouchableOpacity style = { styles.removeButton } onPress={() => unfriend(item.id)}>
                            <Text style = { styles.buttonsText }>UNFRIEND</Text>
                        </TouchableOpacity>
                    )}
                    {section.type === 'search' && (
                        <TouchableOpacity style = { styles.addFriendButton } onPress={() => sendFriendRequest(item.id)}>
                            <Text style = { styles.buttonsText }>ADD FRIEND</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style = {{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }} >
                 <Text style = { styles.title }>
                     Friends
                 </Text>
             </View>
            <TextInput
                style={styles.input}
                label="Search"
                mode="outlined"
                value={search}
                onChangeText={setSearch}
                theme={styles.inputTheme}
            />
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.text}>{title}:</Text>
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
        // justifyContent: 'center',
        // alignItems: 'center',
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
    listStyle: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'white'
    },
    cardStyle: {
        flexDirection: 'row',
        width: '100%',
        height: 80,
        backgroundColor: '#334155',
        marginVertical: 6,
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
        resizeMode: 'cover',
    },
    buttonsText: {
        color: 'white',
    },
    acceptButton: {
        backgroundColor: '#4FE0B2',
        borderRadius: 12,
        padding: 5,
        alignItems: 'center',
        width: '80%'
    },
    removeButton: {
        backgroundColor: '#FA7070',
        borderRadius: 12,
        padding: 5,
        alignItems: 'center',
        width: '80%'
    },
    addFriendButton: {
        backgroundColor: '#88D069',
        borderRadius: 12,
        padding: 5,
        alignItems: 'center',
        width: '80%'
    },
});