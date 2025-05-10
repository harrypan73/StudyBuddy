import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const getToken = async () => await AsyncStorage.getItem('token');

export const fetchSessions = createAsyncThunk('sessions/fetchAll', async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get('http://localhost:5001/api/study-sessions/all', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
})

export const studySessionSlice = createSlice({
    name: 'studySession',
    initialState: {
        sessions: [],
        activeSession: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        setActiveSession: (state, action) => {
            state.activeSession = action.payload;
        },
        clearActiveSession: (state) => {
            state.activeSession = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSessions.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchSessions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.sessions = action.payload;
            })
            .addCase(fetchSessions.rejected), (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            }
    }
});

export const { setActiveSession, clearActiveSession } = studySessionSlice.actions;
export default studySessionSlice.reducer;