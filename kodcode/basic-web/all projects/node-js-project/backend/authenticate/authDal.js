import axios from "axios";

const createOrGetUser = async (username) => {
  try {
    const resp = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "private-key": "6c134e48-eae3-4c53-8c0c-aa34e27395a7" } }
    );
    return resp;
  } catch (error) {
    throw new Error("server error");
  }
};

export default {
    createOrGetUser,
}