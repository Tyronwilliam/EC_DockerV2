export interface LoggedUserType {
  id: string | null;
  name: string | null;
  email: string | null;
}
export interface RegisterType {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
export interface LoginType {
  email: string;
  password: string;
}
export interface TokenType {
  access: string;
}
