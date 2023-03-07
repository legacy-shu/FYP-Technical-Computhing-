export default class JobPostService {
  constructor(httpClient, tokenStorage) {
    this.httpClient = httpClient;
    this.tokenStorage = tokenStorage;
  }
  async getAllJobs() {
    const resp = await this.httpClient.requestAPI(
      process.env.REACT_APP_API_PATH_JOB_ALL,
      {
        method: "GET",
      }
    );
    return resp;
  }

  async applyJob() {
    //TODO: implement later
  }

  async searchJobPosts(keyword) {
    const token = this.tokenStorage.getToken();
    const resp = await this.httpClient.requestAPI(
      process.env.REACT_APP_API_PATH_JOB_SEARCH + `?keyword=${keyword}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return resp;
  }

  async getPostedJobs(userId) {
    const token = this.tokenStorage.getToken();
    const resp = await this.httpClient.requestAPI(
      process.env.REACT_APP_API_PATH_JOB + `/${userId}/posted`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return resp;
  }

  async registerJobPost(description) {
    console.log(description);
    const token = this.tokenStorage.getToken();
    const resp = await this.httpClient.requestAPI(
      process.env.REACT_APP_API_PATH_JOB,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        data: description,
      }
    );
    return resp;
  }
  async getjobById(jobId) {
    const token = this.tokenStorage.getToken();
    const resp = await this.httpClient.requestAPI(
      process.env.REACT_APP_API_PATH_JOB + `/${jobId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return resp;
  }
  async updateJobPost(jobId, description) {
    const token = this.tokenStorage.getToken();
    const resp = await this.httpClient.requestAPI(
      process.env.REACT_APP_API_PATH_JOB + `/${jobId}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        data: description,
      }
    );
    return resp;
  }
  async removeJobPost(jobId) {
    const token = this.tokenStorage.getToken();
    const resp = await this.httpClient.requestAPI(
      process.env.REACT_APP_API_PATH_JOB + `/${jobId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return resp;
  }
}
