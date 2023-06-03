import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL || '';

const instance = axios.create({
  baseURL: serverURL,
  responseType: 'json'
});

export default instance;