import api from './axiosClient';

import { ILoginProps, IRegisterProps} from '../const/types';

export class AuthClient {
  static async login(loginProps: ILoginProps) {
    const result = await api.post('/auth/login', loginProps);
    return result;
  }

  static async register(registerProps: IRegisterProps) {
    const result = await api.post('/auth/register', registerProps);
    return result;
  }

  static async checkAuth(token: string){
    const result = await api.post('/auth/token', {'token': token})
    return result
  }
}

export default AuthClient;