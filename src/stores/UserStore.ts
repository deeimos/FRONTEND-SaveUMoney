import { makeObservable, observable, action } from "mobx";
import { ILoginResponse, IUserInfo } from "../const/types";
import { Auth } from "../pages";
import { AuthClient } from '../server/index';
import { updateToken } from "../server/axiosClient";

export class UserStore {
  isAuth: boolean;
  user: IUserInfo | null;

  constructor() {
    this.isAuth = false;
    this.user = null;
    makeObservable(this, {
      isAuth: observable,
      SetIsAuth: action,
      LogOut: action
    });

    const token = localStorage.getItem('authToken');
    if (token) {
      (async () => {
        try {
          const userData = await AuthClient.checkAuth(token);
          const { email, username, ...tokenInfo } = userData.data;
          this.user = { email, username };
          this.isAuth = true;
          localStorage.setItem('authToken', tokenInfo.accessToken);
          updateToken();

        } catch (error) {
          console.log(error)
        }
      })();

    }
  }

  SetIsAuth(data: ILoginResponse) {
    const { email, username, ...tokenInfo } = data;
    this.user = { email, username };
    this.isAuth = true;
    localStorage.setItem('authToken', tokenInfo.accessToken);
    updateToken();
  }

  LogOut() {
    this.user = null;
    this.isAuth = false;
    localStorage.removeItem('authToken');
    updateToken();
  }
  

  get IsAuth() {
    return this.isAuth;
  }

  get UserData() {
    return this.user;
  }
}