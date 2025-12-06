import authDal from "./authDal.js";

const createOrGetUser = async (username) => {
  try {
    const resp = await authDal.createOrGetUser(username)
    return resp;
  } catch (error) {
    throw new Error("server error");
  }
};

export default {
    createOrGetUser,
}