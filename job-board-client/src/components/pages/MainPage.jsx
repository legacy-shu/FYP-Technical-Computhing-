import {
  Typography,
  CssBaseline,
  Box,
  Grid,
  ThemeProvider,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import DetailMain from "../DetailMain";
import JobCard from "../JobCard";
import DetailHeader from "../DetailHeader";
import DetailList from "../DetailList";
import MainNavBar from "../MainNavBar";
import EmptyPage from "./EmptyPage";
import Footer from "../Footer";
import Progress from "../Progress";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: grey.A100,
    },
  },
});

export default function MainPage({
  userAuthService,
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
        if (resp.data.length === 0) {
          setDetail(undefined);
        }
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
      <MainNavBar
        setKeyword={onSearchBarEnter}
        user={user}
        userAuthService={userAuthService}
        setUser={setUser}
      ></MainNavBar>
      {isLoading ? <Progress></Progress> : null}
      <Grid bgcolor="primary.light" container component="main" height="100hv">
        <CssBaseline />
        <Grid item xs={12} md={4}>
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
        <Grid item xs={12} md={8}>
          {!isLoading ? (
            detail ? (
              <Box sx={{ border: 0, m: 4, boxShadow: 8 }}>
                <DetailHeader detail={detail.description}></DetailHeader>
                <Box style={{ maxHeight: "70vh", overflow: "auto" }}>
                  <DetailList detail={detail.description}></DetailList>
                  <DetailMain detail={detail.description}></DetailMain>
                </Box>
              </Box>
            ) : jobs?.length > 0 ? (
              <Box>
                <EmptyPage></EmptyPage>
              </Box>
            ) : (
              <Typography
                sx={{ fontSize: 50, fontWeight: "bold", mb: 10, mt: 10 }}
                component="div"
              >
                No search result
              </Typography>
            )
          ) : null}
        </Grid>
      </Grid>
      <Footer></Footer>
    </ThemeProvider>
  );
}
