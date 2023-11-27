import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchUserData = userId => new Promise(resolve => {
    setTimeout(() => {
        resolve({ id: 1, name: 'Max' });
    }, 1000);
});

export const exampleAction = createAsyncThunk('example', async (userId, thunkApi) => {
    try {
        const res = await fetchUserData(userId);
        return res;
    } catch (err) {
        thunkApi.rejectWithValue(err);
    }
});