import { UserRegisterModel } from "../../db/users";
import { UserLogin, UserRegisterInput } from "../../interfaces/users";
import { comparePassword, generateUserPassword } from "../../utils/bcrypt";
import { registerSchema, loginSchema } from "../../utils/joy";

const getAllUsers = async () => {
  const all = await UserRegisterModel.find();
  return all;
};

const login = async (user: UserLogin) => {
  try {
    const { error } = loginSchema.validate(user);
    if (error) {
      console.log(error.details[0].message);
      return;
    }
    console.log(user);

    const existingUser = await UserRegisterModel.findOne({ email: user.email });
    console.log(existingUser);

    if (!existingUser) {
      console.log("User with this email does not exist!");
      return;
    }

    if (!comparePassword(user.password, existingUser.password)) {
      console.log("Incorrect password");
      return;
    }

    return existingUser;
  } catch (error) {
    return error;
  }
};

const register = async (user: UserRegisterInput) => {
  try {
    console.log(user);
    const { error } = registerSchema.validate(user);
    if (error) {
      console.log(error.details[0].message);
      return "error1";
    }

    const exists = await UserRegisterModel.findOne({ email: user.email });
    if (exists) {
      console.log("User with this email already exists!");
      return "error2";
    }

    const hashedPassword = {
      ...user,
      password: generateUserPassword(user.password),
    };

    const newUser = await UserRegisterModel.create(hashedPassword);

    return newUser;
  } catch (error) {
    return error;
  }
};

const edit = async (users: UserLogin[]) => {
  const [oldUser, newUser] = users;
  try {
    console.log(users);

    const userExists: UserLogin | null = await UserRegisterModel.findOne({
      email: oldUser.email,
    });

    if (userExists) {
      newUser.password = userExists.password;
    }

    if (!userExists) {
      console.log("User with this email does not exist!");
      return "error";
    }

    await UserRegisterModel.updateOne({ email: oldUser.email }, newUser);

    return newUser;
  } catch (error) {
    return error;
  }
};

export default {
  getAllUsers,
  login,
  register,
  edit,
};
