import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import TokenStorage from "./services/tokenStorage.js";
import UserAuthService from "./services/userAuthService.js";
import UserProfileService from "./services/userProfileService.js";
import JobPostService from "./services/jobPostService";

const root = ReactDOM.createRoot(document.getElementById("root"));
const tokenStorage = new TokenStorage();
const userAuthService = new UserAuthService(tokenStorage);
const userProfileService = new UserProfileService(tokenStorage);
const jobPostService = new JobPostService(tokenStorage);
userAuthService.login();
root.render(<App />);
