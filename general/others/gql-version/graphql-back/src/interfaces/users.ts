export interface UserRegister {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}
export interface UserRegisterInput {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}
export interface UserLogin {
  email: string;
  password: string;
}

export interface UserChecked {
  user: {
    _id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    token?: string;
  };
}
