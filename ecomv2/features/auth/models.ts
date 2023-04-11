export interface LoggedUserType {
  id: string | null;
  email: string;
  name: string;
  lastname: string;
  img: string | null;
  phone: number | null;
  address: string | null;
  zip: number | null;
  city: string | null;
  country: string | null;
}

export interface RegisterType {
  email: string;
  password: string;
  name: string;
  lastname: string;
}
export interface LoginType {
  email: string;
  password: string;
}
export interface TokenType {
  token: string;
}
export interface MutationLoginType {
  user: LoggedUserType;
  token: string;
}
export interface MutationRegisterType {
  userId: number;
}
export interface QueryUserType {
  user: {
    id: string | null;
    name: string;
    lastname: string;
    email: string;
    img: string | null;
    phone: number | null;
    address: string | null;
    zip: number | null;
    city: string | null;
    country: string | null;
  };
  event: {
    message: string | null;
  };
}
