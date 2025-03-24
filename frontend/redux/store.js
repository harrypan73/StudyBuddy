import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import studySessionReducer from './studySessionSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        studySession: studySessionReducer,
    }
})