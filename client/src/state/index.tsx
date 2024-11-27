import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface initialStateTypes {
    isLangue: string;
}

const initialState: initialStateTypes = {
    isLangue: 'vi',
};

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setIsLangue: (state, action: PayloadAction<string>) => {
            state.isLangue = action.payload;
        },
    },
});

export const { setIsLangue } = globalSlice.actions;

export default globalSlice.reducer;
