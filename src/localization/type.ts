import { invalid } from "moment";

export interface ILocalization {
  ok: string;
  error: string;
  add: string;
  update: string;
  delete: string;
  logout: string;
  auth: {
    authorization: string;
    registration: string;
    isRegistred: string;
    isNotRegisted: string;
    buttonLogin: string;
    buttonRegister: string;
    userAlredyExist: string;
    userNotFound: string;
    invalidPassword: string;
    registerMessage: string;
    validation:{
      skipedUserName: string;
      invalidUserName: string;
      skipedEmail: string;
      invalidEmail: string;
      skipedPassword: string;
      smallLenPassword: string;
      invalidPassword: string;
      skipedRepeatPassword: string;
      notEqualRepeatPassword: string;
    };
  };
  bills: {
    bills: string,
    name: string,
    description: string;
    value: string;
    add: string;
    addError: string;
    invalidName: string;
  };
}