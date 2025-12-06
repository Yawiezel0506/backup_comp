import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserRegister } from "../interfaces/users";

interface UserNameSlice {
  flag: boolean;
  userName: string ;
  userId: string ;
  firstName: string ;
  lastName: string ;
  email: string;
}

const initialState: UserNameSlice = {
  flag: false,
  userName: '',
  userId: '',
  firstName: '',
  lastName: '',
  email: ''
};

export const userNameSlice = createSlice({
  name: "userName",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<UserRegister>) => {
      state.userName = action.payload.username;
      state.flag = true;
      state.userId = action.payload._id
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.email = action.payload.email
    },
    resetUserName: (state) => {
      state.flag = false
      state.userName = ''
      state.userId = ''
      state.firstName = ''
      state.lastName = ''
      state.email = ''
      localStorage.removeItem('email')
      localStorage.removeItem('password')
    },
  },
});

export const { setUserName, resetUserName } = userNameSlice.actions;
export default userNameSlice.reducer;
