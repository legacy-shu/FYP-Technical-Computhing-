import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import CountrySelect from "./CountrySelect";
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

export default function SignUpPage() {
  const [value, setValue] = React.useState("job seeker");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

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
      <Container component="main" maxWidth="sm">
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
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
                Login Infomation:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="email"
                    type="email"
                    id="email"
                    label="Email Address"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    type="password"
                    id="password"
                    label="Password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirm-password"
                    type="password"
                    id="confirm-password"
                    label="Password Confirm"
                  />
                </Grid>
              </Grid>
            </Paper>

            <Paper sx={{ mt: 5, mb: 2 }} elevation={0}>
              <Typography sx={{ mb: 1 }} variant="subtitle1" component="div">
                Profile Infomation:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="first-name"
                    label="First Name"
                    name="first-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="last-name"
                    label="Last Name"
                    name="last-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CountrySelect></CountrySelect>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="phone-number"
                    type="number"
                    id="phone-number"
                    label="Phone Number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="state"
                    type="state"
                    id="state"
                    label="State"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    required
                    fullWidth
                    name="zipcode"
                    type="zipcode"
                    id="zipcode"
                    label="Zip Code"
                  />
                </Grid>
                <Grid item xs={12} sm={9}>
                  <TextField
                    required
                    fullWidth
                    name="city"
                    type="city"
                    id="city"
                    label="City"
                  />
                </Grid>
              </Grid>
            </Paper>
            <Box display="flex" justifyContent="right" alignItems="right">
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  I would like to register as a
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="employee"
                    control={<Radio />}
                    label="Job Seeker"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value="employer"
                    control={<Radio />}
                    label="Job Provider"
                    labelPlacement="start"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 0, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
