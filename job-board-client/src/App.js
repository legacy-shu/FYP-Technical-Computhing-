import React from "react";
import MainPage from "./components/pages/MainPage.jsx";
import LoginPage from "./components/pages/forms/LoginPage.jsx";
import SignUpPage from "./components/pages/forms/SignUpPage.jsx";
import RegisterJobPost from "./components/pages/forms/RegisterJobPost.jsx";
import Footer from "./components/Footer";

function App({ userAuthService, userProfileService, jobPostService }) {
  return (
    <React.Fragment>
      {/* <LoginPage></LoginPage> */}
      {/* <SignUpPage></SignUpPage> */}
      {/* <MainPage></MainPage> */}
      <RegisterJobPost></RegisterJobPost>
      <Footer></Footer>
    </React.Fragment>
  );
}

export default App;
