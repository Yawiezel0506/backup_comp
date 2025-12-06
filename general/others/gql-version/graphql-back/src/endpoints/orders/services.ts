import axios from "axios";
import dotenv from "dotenv"

dotenv.config()

const OMS_SERVER = process.env.OMS_SERVER || "https://demoosmserver.onrender.com"

const createOrder = async (order: any) => {
  try {
    const resp = await axios.post(
      `${OMS_SERVER}/orders/`,
      order
    );
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

const getUserOrders = async (userId: any) => {
    try {
      const resp = await axios.get(
        `${OMS_SERVER}/orders/${userId}`,
      );
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };

export default {
  createOrder,
  getUserOrders
};
