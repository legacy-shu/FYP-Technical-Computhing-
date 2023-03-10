import {
  Button,
  CssBaseline,
  Autocomplete,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import { useState, useEffect } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[500],
    },
    secondary: {
      main: blueGrey[800],
    },
  },
});
const jobTypes = [
  "Full-time(permanent,office)",
  "Full-time(permanent,remote)",
  "Full-time(permanent,hybrid)",
  "Full-time(contract,office)",
  "Full-time(contract,remote)",
  "Full-time(contract,hybrid)",
  "Part-time(office)",
  "Part-time(remote)",
  "Part-time(hybrid)",
  "Intern",
];
const salarys = [
  "10000 - 20000 / per year",
  "20000 - 25000 / per year",
  "30000 - 35000 / per year",
  "40000 - 45000 / per year",
  "50000 - 55000 / per year",
  "60000 - 65000 / per year",
  "70000 - 75000 / per year",
  "80000 - 85000 / per year",
  "90000 - 95000 / per year",
  "More than 100000 / per year",
];

export default function RegisterJobPost({
  user,
  registerNewJobPost,
  userProfileService,
}) {
  const [userInfo, setUserInfo] = useState({});
  const getUserInfo = async (userId) => {
    const resp = await userProfileService.getUser(userId);
    if (resp.status === 200) {
      setUserInfo(resp.data.profile);
    } else {
      //TODO: handle error
      console.log(resp.message);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jobpost = {
      description: {
        address: userInfo.address,
        userId: userInfo.user.id,
        title: data.get("title"),
        company: data.get("company-name"),
        email: userInfo.user.email,
        jobType: data.get("jobType"),
        posted: new Date(),
        about: data.get("about"),
        responsibilities: data.get("responsbilities"),
        roleDetail: data.get("roleDetail"),
        salary: data.get("salary"),
        skills: data.get("skills"),
        applicants: [],
      },
    };
    //TODO: validate data later
    registerNewJobPost(jobpost);
  };

  useEffect(() => {
    if (user?.userId) {
      getUserInfo(user.userId);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg" sx={{ mb: 20 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Register a Job Post
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Paper elevation={0}>
              <Typography
                sx={{ mt: 3, mb: 1 }}
                variant="subtitle1"
                component="div"
              >
                Company Infomation:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="company-name"
                    id="company-name"
                    label="Company Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    name="location"
                    id="location"
                    label="Location"
                    value={`${userInfo?.address?.city}, ${userInfo?.address?.country}`}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    name="email"
                    type="email"
                    id="email"
                    label="Email Address"
                    value={userInfo?.user?.email}
                  />
                </Grid>
              </Grid>
            </Paper>

            <Paper elevation={0}>
              <Typography
                sx={{ mt: 3, mb: 1 }}
                variant="subtitle1"
                component="div"
              >
                Job Post Information:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="title"
                    id="title"
                    label="Job Title"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    options={jobTypes}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        fullWidth
                        name="jobType"
                        id="jobType"
                        label="Job Type"
                      />
                    )}
                  ></Autocomplete>
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    options={salarys}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        fullWidth
                        name="salary"
                        id="salary"
                        label="Salary"
                      />
                    )}
                  ></Autocomplete>
                </Grid>
              </Grid>
            </Paper>

            <Paper elevation={0}>
              <Typography
                sx={{ mt: 3, mb: 1 }}
                variant="subtitle1"
                component="div"
              >
                About the company:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    rows={5}
                    required
                    fullWidth
                    name="about"
                    id="about"
                    label="Write about your company 50-300 words"
                  />
                </Grid>
              </Grid>
            </Paper>

            <Paper elevation={0}>
              <Typography
                sx={{ mt: 3, mb: 1 }}
                variant="subtitle1"
                component="div"
              >
                About the role:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    rows={5}
                    required
                    fullWidth
                    name="roleDetail"
                    id="roleDetail"
                    label="Write about the role detail 50-300 words"
                  />
                </Grid>
              </Grid>
            </Paper>
            <Paper elevation={0}>
              <Typography
                sx={{ mt: 3, mb: 1 }}
                variant="subtitle1"
                component="div"
              >
                What needs for applicants?:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    rows={5}
                    required
                    fullWidth
                    name="responsbilities"
                    id="responsbilities"
                    label="Write about what needs for applicants 50-300 words"
                  />
                </Grid>
              </Grid>
            </Paper>
            <Paper elevation={0}>
              <Typography
                sx={{ mt: 3, mb: 1 }}
                variant="subtitle1"
                component="div"
              >
                What skills are required:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    rows={5}
                    required
                    fullWidth
                    name="skills"
                    id="skills"
                    label="Write what skills are required 50-300 words"
                  />
                </Grid>
              </Grid>
            </Paper>
            <Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 8 }}
              >
                Register
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
