import React from "react";
import { LoginView } from "./components/pages/Login";
import { JoblistView } from "./components/pages/Joblist";
import NavigationBar from "./components/Appbar";

function App({ userAuthService, userProfileService, jobPostService }) {
  return (
    <React.Fragment>
      <NavigationBar> </NavigationBar>
      <JoblistView service={jobPostService}></JoblistView>
    </React.Fragment>
  );
}

export default App;
