import { useState, useEffect } from "react";
import { CssBaseline, Box, Grid, ThemeProvider, Paper } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import DetailMain from "../DetailMain";
import JobCard from "../JobCard";
import DetailHeader from "../DetailHeader";
import DetailList from "../DetailList";
import NavBar from "../NavBar";
import EmptyPage from "./EmptyPage";
import Footer from "../Footer";
import Progress from "../Progress";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey.A200,
    },
  },
});

export default function MainPage({
  userAuthService,
  userProfileService,
  jobPostService,
  user,
  setUser,
}) {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [detail, setDetail] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const onSearchBarEnter = (keyword) => {
    getJobs(keyword);
  };

  const getAlljobs = async () => {
    setIsLoading(true);
    const resp = await jobPostService.getAllJobs();
    setTimeout(() => {
      setIsLoading(false);
      if (resp.status === 200) {
        setJobs(resp.data);
      } else {
        console.log(resp.message);
      }
    }, 500);
  };

  const getJobs = async (keyword) => {
    setIsLoading(true);
    const resp = await jobPostService.searchJobPosts(keyword);
    setTimeout(() => {
      setIsLoading(false);
      if (resp.status === 200) {
        setJobs(resp.data);
      } else {
        //TODO: handle error
        console.log(resp.message);
      }
    }, 500);
  };

  const getJobDetail = async (id) => {
    setIsLoading(true);
    const resp = await jobPostService.getjobById(id);
    setTimeout(() => {
      setIsLoading(false);
      if (resp.status === 200) {
        console.log(resp.data);
        setDetail(resp.data);
      } else {
        if (resp.status === 401 || resp.status === 419) {
          navigate("/login", { replace: true });
        }
        setDetail(undefined);
      }
    }, 500);
  };

  const clickedJobCard = (id) => {
    getJobDetail(id);
  };

  useEffect(() => {
    getAlljobs();
    if (!user) {
      setDetail(undefined);
    }
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <NavBar
        setKeyword={onSearchBarEnter}
        user={user}
        userAuthService={userAuthService}
        setUser={setUser}
      ></NavBar>
      {isLoading ? <Progress></Progress> : null}
      <Grid bgcolor="primary.dark" container component="main" height="100hv">
        <CssBaseline />
        <Grid item xs={12} md={3}>
          <Box style={{ maxHeight: "100vh", overflow: "auto" }}>
            {jobs.map((job) => (
              <JobCard
                job={job}
                key={job.id}
                id={job.id}
                onClick={clickedJobCard}
              ></JobCard>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          {!isLoading ? (
            detail ? (
              <Box sx={{ border: 1, m: 4 }}>
                <DetailHeader detail={detail.description}></DetailHeader>
                <Box style={{ maxHeight: "70vh", overflow: "auto" }}>
                  <DetailList detail={detail.description}></DetailList>
                  <DetailMain detail={detail.description}></DetailMain>
                </Box>
              </Box>
            ) : (
              <Box sx={{ border: 1, m: 4 }}>
                <EmptyPage></EmptyPage>
              </Box>
            )
          ) : null}
        </Grid>
      </Grid>
      <Footer></Footer>
    </ThemeProvider>
  );
}
