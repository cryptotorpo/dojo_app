import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isLoggedIn: boolean;
  dojoPrice: number;
  name: string;
  email: string;
  profilePicture: string;
}

const initialState: UserState = {
  isLoggedIn: false,
  dojoPrice: 0,
  name: "",
  email: "",
  profilePicture: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setDojoPrice: (state, action: PayloadAction<number>) => {
      state.dojoPrice = action.payload;
    },
    setUserInfo: (
      state,
      action: PayloadAction<{
        name: string;
        email: string;
        profilePicture: string;
      }>
    ) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.profilePicture = action.payload.profilePicture;
    },
  },
});

export const { setIsLoggedIn, setDojoPrice, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
