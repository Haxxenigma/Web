import { createSlice } from '@reduxjs/toolkit';
import { getUserData } from './user.actions';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoading: true,
        error: null,
        user: null,
    },
    extraReducers: builder => {
        builder
            .addCase(getUserData.pending, state => {
                state.isLoading = true
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload.error
                state.user = {}
            });
    },
});