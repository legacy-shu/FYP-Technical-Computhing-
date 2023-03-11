import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./jsx/pages/MainPage";
import Login from "./jsx/forms/Login";
import RegisterProfile from "./jsx/forms/RegisterProfile";
import { useState, useEffect } from "react";
import DashboardPage from "./jsx/pages/DashboardPage";
import ProfilePage from "./jsx/pages/ProfilePage";
import { storage } from "../src/utils/firebase";
import { ref, getDownloadURL } from "firebase/storage";

function App({ userAuthService, userProfileService, jobPostService }) {
  const services = {
    userAuthService,
    userProfileService,
    jobPostService,
  };
  const getCVFromStorage = async () => {
    if (userProfile?.cv) {
      const storageRef = ref(storage, `CVs/${userProfile.user.id}`);
      const cv = await getDownloadURL(storageRef);
      setCV(cv);
    }
  };
  const [user, setUser] = useState(undefined);
  const [userProfile, setUserProfile] = useState(undefined);
  const [cv, setCV] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      const resp = await userAuthService.check();
      if (resp.status === 200) {
        setUser({
          email: resp.data.verified.email,
          userId: resp.data.verified.id,
          role: resp.data.verified.role,
        });
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!user) {
        return;
      }
      const resp = await userProfileService.getUser(user.userId);
      if (resp.status === 200) {
        setUserProfile(resp.data.profile);
      }
    }
    fetchData();
  }, [user]);
  useEffect(() => {
    getCVFromStorage();
  }, [userProfile]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              {...services}
              user={user}
              setUser={setUser}
              userProfile={userProfile}
              cv={cv}
            ></MainPage>
          }
        ></Route>
        <Route
          path="/login"
          element={<Login service={{ userAuthService, setUser }}></Login>}
        ></Route>
        <Route
          path="/register/user"
          element={
            <RegisterProfile
              service={{ userProfileService, setUser }}
            ></RegisterProfile>
          }
        ></Route>
        <Route
          path="/dashboard/"
          element={
            <DashboardPage
              {...services}
              user={user}
              setUser={setUser}
            ></DashboardPage>
          }
        ></Route>
        <Route
          path="/profile/"
          element={
            <ProfilePage
              {...services}
              user={user}
              setUser={setUser}
              userProfile={userProfile}
              setUserProfile={setUserProfile}
            ></ProfilePage>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
