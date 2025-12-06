
interface Address {
  city: string;
  street: string;
  apartment_number: number;
}

interface UserInterface {
  id: string;
  full_name: string;
  email: string;
  address: Address;
  password: string;
  role?: string
}

type UserLoginInterface = Pick<UserInterface, "email" | "password">;

interface UserLoginResponseInterface {
  id: string;
  role?: string;
  token: string;
}

export { UserInterface, Address, UserLoginInterface, UserLoginResponseInterface };
