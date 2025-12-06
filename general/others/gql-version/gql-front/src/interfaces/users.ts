export interface UserRegister {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  signup_time?: Date;
}

export interface Edit {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
