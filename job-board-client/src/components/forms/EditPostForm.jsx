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

export default function EditJobPost({ detail, submitUpdateJobpost }) {
  const { description } = detail;
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const edited = {
      description: {
        address: description.address,
        userId: description.userId,
        title: data.get("title"),
        company: data.get("company-name"),
        email: description.email,
        jobType: data.get("jobType"),
        posted: description.posted,
        about: data.get("about"),
        responsibilities: data.get("responsbilities"),
        roleDetail: data.get("roleDetail"),
        salary: data.get("salary"),
        skills: data.get("skills"),
        applicants: [],
      },
    };
    //TODO: validate data later
    submitUpdateJobpost(detail.id, edited);
  };

  return (
    <ThemeProvider theme={theme}>
      {description ? (
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
              Edit a Job Post
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
                  Job Post Information:
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      name="company-name"
                      id="company-name"
                      autoFocus
                      defaultValue={description?.company}
                      label="Company name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      required
                      fullWidth
                      name="title"
                      id="title"
                      defaultValue={description?.title}
                      label="Job title"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      options={jobTypes}
                      defaultValue={description?.jobType}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          required
                          InputLabelProps={{ shrink: true }}
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
                      defaultValue={description?.salary}
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
                      defaultValue={description?.about}
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
                      defaultValue={description?.roleDetail}
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
                      defaultValue={description?.responsibilities}
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
                      defaultValue={description?.skills}
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
                  Edit
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      ) : null}
    </ThemeProvider>
  );
}
