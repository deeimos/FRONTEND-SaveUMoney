import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL || '';

const instance = axios.create({
  baseURL: serverURL,
  responseType: 'json',
});

export const updateToken = () => {
  const accessToken = localStorage.getItem('authToken') ||  null;
  instance.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
}


export default instance;