import {
  Button,
  CardContent,
  Typography,
  Card,
  CssBaseline,
  Box,
  Grid,
  ThemeProvider,
  TextField,
  Paper,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { grey, cyan } from "@mui/material/colors";
import Footer from "../components/Footer";
import ProfileNavBar from "../components/ProfileNavBar";
import { useState, useEffect } from "react";
import AddFiles from "../forms/FileDropzone";

const theme = createTheme({
  palette: {
    primary: {
      main: grey.A100,
    },
    secondary: {
      main: cyan[900],
    },
  },
});

export default function DashboardPage({
  userProfileService,
  userAuthService,
  user,
  userProfile,
  setUserProfile,
  setUser,
}) {
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    setDisable(true);
  }, [userProfile]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const profile = {
      user: user.userId,
      name: {
        first: data.get("first-name"),
        last: data.get("last-name"),
      },
      contact: {
        countryCode: userProfile?.contact?.countryCode,
        phoneNumber: data.get("phone-number"),
      },
      address: {
        country: userProfile?.address?.country,
        zipCode: data.get("zip-code"),
        state: data.get("state"),
        city: data.get("city"),
      },
    };

    updateProfile(profile);
  };

  const updateProfile = async (profile) => {
    const resp = await userProfileService.updateUser(user.userId, profile);
    if (resp.status === 200) {
      setUserProfile(resp.data.profile);
    } else {
      //TODO : Handle error
      console.log(resp.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ProfileNavBar
        userAuthService={userAuthService}
        setUser={setUser}
        user={user}
      ></ProfileNavBar>
      <Grid bgcolor="primary.light" container component="main" height="100hv">
        <CssBaseline />

        <Grid item xs={12} md={user?.role?.provider ? 12 : 5}>
          <Box
            display="flex"
            justifyContent="center"
            minHeight="20vh"
            sx={{ border: 0, m: 4, boxShadow: 2, alignContent: "center" }}
            style={{ maxHeight: "100vh", overflow: "auto" }}
          >
            {userProfile ? (
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <Card elevation={0}>
                  <CardContent>
                    <Paper sx={{ mt: 5, mb: 2 }} elevation={0}>
                      <Typography
                        m={5}
                        sx={{ fontSize: 27, fontWeight: "bold" }}
                        align="center"
                        color="primary.text"
                      >
                        Your profile information
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            disabled={disable}
                            InputLabelProps={{ shrink: true }}
                            variant="standard"
                            required
                            fullWidth
                            id="first-name"
                            label="First Name"
                            name="first-name"
                            defaultValue={userProfile?.name?.first}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            disabled={disable}
                            InputLabelProps={{ shrink: true }}
                            variant="standard"
                            required
                            fullWidth
                            id="last-name"
                            label="Last Name"
                            name="last-name"
                            defaultValue={userProfile?.name?.last}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            disabled
                            InputLabelProps={{ shrink: true }}
                            variant="standard"
                            required
                            fullWidth
                            name="email"
                            type="email"
                            id="email"
                            label="Email"
                            defaultValue={userProfile?.user?.email}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            disabled={disable}
                            InputLabelProps={{ shrink: true }}
                            variant="standard"
                            required
                            fullWidth
                            name="phone-number"
                            id="phone-number"
                            label="Phone Number"
                            defaultValue={userProfile?.contact?.phoneNumber}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            disabled
                            InputLabelProps={{ shrink: true }}
                            variant="standard"
                            required
                            fullWidth
                            name="country"
                            type="country"
                            id="country"
                            label="Country"
                            defaultValue={userProfile?.address?.country}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            disabled={disable}
                            InputLabelProps={{ shrink: true }}
                            variant="standard"
                            required
                            fullWidth
                            name="state"
                            id="state"
                            label="State"
                            defaultValue={userProfile?.address?.state}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            disabled={disable}
                            InputLabelProps={{ shrink: true }}
                            variant="standard"
                            required
                            fullWidth
                            name="zip-code"
                            id="zip-code"
                            label="Zip"
                            defaultValue={userProfile?.address?.zipCode}
                          />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <TextField
                            disabled={disable}
                            InputLabelProps={{ shrink: true }}
                            variant="standard"
                            required
                            fullWidth
                            name="city"
                            id="city"
                            label="City"
                            defaultValue={userProfile?.address?.city}
                          />
                        </Grid>

                        <Grid
                          sx={{ mt: 5 }}
                          container
                          justifyContent="flex-end"
                        >
                          {disable ? (
                            <Button
                              alignitems="right"
                              color="secondary"
                              variant="outlined"
                              onClick={(event) => {
                                setDisable(false);
                              }}
                            >
                              Edit
                            </Button>
                          ) : null}
                          {!disable && (
                            <Button
                              type="submit"
                              alignitems="right"
                              color="secondary"
                              variant="contained"
                            >
                              Submit
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    </Paper>
                  </CardContent>
                </Card>
              </Box>
            ) : null}
          </Box>
        </Grid>

        {!user?.role?.provider ? (
          <Grid item xs={12} md={7}>
            <Box
              display="flex"
              justifyContent="center"
              minHeight="20vh"
              sx={{ border: 0, m: 4, boxShadow: 2, alignContent: "center" }}
              style={{ maxHeight: "100vh", overflow: "auto" }}
            >
              <AddFiles
                userProfile={userProfile}
                setUserProfile={setUserProfile}
                userProfileService={userProfileService}
              ></AddFiles>
            </Box>
          </Grid>
        ) : null}
      </Grid>
      <Footer></Footer>
    </ThemeProvider>
  );
}
