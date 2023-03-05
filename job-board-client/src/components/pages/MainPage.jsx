import { CssBaseline, Box, Grid, ThemeProvider, Paper } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import JobDescription from "../JobDescription";
import JobCard from "../JobCard";
import CompanyHeader from "../CompanyHeader";
import CompanyInfoList from "../CompanyInfo";
import MainAppBar from "../MainAppBar";
import { useState, useEffect } from "react";
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
      <Grid
        bgcolor="primary.dark"
        container
        component="main"
        sx={{ height: "100%" }}
      >
        <CssBaseline />
        <Grid item xs={4}>
          <Box style={{ maxHeight: "100vh", overflow: "auto", minWidth: 250 }}>
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
        <Grid item xs={8} paddingX={8}>
          {detail ? (
            <Box sx={{ border: 1, mt: 4, mb: 4 }}>
              <CompanyHeader detail={detail.description}></CompanyHeader>
              <Box
                style={{ maxHeight: "72vh", overflow: "auto", minWidth: 400 }}
              >
                <CompanyInfoList detail={detail.description}></CompanyInfoList>
                <JobDescription detail={detail.description}></JobDescription>
              </Box>
            </Box>
          ) : (
            <Box sx={{ border: 1, mt: 4, mb: 4 }}>
              <EmptyPage></EmptyPage>
            </Box>
          )}
        </Grid>
      </Grid>
      <Footer></Footer>
    </ThemeProvider>
  );
}
