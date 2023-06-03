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