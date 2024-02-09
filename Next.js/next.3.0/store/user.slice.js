import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        error: null,
        isLoading: true,
    },
    reducers: {
        storeUser: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { storeUser } = userSlice.actions;

export default userSlice.reducer;