import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
    accessToken: string | null;
    isAuth: boolean;
    user: [] | null | any
}
const initialState:AuthState = {
    user: [],
    isAuth: false,
    accessToken: ""
    
}

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
              state.user = user;
              state.isAuth = true;
              state.accessToken = token;
        },
        logOut: (state, action:PayloadAction) => {
      state.user = null;
            state.accessToken = null;
            state.isAuth = false;
    },
  },
});

export const { setCredentials,logOut} = globalSlice.actions
export default globalSlice.reducer