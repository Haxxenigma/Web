import { createSlice } from '@reduxjs/toolkit';
import { exampleAction } from './example.actions';

export const exampleSlice = createSlice({
    name: 'example',
    initialState: {
        isLoading: true,
        error: null,
        example: null,
    },
    extraReducers: builder => {
        builder
            .addCase(exampleAction.pending, state => {
                state.isLoading = true
            })
            .addCase(exampleAction.fulfilled, (state, action) => {
                state.isLoading = false
                state.example = action.payload
            })
            .addCase(exampleAction.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload.error
                state.example = {}
            });
    },
});