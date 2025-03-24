import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const studySessionSlice = createSlice({
    name: 'studySession',
    initialState: {
        activeSession: null
    },
    reducers: {
        setActiveSession: (state, action) => {
            state.activeSession = action.payload;
        },
        clearActiveSession: (state) => {
            state.activeSession = null;
        },
    }
});

export const { setActiveSession, clearActiveSession } = studySessionSlice.actions;
export default studySessionSlice.reducer;