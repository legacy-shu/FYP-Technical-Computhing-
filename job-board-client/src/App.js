import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/pages/MainPage.jsx";
import Login from "./components/forms/Login.jsx";
import RegisterProfile from "./components/forms/RegisterProfile.jsx";
import RegisterJobPost from "./components/forms/RegisterJobPost.jsx";

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
          element={<Login service={userAuthService}></Login>}
        ></Route>
        <Route
          path="/register/user"
          element={
            <RegisterProfile service={userProfileService}></RegisterProfile>
          }
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
