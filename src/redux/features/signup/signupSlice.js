import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    entities: []
};

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        userAdded(state, action) {
            state.entities.push(action.payload)
        },
        updatePassword: (state, { payload }) => {
            state.entities = payload;
        },
        updateUser: (state, { payload }) => {
            state.entities = payload;
        }
    },
});

export const { updatePassword, userAdded, updateUser } = signupSlice.actions;
export default signupSlice.reducer;
