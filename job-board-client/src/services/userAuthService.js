import axios from "axios";

export default class UserAuthService {
  constructor(tokenStorage) {
    this.tokenStorage = tokenStorage;
  }
  async login() {
    axios
      .post(
        `${process.env.REACT_APP_API_BASE}${process.env.REACT_APP_API_PATH_AUTH_LOGIN}`,
        {
          user: {
            email: "test2@gmail.com",
            password: "abcd1234",
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  async check() {}
  async logout() {
    this.tokenStorage.clearToken();
  }
}
