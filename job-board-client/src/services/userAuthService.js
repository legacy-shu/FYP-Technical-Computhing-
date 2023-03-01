import axios from "axios";
import { config } from "../config.js";

export default class UserAuthService {
  constructor(tokenStorage) {
    this.tokenStorage = tokenStorage;
  }
  async login() {
    console.log(`${process.env.API_BASE}`);
    const data = {
      email: "test@gmail.com",
      password: "abcd1234",
    };
    axios({
      method: "POST",
      url: `http://localhost:8000/auth/login`,
      data: data,
    }).then((res) => {
      console.log(res);
    });
  }
  async check() {}
  async logout() {
    this.tokenStorage.clearToken();
  }
}
