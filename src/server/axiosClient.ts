import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL || '';

const instance = axios.create({
  baseURL: serverURL,
  responseType: 'json',
});

const token = localStorage.getItem('authToken');
instance.defaults.headers.common["Authorization"] = "Bearer " + token;


export default instance;