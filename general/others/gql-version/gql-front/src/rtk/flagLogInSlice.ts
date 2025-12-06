import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface LogInSlice {
  flag: boolean;
}

const initialState: LogInSlice = {
  flag: false,
};

export const logInSlice = createSlice({
  name: "flagLogIn",
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.flag = action.payload;
    },
  },
});

export const {setOpen} = logInSlice.actions;
export default logInSlice.reducer;
