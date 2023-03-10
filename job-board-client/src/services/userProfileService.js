export default class UserProfileService {
  constructor(httpClient, tokenStorage) {
    this.httpClient = httpClient;
    this.tokenStorage = tokenStorage;
  }
  async registerProfile(profile) {
    const resp = await this.httpClient.requestAPI(
      process.env.REACT_APP_API_PATH_USER_REGISTER,
      {
        method: "POST",
        data: { user: profile.user, profile: profile.profile },
      }
    );
    if (resp.status === 201) {
      this.tokenStorage.saveToken(resp.data.token);
    }
    return resp;
  }

  async getUser(userId) {
    const token = this.tokenStorage.getToken();
    const resp = await this.httpClient.requestAPI(
      process.env.REACT_APP_API_PATH_USER + `/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return resp;
  }

  async updateUser(userId, body) {
    const token = this.tokenStorage.getToken();
    const resp = await this.httpClient.requestAPI(
      process.env.REACT_APP_API_PATH_USER + `/${userId}`,
      {
        method: "PUT",
        data: { profile: body },
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return resp;
  }

  async removeUser(userId) {
    userId = "63ffbe52eaf36a4b2d89e84e";
    const token = this.tokenStorage.getToken();
    const resp = await this.httpClient.requestAPI(
      process.env.REACT_APP_API_PATH_USER + `/${userId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return resp;
  }
}
