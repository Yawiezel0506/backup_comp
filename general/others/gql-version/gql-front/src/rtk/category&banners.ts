import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category } from "../interfaces/category";



interface LogInSlice {
  category: Category[];
  banners: [];
}

const initialState: LogInSlice = {
  category: [],
  banners: [],
};

export const categoryAndBanners = createSlice({
  name: "category&banners",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Category[]>) => {
      state.category = action.payload;
    },
    setBanners: (state, action: PayloadAction<[]>) => {
      state.banners = action.payload;
    },
  },
});

export const { setBanners, setCategory } = categoryAndBanners.actions;
export default categoryAndBanners.reducer;
