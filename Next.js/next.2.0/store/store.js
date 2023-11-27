import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userSlice } from '@/store/user/user.slice';
import { exampleSlice } from '@/store/example/example.slice';

const reducers = combineReducers({
    user: userSlice.reducer,
    example: exampleSlice.reducer,
});

export const store = configureStore({
    reducer: reducers,
});