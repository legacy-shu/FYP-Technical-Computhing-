import { useState, useEffect } from "react";
import { CssBaseline, Box, Grid, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import JobCard from "../components/JobCard";
import Progress from "../components/Progress";
import DashboardNavBar from "../components/DashboardNavBar";
import EditJobPost from "../forms/EditPostForm";
import RegisterJobPost from "../forms/RegisterJobPost";
import AlertDialog from "../components/AlertDialog";
import Footer from "../components/Footer";
import ApplicantsList from "../components/ApplicantsList";

const theme = createTheme({
  palette: {
    primary: {
      main: grey.A100,
    },
  },
});

export default function DashboardPage({
  userAuthService,
  jobPostService,
  userProfileService,
  user,
  setUser,
}) {
  const [jobs, setJobs] = useState([]);
  const [detail, setDetail] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [confirm, setConfirm] = useState({ open: false });
  const [postMode, setPostMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [applicants, setApplicants] = useState(jobs?.description?.applicants);

  const clickEdit = (id) => {
    getJobDetail(id);
    setPostMode(false);
  };

  const clickDelete = (id) => {
    setConfirm({ id: id, open: true, delete: false });
    setPostMode(false);
  };

  const clickApplicants = (ids) => {
    setApplicants(ids);
    setOpen(true);
  };

  const submitUpdateJobpost = async (id, description) => {
    setIsLoading(true);
    const resp = await jobPostService.updateJobPost(id, description);
    setTimeout(() => {
      setIsLoading(false);
      if (resp.status === 200) {
        window.location.reload();
      } else {
        //TODO: handle error
        console.log(resp.message);
      }
    }, 500);
  };
  const registerNewJobPost = async (jobPost) => {
    setIsLoading(true);
    const resp = await jobPostService.registerJobPost(jobPost);
    setTimeout(() => {
      setIsLoading(false);
      if (resp.status === 201) {
        window.location.reload();
      } else {
        console.log(resp.message);
      }
    }, 500);
  };
  const deletePost = async (id) => {
    setIsLoading(true);
    const resp = await jobPostService.removeJobPost(id);
    setTimeout(() => {
      setIsLoading(false);
      if (resp.status === 204) {
        window.location.reload();
      } else {
        //TODO: handle error
        console.log(resp.message);
      }
    }, 500);
  };
  const getJobs = async () => {
    setIsLoading(true);
    const resp = await jobPostService.getPostedJobs(user.userId);
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
        console.log(resp.message);
        setDetail(undefined);
      }
    }, 500);
  };
  const clickedJobCard = (id) => {
    getJobDetail(id);
    setPostMode(false);
  };
  useEffect(() => {
    if (user) {
      getJobs();
    } else {
      setDetail(undefined);
    }
  }, [user]);
  return (
    <ThemeProvider theme={theme}>
      <ApplicantsList
        open={open}
        setOpen={setOpen}
        applicants={applicants}
        userProfileService={userProfileService}
      ></ApplicantsList>
      <AlertDialog
        confirm={confirm}
        setConfirm={setConfirm}
        deletePost={deletePost}
      ></AlertDialog>
      <DashboardNavBar
        user={user}
        userAuthService={userAuthService}
        setUser={setUser}
        setPostMode={setPostMode}
        postMode={postMode}
      ></DashboardNavBar>
      {isLoading ? <Progress></Progress> : null}
      <Grid bgcolor="primary.light" container component="main" height="100hv">
        <CssBaseline />
        <Grid item xs={12} md={4}>
          <Box style={{ maxHeight: "100vh", overflow: "auto" }}>
            {jobs?.map((job) => (
              <JobCard
                clickDelete={clickDelete}
                clickEdit={clickEdit}
                clickApplicants={clickApplicants}
                provider={user?.role?.provider}
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
            <Box
              sx={{ border: 0, m: 4, boxShadow: 8 }}
              style={{ maxHeight: "100vh", overflow: "auto" }}
            >
              {postMode ? (
                <RegisterJobPost
                  registerNewJobPost={registerNewJobPost}
                  userProfileService={userProfileService}
                  user={user}
                ></RegisterJobPost>
              ) : detail ? (
                <EditJobPost
                  detail={detail}
                  submitUpdateJobpost={submitUpdateJobpost}
                ></EditJobPost>
              ) : null}
            </Box>
          ) : null}
        </Grid>
      </Grid>
      <Footer></Footer>
    </ThemeProvider>
  );
}
