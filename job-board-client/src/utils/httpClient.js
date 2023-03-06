import axios from "axios";
export default class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  async requestAPI(path, config) {
    const url = `${this.baseURL}${path}`;
    try {
      console.log(config);
      const res = await axios(url, config);
      // console.log({ status: res.status, data: res.data, url: res.config.url });
      return { status: res.status, data: res.data, url: res.config.url };
    } catch (error) {
      // console.log(
      //   error.response
      //     ? {
      //         status: error.response.status,
      //         message: error.response.data.message,
      //         url: error.config.url,
      //       }
      //     : { error: error.message }
      // );
      return error.response
        ? {
            status: error.response.status,
            message: error.response.data.message,
            url: error.config.url,
          }
        : { error: error.message };
    }
  }
}
