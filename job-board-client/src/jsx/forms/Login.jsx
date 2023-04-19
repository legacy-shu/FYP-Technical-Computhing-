import {
  TextField,
  Avatar,
  Button,
  Link,
  CssBaseline,
  Paper,
  Box,
  Stack,
  Grid,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

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

export default function Login({ service }) {
  const { userAuthService, setUser } = service;
  const navigate = useNavigate();
  const requestLogin = async (email, password) => {
    const resp = await userAuthService.login(email, password);
    if (resp.status === 200) {
      setUser({
        userId: resp.data.userId,
        email: resp.data.email,
        role: resp.data.role,
      });
      navigate("/", { replace: true });
    } else {
      //TODO: error handle
      console.log(resp);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //TODO: check validation
    const email = data.get("email");
    const password = data.get("password");
    requestLogin(email, password);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://picsum.photos)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Stack spacing={2}>
                <Button
                  color="secondary"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Link href="/register/user" variant="h6">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Link href="/" variant="h6">
                      {"Don't want to login now, Go home"}
                    </Link>
                  </Grid>
                </Grid>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
