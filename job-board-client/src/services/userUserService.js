export default class UserProfileService {
  constructor(httpClient, tokenStorage) {
    this.httpClient = httpClient;
    this.tokenStorage = tokenStorage;
  }
  async registerProfile(profile) {
    profile = {
      user: {
        email: "test1@gmail.com",
        password: "abcd1234",
      },
      profile: {
        name: {
          first: "WooRam",
          last: "Jung",
        },
        contact: {
          countryCode: "46",
          phoneNumber: "0793007767",
        },
        address: {
          country: "Sweden",
          zipCode: "22472",
          state: "Skane",
          city: "Lund",
        },
      },
    };
    const resp = await this.httpClient.requestAPI(
      process.env.REACT_APP_API_PATH_USER_REGISTER,
      {
        method: "POST",
        data: { user: profile.user, profile: profile.profile },
      }
    );
    if (resp.status == 201) {
      this.tokenStorage.saveToken(resp.data.token);
    }
    return resp;
  }

  async getUser(userId) {
    userId = "63ffbe52eaf36a4b2d89e84e";
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
    body = {
      profile: {
        name: {
          first: "WooRam",
          last: "LundaJung",
        },
        contact: {
          countryCode: "44",
          phoneNumber: "0793007767",
        },
        address: {
          country: "UK",
          zipCode: "22472",
          state: "Skane",
          city: "Lund",
        },
      },
    };
    userId = "63ffbe52eaf36a4b2d89e84e";
    const token = this.tokenStorage.getToken();
    const resp = await this.httpClient.requestAPI(
      process.env.REACT_APP_API_PATH_USER + `/${userId}`,
      {
        method: "PUT",
        data: { profile: body.profile },
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
