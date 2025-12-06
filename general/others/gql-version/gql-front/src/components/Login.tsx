import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "../rtk/hooks";
import { setOpen as setOpenSignUp } from "../rtk/flagSignUpSlice";
import { setOpen as setOpenLogIn } from "../rtk/flagLogInSlice";
import { setUserName } from "../rtk/userNameSlice";
import { render, setUserNameInCart } from "../rtk/cartSlice";
import { Alert, Collapse, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styleButton } from "../style/login&Signin";
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { gql, useMutation } from "@apollo/client";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openAlertEmail, setOpenAlertEmail] = useState(false);
  const [openAlertPassword, setOpenAlertPassword] = useState(false);
  const dispatch = useAppDispatch();

  const open = useAppSelector((state) => state.openLogIn.flag);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return (
      password.length >= 7 &&
      (/[A-Z]/.test(password) || /[a-z]/.test(password)) &&
      /\d/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };

  const handleClickOpen = () => {
    dispatch(setOpenLogIn(true));
  };

  const handleClose = () => {
    dispatch(setOpenLogIn(false));
  };

  const notify = () => {
    toast.success("You've logged in successfully!", {
      theme: "colored"
    })
  }

  const REGISTER_USER = gql`
    mutation LogIn($userData: UserLogin) {
      logIn(user: $userData){
        email
        firstName
        username
        lastName
        password
        _id
      }
    }
`;

  const ADD_TO_CART = gql`
    mutation AddToCart($input: AddToCartInput) {
      addToCart(input: $input) {
        userId
        products {
          productId
          quantity
          description
          price
        }
      }
    }
`;

  const [addToCart] = useMutation(ADD_TO_CART)
  const [login] = useMutation(REGISTER_USER)

  const handleLogIn = () => {
    if (validateEmail(email) && validatePassword(password)) {
      const userData = {
        email: email.toString(),
        password: password.toString(),
      };
      login({ variables: { userData } }).then(({ data }) => {
        if (data) {
          const userName = data;
          localStorage.setItem('email', email)
          localStorage.setItem('password', password)
          setEmail("");
          setPassword("");
          dispatch(setUserName(userName.logIn));
          dispatch(
            setUserNameInCart(userName.logIn._id)
          );
          notify()
          const lsCart = localStorage.getItem('cart')
          const cart = lsCart ? JSON.parse(lsCart) : []
          const newCart = cart.map((item: any) => {
            return {
              productId: item.name.toString(),
              price: item.price,
              quantity: item.quantity,
              description: item.description
            }
          })
          addToCart({ variables: { input: { userId: userName.logIn._id.toString(), products: newCart } } }).then(({data}) =>{
            if(data) localStorage.removeItem('cart')
            render()
          } )
        }
      }).catch((error) => {
        console.error(error);
        dispatch(setOpenSignUp(true));
      })

      if (!validatePassword(password)) {
        setOpenAlertPassword(true);
      }
      if (!validateEmail(email)) {
        setOpenAlertEmail(true);
      }
    }
  }

  const handleRegistration = () => {
    dispatch(setOpenSignUp(true));
    dispatch(setOpenLogIn(false));
  };

  return (
    <React.Fragment>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={handleClickOpen}
      >
        <VpnKeyOutlinedIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ textAlign: 'center' }}>Log in</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ textAlign: 'center' }}>
            To log in, please enter your email and password.
          </DialogContentText>
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
              setOpenAlertEmail(false);
            }}
            value={email}
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            required
            error={!email}
            helperText={!email ? "This is a required field." : ""}
          />
          <Collapse in={openAlertEmail}>
            <Alert severity="error" sx={{ margin: "0.5em" }}>
              Invalid email
            </Alert>
          </Collapse>
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
              setOpenAlertPassword(false);
            }}
            value={password}
            margin="dense"
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            error={!password}
            helperText={
              !password ? "This is a required field." : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Collapse in={openAlertPassword}>
            <Alert severity="error" sx={{ margin: "0.5em" }}>
              Invalid password
            </Alert>
          </Collapse>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" sx={styleButton} onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" sx={styleButton} onClick={handleLogIn}>
            Sign in
          </Button>
          <Button
            variant="contained"
            sx={styleButton}
            onClick={handleRegistration}
          >
            Don't have a user account?
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </React.Fragment>
  );
};

export default LogIn;
