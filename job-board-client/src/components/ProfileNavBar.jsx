import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  CssBaseline,
  Stack,
  Box,
  Fab,
  ThemeProvider,
  Tooltip,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import LooksIcon from "@mui/icons-material/Looks";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[900],
    },
    secondary: {
      main: blueGrey[50],
    },
  },
});

export default function ProfileNavBar({ userAuthService, setUser }) {
  const navigate = useNavigate();
  const handleClickLogout = () => {
    setUser(undefined);
    userAuthService.logout();
    navigate("/", { replace: true });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" bgcolor="primary.light">
          <CssBaseline />
          <Toolbar
            sx={{
              justifyContent: "space-between",
              paddingTop: theme.spacing(1),
              paddingBottom: theme.spacing(2),
              "@media all": {
                minHeight: 100,
              },
            }}
          >
            <Stack justifyContent={"space-between"} paddingX={1}>
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="logo"
                onClick={() => {
                  navigate("/", { replace: true });
                }}
              >
                <LooksIcon></LooksIcon>
              </IconButton>
              <Typography
                variant="h7"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                JOB FINDER
              </Typography>
            </Stack>
            <Box justifyContent="center" alignItems="center">
              <Typography
                mb={0}
                sx={{ fontSize: 50, fontWeight: "bold" }}
                color="secondary"
                gutterBottom
              ></Typography>
            </Box>
            <Box>
              <Tooltip title="LogOut">
                <Fab color="primary" size="small" onClick={handleClickLogout}>
                  <LogoutIcon />
                </Fab>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
