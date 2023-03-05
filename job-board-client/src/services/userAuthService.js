export default class UserAuthService {
  constructor(httpClient, tokenStorage) {
    this.httpClient = httpClient;
    this.tokenStorage = tokenStorage;
  }

  async login(email, password) {
    const resp = await this.httpClient.requestAPI(
      process.env.REACT_APP_API_PATH_AUTH_LOGIN,
      {
        method: "POST",
        data: { user: { email, password } },
      }
    );
    if (resp.status === 200) {
      this.tokenStorage.saveToken(resp.data.token);
    }
    return resp;
  }

  async check() {
    const token = this.tokenStorage.getToken();
    const resp = await this.httpClient.requestAPI(
      process.env.REACT_APP_API_PATH_AUTH_CHECK,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return resp;
  }

  async logout() {
    this.tokenStorage.clearToken();
  }
}
