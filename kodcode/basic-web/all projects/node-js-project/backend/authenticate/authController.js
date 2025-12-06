import authService from "./authService.js";

const createOrGetUser = async (req, res) => {
  const { username } = req.body;
  try {
    const resp = await authService.createOrGetUser(username)
    return res.status(resp.status).json(resp.data);
  } catch (error) {
    return res.status(404).json(error);
  }
};

export default {
    createOrGetUser,
}
