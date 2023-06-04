export interface ILoginProps {
  email: string;
  password: string;
}

export interface IRegisterProps {
  username: string;
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  email: string;
  expiresIn: string;
  username: string;
}

export interface IUserInfo {
  email: string;
  username: string;
}

export interface IAddBill {
  name: string;
  value: number;
  description: string;
}

export interface IBill extends IAddBill{
  _id: string;
  name: string;
  value: number;
  description: string;
}