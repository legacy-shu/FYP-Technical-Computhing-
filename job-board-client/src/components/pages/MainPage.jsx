import { useState, useEffect } from "react";
import { CssBaseline, Box, Grid, ThemeProvider, Paper } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import DetailMain from "../DetailMain";
import JobCard from "../JobCard";
import DetailHeader from "../DetailHeader";
import DetailList from "../DetailList";
import MainAppBar from "../NavBar";
import EmptyPage from "./EmptyPage";
import Footer from "../Footer";

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
}) {
  const [jobs, setJobs] = useState([]);
  const [detail, setDetail] = useState();
  const onSearchBarEnter = (keyword) => {
    getJobs(keyword);
  };
  const getAlljobs = async () => {
    const resp = await jobPostService.getAllJobs();
    if (resp.status === 200) {
      setJobs(resp.data);
    } else {
      console.log(resp.message);
    }
  };
  const getJobs = async (keyword) => {
    const resp = await jobPostService.searchJobPosts(keyword);
    if (resp.status === 200) {
      setJobs(resp.data);
    } else {
      console.log(resp.message);
    }
  };
  const getJobDetail = async (id) => {
    const resp = await jobPostService.getjobById(id);
    if (resp.status === 200) {
      console.log(resp.data);
      setDetail(resp.data);
    } else {
      console.log(resp.message);
    }
  };
  const clickedJobCard = (id) => {
    console.log("Clicked", id);
    getJobDetail(id);
  };
  useEffect(() => {
    getAlljobs();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <MainAppBar setKeyword={onSearchBarEnter}></MainAppBar>
      <Grid bgcolor="primary.dark" container component="main">
        <CssBaseline />
        <Grid item xs={12} sm={4}>
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
        <Grid item xs={12} sm={8}>
          {detail ? (
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
          )}
        </Grid>
      </Grid>
      <Footer></Footer>
    </ThemeProvider>
  );
}
