import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import TokenStorage from "./utils/tokenStorage.js";
import UserAuthService from "./services/userAuthService.js";
import UserProfileService from "./services/userUserService.js";
import JobPostService from "./services/jobPostService";
import HttpClient from "./utils/httpClient";

const root = ReactDOM.createRoot(document.getElementById("root"));
const httpClient = new HttpClient(process.env.REACT_APP_API_BASE);
const tokenStorage = new TokenStorage();
const userAuthService = new UserAuthService(httpClient, tokenStorage);
const userProfileService = new UserProfileService(httpClient, tokenStorage);
const jobPostService = new JobPostService(httpClient, tokenStorage);

jobPostService.getJobsByUserId("");
root.render(<App />);
