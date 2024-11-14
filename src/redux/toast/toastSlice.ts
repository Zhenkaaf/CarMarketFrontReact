import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IToastState {
    welcomeToastShown: boolean;
}

const initialState: IToastState = {
    welcomeToastShown: false,
};

const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        setWelcomeToastShown(state, action: PayloadAction<boolean>) {
            state.welcomeToastShown = action.payload;
        },
    },
});

export const { setWelcomeToastShown } = toastSlice.actions;
export default toastSlice.reducer;