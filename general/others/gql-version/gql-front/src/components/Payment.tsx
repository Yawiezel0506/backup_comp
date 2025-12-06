import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../rtk/hooks";
import { SendCartProduct, removeCart } from "../rtk/cartSlice";
import { SendOrderDetails, Total } from "../interfaces/payment";
import { setOpen as openLogin } from "../rtk/flagLogInSlice";
import { sendOrderDetails } from "../utils/function";
import { stylePayment } from "../style/payment";
import { styleButton } from "../style/login&Signin";

const Payment: React.FC<Total> = ({ total }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const { userId, products } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const temp: SendCartProduct[] = products.map((p) => {
    const temp = {
      ...p,
      name: "" + p.name,
    };
    return temp;
  });

  const orderDetails: SendOrderDetails = {
    userId,
    cartItems: temp,
    price: total ? total : 0,
    status: "processing",
    orderTime: "2023-11-20T09:30:34.245Z",
    shippingDetails: {
      address,
      contactNumber,
      orderType: "regular",
    },
  };

  const flag = useAppSelector((state) => state.userName.flag);

  const handelSendOrder = () => {
    if (flag) {
      dispatch(removeCart());
      handleClose();
      sendOrderDetails(orderDetails);
    } else {
      dispatch(openLogin(true));
    }
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleOpen} sx={styleButton}>
        to make an order
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={stylePayment}>
          <DialogTitle variant="h3" color={"black"}>
            Order Details
          </DialogTitle>
          <DialogContent>
            <DialogContentText color="black">
              Enter Your Details For Delivery
            </DialogContentText>
            <TextField
              onChange={(e) => {
                setContactNumber(e.target.value);
              }}
              value={contactNumber}
              autoFocus
              margin="dense"
              id="string"
              label="Phone Number"
              type="string"
              fullWidth
              required
            />
            <TextField
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              value={address}
              autoFocus
              margin="dense"
              id="address"
              label="Address"
              type="address"
              fullWidth
              required
            />
          </DialogContent>
          <Button
            variant="contained"
            sx={styleButton}
            onClick={handelSendOrder}
          >
            for payment
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Payment;
