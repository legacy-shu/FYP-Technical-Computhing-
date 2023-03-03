import React from "react";
import MainAppBar from "./components/MainAppBar.jsx";
import MainPage from "./components/pages/MainPage.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import SignUpPage from "./components/pages/SignUpPage.jsx";
import Footer from "./components/Footer.jsx";
function App({ userAuthService, userProfileService, jobPostService }) {
  return (
    <React.Fragment>
      {/* <LoginPage></LoginPage> */}
      <SignUpPage></SignUpPage>
      {/* <MainAppBar></MainAppBar>
      <MainPage></MainPage>
      <Footer></Footer> */}
    </React.Fragment>
  );
}

export default App;
