import { makeObservable, observable, action, runInAction } from "mobx";
import { ILoginResponse, IUserInfo } from "../const/types";
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
      LogOut: action,
      CheckAuth: action,
    });

    const token = localStorage.getItem('authToken');
    if (token) {
      (async () => {
        try {
          const userData = await AuthClient.checkAuth(token);
          if (userData)
            runInAction(() => {
              const { email, username, ...tokenInfo } = userData.data;
              this.user = { email, username };
              this.isAuth = true;
              localStorage.setItem('authToken', tokenInfo.accessToken);
              updateToken();
            })
        } catch (error) {
          this.LogOut();
        }
      })();

    }
  }
  CheckAuth = action(async () => {
    const token = localStorage.getItem('authToken')?.toString() || '';
    try {
      const userData = await AuthClient.checkAuth(token);
      if (userData)
        runInAction(() => {
          const { email, username, ...tokenInfo } = userData.data;
          this.user = { email, username };
          this.isAuth = true;
          localStorage.setItem('authToken', tokenInfo.accessToken);
          updateToken();
        })
    } catch (error) {
      this.LogOut();
    }
  })

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