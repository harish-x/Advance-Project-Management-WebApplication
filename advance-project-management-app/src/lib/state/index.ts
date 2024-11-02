import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  accessToken: string | null;
  isAuth: boolean;
  user: [] | null | any;
}

const initialState: AuthState = {
  user: [],
  isAuth: false,
  accessToken: "noverifiedtoken",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, ...user } = action.payload;
      state.user = user;
      state.isAuth = true;
      state.accessToken = accessToken;
      sessionStorage.setItem("access", accessToken);
    },
    logOut: (state, action: PayloadAction) => {
      state.user = null;
      state.accessToken = null;
      state.isAuth = false;
      sessionStorage.removeItem("access");
    },
  },
});

export const { setCredentials, logOut } = globalSlice.actions;
export default globalSlice.reducer;
