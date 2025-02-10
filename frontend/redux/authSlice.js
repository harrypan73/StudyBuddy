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
        const res = await axios.post('http://localhost:5001/api/auth/login', { email, password });
        const { token, user } = res.data;
        await AsyncStorage.setItem('token', token);
        dispatch(loginSuccess({ token, user }));
    } catch (err) {
        console.error(err);
    }
};

export const signupUser = (username, email, password) => async dispatch => {
    try {
        const res = await axios.post('http://localhost:5001/api/auth/signup', { username, email, password });
        const { token, user } = res.data;
        await AsyncStorage.setItem('token', token);
        dispatch(loginSuccess({ token, user }));
    } catch (err) {
        console.error(err);
    }
}

export const logoutUser = () => async dispatch => {
    await AsyncStorage.removeItem('token');
    dispatch(logout());
}

export default authSlice.reducer;