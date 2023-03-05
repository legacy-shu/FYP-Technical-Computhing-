import { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import MainPage from "./components/pages/MainPage.jsx";
import LoginPage from "./components/pages/forms/LoginPage.jsx";
import SignUpPage from "./components/pages/forms/SignUpPage.jsx";
import RegisterJobPost from "./components/pages/forms/RegisterJobPost.jsx";

function App({ userAuthService, userProfileService, jobPostService }) {
  const services = {
    userAuthService,
    userProfileService,
    jobPostService,
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage {...services}></MainPage>}></Route>
        <Route
          path="/login"
          element={<LoginPage service={userAuthService}></LoginPage>}
        ></Route>
        <Route
          path="/register/user"
          element={<SignUpPage service={userProfileService}></SignUpPage>}
        ></Route>
        <Route
          path="/register/job"
          element={<RegisterJobPost></RegisterJobPost>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
