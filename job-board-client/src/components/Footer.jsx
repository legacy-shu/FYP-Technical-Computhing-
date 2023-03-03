import {
  CssBaseline,
  Box,
  Typography,
  Container,
  Link,
  ThemeProvider,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
function Copyright() {
  return (
    <Typography variant="body2" color="white">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/w-ryan-jung/FYP-Technical-Computhing-"
      >
        Wooram Jung
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  const theme = createTheme({
    palette: {
      primary: {
        main: blueGrey[800],
      },
      secondary: {
        main: blueGrey[200],
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "60vh",
          backgroundColor: "primary.dark",
        }}
      >
        <CssBaseline />
        <Container component="main" sx={{ mt: 18, mb: 2 }} maxWidth="sm">
          <Typography variant="h2" color="secondary" component="h1" gutterBottom>
            Job-Board Web Application
          </Typography>
          <Typography variant="h6" color="white" component="h2" gutterBottom>
            {"Job Seekers can find a job and apply for it. "}
            {"Job Providers can create job postings. "}
            {"The system will send notification by email"}
          </Typography>
          <Typography color="secondary" variant="body1">
            Built by microservice architecture
          </Typography>
        </Container>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: "primary.light",
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1" color="secondary">
              Final Year Project (Technical Computing)@SHU
            </Typography>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
