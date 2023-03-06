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

  async getJobsByUserId(userId) {
    userId = "63fd2232a17515965190f532";
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
    description = {
      userId: "63fd2232a17515965190f532",
      title: "php developer",
      email: "test@gmail.com",
      logo: "String",
      company: "ALFEN TECHNOLOGY LTD",
      address: {
        country: "UK",
        zipCode: "abcde",
        state: "Sheffield",
        city: "Sheffield city center",
      },
      salary: "45000-60000 / Per Year",
      jobType: "Full-Time",
      posted: "2023-02-27",
      about:
        "Alfen is delighted to be working exclusively with a pioneer within the IoT space! One of the fastest growing companies in the UK. My client is looking for a talented iOS developer working within a multi skilled Software Development team to work on site in their Leicester offices. A good candidate will advocate for everything iOS - from supporting the current platform to the adoption of new features.",
      responsibilities: [
        "Working within a multi-skilled software development team",
        "Taking ownership of features and releases for the existing iOS app",
        "Supporting our firmware and test teams by maintaining and building internal tools",
      ],
      skills: [
        "Positive, friendly, and mature work attitude",
        "Experience with Objective-C",
        "Experience with Swift",
        "Some examples of work on the iOS App Store",
      ],
      applicants: [],
    };
    const token = this.tokenStorage.getToken();
    const resp = await this.httpClient.requestAPI(
      process.env.REACT_APP_API_PATH_JOB,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        data: { description },
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
    description = {
      description: {
        userId: "63fd2232a17515965190f532",
        title: "Dotnet Developer",
        email: "test@gmail.com",
        logo: "String",
        company: "ALFEN TECHNOLOGY LTD",
        address: {
          country: "UK",
          zipCode: "abcde",
          state: "Sheffield",
          city: "Sheffield city center",
        },
        salary: "45000-60000 / Per Year",
        jobType: "Full-Time",
        posted: "2023-02-27",
        about:
          "Alfen is delighted to be working exclusively with a pioneer within the IoT space! One of the fastest growing companies in the UK. My client is looking for a talented iOS developer working within a multi skilled Software Development team to work on site in their Leicester offices. A good candidate will advocate for everything iOS - from supporting the current platform to the adoption of new features.",
        responsibilities: [
          "Working within a multi-skilled software development team",
          "Taking ownership of features and releases for the existing iOS app",
          "Supporting our firmware and test teams by maintaining and building internal tools",
        ],
        skills: [
          "Positive, friendly, and mature work attitude",
          "Experience with Objective-C",
          "Experience with Swift",
          "Some examples of work on the iOS App Store",
        ],
        applicants: [],
      },
    };
    jobId = "63fd24ada6ddb6225340bd09";
    const token = this.tokenStorage.getToken();
    const resp = await this.httpClient.requestAPI(
      process.env.REACT_APP_API_PATH_JOB + `/${jobId}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        data: { description },
      }
    );
    return resp;
  }
  async removeJobPost(jobId) {
    jobId = "63fd24ada6ddb6225340bd09";
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
