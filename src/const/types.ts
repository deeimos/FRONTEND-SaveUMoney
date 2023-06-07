export interface ILoginProps {
  email: string;
  password: string;
}

export interface IRegisterProps {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
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

export interface IBaseCategory{
  name: string;
  description: string;
}

export interface ICategory extends IBaseCategory{
  _id: string;
  name: string;
  description: string;
}

export interface IBaseAction{
  billId: string;
  categoryId: string;
  date: Date;
  value: number;
  description: string;
}

export interface IAction extends IBaseAction{
  _id: string;
  billId: string;
  categoryId: string;
  date: Date;
  value: number;
  description: string;
}

export interface IActions extends IAction{
  _id: string;
  actions: Array <IAction>;
}

export interface IGetActions{
  date: string;
}

export interface IBaseActionDtString{
  billId: string;
  categoryId: string;
  date: string;
  value: number;
  description: string;
}

export interface IActionDtString extends IBaseActionDtString{
  _id: string;
  billId: string;
  categoryId: string;
  date: string;
  value: number;
  description: string;
}