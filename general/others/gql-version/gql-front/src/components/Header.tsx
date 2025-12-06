import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Login from "./Login";
import SignUp from "./SignUp";
import { useAppSelector, useAppDispatch } from "../rtk/hooks";
import { resetUserName } from "../rtk/userNameSlice";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EditDetails from "./EditDiatels";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { Autocomplete, TextField } from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import { Product } from "../interfaces/product";

export interface Result {
  label: string;
  id: string;
}

export default function PrimarySearchAppBar() {
  const [openCart, setOpenCart] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const [searchResults, setSearchResults] = useState<Result[]>([]);
  const [numOfItemsInCart, setNumOfItemsInCart] = useState<number>(
    useAppSelector((state) => state.cart.products.length)
  );
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const newNum = useAppSelector((state) => state.cart.products.length);
  const userNameInLogin = useAppSelector((state) => state.userName.userName);

  const notify = () => {
    toast.warn("You are not logged in. To register click on log in", {
      theme: "colored",
    });
  };

  useEffect(() => {
    setUserName(userNameInLogin);
  }, [userNameInLogin]);

  useEffect(() => {
    setNumOfItemsInCart(newNum);
  }, [newNum]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const flagUser = useAppSelector((state) => state.userName.flag);

  const logOut = () => {
    if (flagUser) {
      dispatch(resetUserName());
    }
    handleMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{
        fontFamily: "Fira Sans",
        fontSize: "0.5rem",
      }}
    >
      {!flagUser && (
        <MenuItem>
          <Login />
          Login
        </MenuItem>
      )}
      {!flagUser && (
        <MenuItem>
          <SignUp />
          SignUp
        </MenuItem>
      )}
      {flagUser && (
        <MenuItem
          onClick={() => {
            logOut();
            notify();
          }}
        >
          <IconButton>
            <LockOutlinedIcon />
          </IconButton>
          Log Out
        </MenuItem>
      )}
      {flagUser && (
        <MenuItem>
          <EditDetails close={handleMenuClose} />
          Edit Details
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={{
        fontFamily: "Fira Sans",
        fontSize: "0.5rem",
      }}
    >
      <MenuItem onClick={() => setOpenCart(true)}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={numOfItemsInCart} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem onClick={() => navigate("/")}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <CottageOutlinedIcon />
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem onClick={() => navigate("/charts")}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <QueryStatsIcon />
        </IconButton>
        <p>Charts</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const PRODUCTS = gql`
    query GetAllProducts {
      getAllProducts {
        id
        title
      }
    }
  `;

  const { data: productsData } = useQuery(PRODUCTS);

  const handleSearch = async (searchQuery: string) => {
    console.log("Sending search request for:", searchQuery);

    const searchItems = productsData
      ? productsData.getAllProducts.map((product: Product) => ({
          label: product.title,
          id: product.id,
        }))
      : [];
    console.log("Processed search items:", searchItems);

    setSearchResults(searchItems);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="default"
        sx={{ background: "rgb(35,47,62)", color: "rgb(255,255,255)" }}
      >
        <Toolbar>
          <div onClick={() => navigate("/")}>
            <Typography
              variant="h2"
              noWrap
              component="div"
              fontFamily={"Fira Sans"}
              sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
            >
              QuadBros Market
            </Typography>
          </div>
          <Autocomplete
            ListboxProps={{
              style: {
                backgroundColor: '#f5f5f5',
                borderRadius: '10px', 
                marginTop: '10px',
                padding: '10px',
                maxHeight: '200px',
                overflowY: 'auto',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              },
              sx: {
                '& ul': {
                  padding: 0,
                  margin: 0
                },
                '& li': {
                  padding: '10px',
                  borderBottom: '1px solid #ddd'  
                },
                '& li:last-child': {
                  borderBottom: 'none'
                }
              }  
            }}
            freeSolo
            options={searchResults}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.label
            }
            onChange={(event, value) => {
              console.log(event);
              if (typeof value !== "string" && value?.id) {
                navigate(`/product/${value.id}`);
              }
            }}
            onInputChange={(event, newInputValue) => {
              console.log(event);
              if (newInputValue.length > 2) {
                handleSearch(newInputValue);
              }
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                    startAdornment: (
                      <SearchIcon sx={{ color: "black", marginLeft: "10px" }} />
                    ),
                  }}
                  sx={{
                    width: 260,
                    backgroundColor: "#f5f5f5",
                    borderRadius: "10px",
                    height: "2.8rem",
                    background: "lightgrey",
                    marginLeft: "2rem",
                    color: "#333",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                    },
                  }}
                />
              );
            }}
          />

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {!flagUser && <Login />}
            <div style={{ width: "8px" }}></div>
            {!flagUser && <SignUp />}
            {flagUser && (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                onClick={() => {
                  logOut();
                  notify();
                }}
              >
                <LockOutlinedIcon />
              </IconButton>
            )}
            <MenuItem onClick={() => navigate("/charts")}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <QueryStatsIcon />
              </IconButton>
            </MenuItem>
            <IconButton
              size="large"
              color="inherit"
              onClick={() => navigate("/")}
            >
              <CottageOutlinedIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => setOpenCart(true)}
            >
              <Badge badgeContent={numOfItemsInCart} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
              {userName}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {openCart && <Cart props={[openCart, setOpenCart]} />}
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
    </Box>
  );
}
