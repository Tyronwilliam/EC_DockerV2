export interface LoggedUserType {
  id: number;
  email: string;
  name: string;
  lastname: string;
  image?: any | undefined;
  phone?: number | undefined;
  address?: string | undefined;
  zip?: number | undefined;
  city?: string | undefined;
  country?: string | undefined;
  cgv?: boolean | undefined;
  [key: string]: number | string | boolean | undefined; // index signature
}
export interface UpdatedUserType {
  id?: number;
  name?: string;
  lastname?: string;
  email?: string;
  image?: any;
  phone?: number;
  address?: string;
  zip?: number;
  city?: string;
  country?: string;
  cgv?: boolean;
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
    id: number;
    name: string;
    lastname: string;
    email: string;
    image?: any;
    phone?: number;
    address?: string;
    zip?: number;
    city?: string;
    country?: string;
    cgv?: boolean | undefined;
  };
  event: {
    message: string | null;
  };
}
export interface UpdateUserResponse {
  message: string;
  user: object;
  status: number;
}
export interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  city: string;
  zip: number | undefined;
  country: string;
  phone: number | undefined;
  password: string[];
  cgv: boolean;
  errors: {
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    city: string;
    zip: string;
    country: string;
    phone: string;
    cgv: string;
    password: string[];
  };
}
