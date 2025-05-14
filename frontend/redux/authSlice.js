import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;

export const loginUser = (email, password) => async dispatch => {
    try {
        console.log("Logging in user with email: ", email);
        const res = await axios.post('http://localhost:5001/api/auth/login', { email, password });
        const { token, user } = res.data;
        await AsyncStorage.setItem('token', token);
        dispatch(loginSuccess({ token, user }));
    } catch (err) {
        console.error("Error logging in: ", err);

        if (err.response && err.response.data && err.response.data.message) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error("Login failed, please try again");
        }
    }
};

export const signupUser = (username, email, password) => async dispatch => {
    try {
        console.log("Signing up user with email: ", email);
        const res = await axios.post('http://localhost:5001/api/auth/signup', { username, email, password });
        const { token, user } = res.data;
        await AsyncStorage.setItem('token', token);
        dispatch(loginSuccess({ token, user }));
    } catch (err) {
        console.error("Error signing up: ", err);

        if (err.response && err.response.data && err.response.data.message) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error("Signup failed, please try again");
        }
    }
}

export const logoutUser = () => async dispatch => {
    console.log("Logging out user");
    await AsyncStorage.removeItem('token');
    dispatch(logout());
}

export default authSlice.reducer;