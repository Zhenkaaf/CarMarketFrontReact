import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IRegisterUserData } from "../../types";

interface IMyErrorPayload {
  response: {
    data: {
      message: string;
    };
  };
}

interface IUserState {
  user: null;
  isUserAuth: boolean;
  isUserLoading: boolean;
  loginError: boolean;
  registerError: string | null;
}

export const registrationAct = createAsyncThunk(
  "user/registrationAct",
  async (userData: IRegisterUserData, { rejectWithValue }) => {
    try {
      console.log("createAsyncThunk*START");
      const response = await axios.post(
        "https://excited-pantyhose-fox.cyclic.app/api/registration",
        userData
      );
      console.log("createAsyncThunk*END");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginAct = createAsyncThunk(
  "user/loginAct",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://excited-pantyhose-fox.cyclic.app/api/auth/login",

        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: IUserState = {
  user: null,
  isUserAuth: false,
  isUserLoading: false,
  loginError: false,
  registerError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOutAct: (state) => {
      state.user = null;
    },
    setUserLoadingAct: (state, action) => {
      state.isUserLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAct.pending, (state) => {
        state.isUserLoading = true;
        state.loginError = false;
      })
      .addCase(loginAct.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isUserLoading = false;
        state.isUserAuth = true;
      })
      .addCase(loginAct.rejected, (state) => {
        state.isUserLoading = false;
        state.loginError = true;
      })
      //RegistrationAct
      .addCase(registrationAct.pending, (state) => {
        state.isUserLoading = true;
        state.registerError = null;
      })
      .addCase(registrationAct.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isUserLoading = false;
        state.isUserAuth = true;
      })
      .addCase(registrationAct.rejected, (state, action) => {
        const payload = action.payload as IMyErrorPayload;
        if (
          payload &&
          payload.response &&
          payload.response.data &&
          payload.response.data.message
        ) {
          state.registerError = payload.response.data.message;
        } else {
          state.registerError = "Unknown error occurred";
        }
        state.isUserLoading = false;
      });
  },
});

export const { signOutAct, setUserLoadingAct } = userSlice.actions;

export default userSlice.reducer;
