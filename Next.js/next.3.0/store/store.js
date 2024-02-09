import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from '@/store/user.slice';

export const store = configureStore({
    reducer: {
        user: userSliceReducer,
    },
});