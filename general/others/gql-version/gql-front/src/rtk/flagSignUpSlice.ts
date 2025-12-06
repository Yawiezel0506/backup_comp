import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface SignUpSlice {
  flag: boolean;
}

const initialState: SignUpSlice = {
  flag: false,
};

export const signUpSlice = createSlice({
  name: "flagSignUP",
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.flag = action.payload;
    },
  },
});

export const {setOpen} = signUpSlice.actions;
export default signUpSlice.reducer;
