import * as React from "react";
import {
  Avatar,
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
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
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

export default function RegisterJobPost() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AppRegistrationIcon />
          </Avatar>
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
                    name="location"
                    id="location"
                    label="Location"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="email"
                    type="email"
                    id="email"
                    label="Email Address"
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
                        name="location"
                        id="location"
                        label="Job Type"
                      />
                    )}
                  ></Autocomplete>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="salary"
                    id="salary"
                    label="Salary"
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
                    name="about"
                    id="about"
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
            <Box xs={{ mb: 5 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 5, mb: 2 }}
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
