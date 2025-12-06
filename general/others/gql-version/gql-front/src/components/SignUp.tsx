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
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styleButton } from "../style/login&Signin";
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import { gql, useMutation } from "@apollo/client";

export default function SignIn() {
  const [details, setDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
    firstName: "",
    lastName: "",
  })
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.openSignUp.flag);

  const handleClickOpen = () => {
    dispatch(setOpenSignUp(true));
  };

  const handleClose = () => {
    dispatch(setOpenSignUp(false));
  };

  const REGISTER_USER = gql`
    mutation Register($userData: UserRegisterInput!) {
      register(user: $userData) {
        firstName
        username
        lastName
        email
        password
      }
    }
`;


  const [register] = useMutation(REGISTER_USER)

  const handleRegistration = () => {
    const { email, password, confirmPassword, userName, firstName, lastName } = details;
    if (
      password === confirmPassword &&
      password.length > 0 &&
      email.length > 0 &&
      userName.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0
    ) {
      const userData = {
        firstName,
        lastName,
        username: userName,
        email,
        password,
        confirmPassword: confirmPassword,
      };
      register({ variables: { userData } })
        .then(({ data }) => {
          if (data) {
            setDetails({ email: "", password: "", confirmPassword: "", userName: "", firstName: "", lastName: "" })
            dispatch(setOpenSignUp(false));
            dispatch(setOpenLogIn(true));
          }
        }).catch((error) => {
          console.error(error);
        })
    }
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
        <HowToRegOutlinedIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ textAlign: 'center' }}>registration</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ textAlign: 'center' }}>
            To register please enter email and password.
          </DialogContentText>
          <TextField
            onChange={(e) => {
              setDetails((prev) => {
                return {
                  ...prev, firstName: e.target.value,
                }
              });
            }}
            value={details.firstName}
            autoFocus
            margin="dense"
            id="name"
            label="first name"
            type="name"
            fullWidth
            required
            error={details.firstName.length === 0}
            helperText={
              details.firstName.length === 0 ? "This is a required field." : ""
            }
          />
          <TextField
            onChange={(e) => {
              setDetails((prev) => {
                return {
                  ...prev, lastName: e.target.value,
                }
              });
            }}
            value={details.lastName}
            margin="dense"
            id="name"
            label="last name"
            type="name"
            fullWidth
            required
            error={details.lastName.length === 0}
            helperText={
              details.lastName.length === 0 ? "This is a required field." : ""
            }
          />
          <TextField
            onChange={(e) => {
              setDetails((prev) => {
                return {
                  ...prev, userName: e.target.value,
                }
              });
            }}
            value={details.userName}
            margin="dense"
            id="name"
            label="user name"
            type="name"
            fullWidth
            required
            error={details.userName.length === 0}
            helperText={
              details.userName.length === 0 ? "This is a required field." : ""
            }
          />
          <TextField
            onChange={(e) => {
              setDetails((prev) => {
                return {
                  ...prev, email: e.target.value,
                }
              });
            }}
            value={details.email}
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            required
            error={details.email.length === 0}
            helperText={details.email.length === 0 ? "This is a required field." : ""}
          />
          <TextField
            onChange={(e) => {
              setDetails((prev) => {
                return {
                  ...prev, password: e.target.value,
                }
              });
            }}
            value={details.password}
            margin="dense"
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            error={details.password.length === 0}
            helperText={
              details.password.length === 0 ? "This is a required field." : ""
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
          <TextField
            onChange={(e) => {
              setDetails((prev) => {
                return {
                  ...prev, confirmPassword: e.target.value,
                }
              });
            }}
            value={details.confirmPassword}
            margin="dense"
            id="password"
            label="Please confirm the password"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            required
            error={details.confirmPassword.length === 0}
            helperText={
              details.confirmPassword.length === 0 ? "This is a required field." : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(
                    (prevShowConfirmPassword) => !prevShowConfirmPassword
                  )}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" sx={styleButton} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={styleButton}
            onClick={handleRegistration}
          >
            Sign up
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment >
  );
}
