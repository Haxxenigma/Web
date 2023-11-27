import axios from '@/configs/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUserData = createAsyncThunk('user', async (_, thunkApi) => {
    try {
        const res = await axios.get('/user');
        if (res.data.name) return res.data;
    } catch (error) {
        thunkApi.rejectWithValue(error);
    }
});