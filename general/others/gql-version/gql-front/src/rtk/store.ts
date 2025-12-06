import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";
import userNameReducer from "./userNameSlice";
import signUpReducer from "./flagSignUpSlice";
import logInReducer from "./flagLogInSlice";
import categoryAndBannersReducer from "./category&banners";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    userName: userNameReducer,
    openSignUp: signUpReducer,
    openLogIn: logInReducer,
    categoryAndBanners: categoryAndBannersReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
