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
  Grid,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import LooksIcon from "@mui/icons-material/Looks";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
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

export default function DashboardNavBar({
  user,
  userAuthService,
  setUser,
  setPostMode,
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    setUser(undefined);
    userAuthService.logout();
    navigate("/", { replace: true });
  };
  const handlerClickedPost = () => {
    setPostMode(true);
  };
  const handlerClickedEdit = () => {
    setPostMode(false);
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
            <Stack>
              <Typography
                mt={1}
                sx={{ fontSize: 50, fontWeight: "bold" }}
                color="secondary"
                gutterBottom
              >
                JOB POST DASHBOARD
              </Typography>
            </Stack>
            <Grid
              width={300}
              marginRight={0}
              marginLeft={0}
              paddingTop={3}
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              justify="space-between"
            >
              <Grid item>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Tooltip title="Edit a Job Post">
                    <Fab
                      variant="extended"
                      size="small"
                      color="secondary.light"
                      onClick={handlerClickedEdit}
                    >
                      <AppRegistrationIcon />
                      Edit
                    </Fab>
                  </Tooltip>
                  <Tooltip title="Create New a Job Post">
                    <Fab
                      variant="extended"
                      size="small"
                      color="secondary.light"
                      onClick={handlerClickedPost}
                    >
                      <AddCircleOutlineIcon />
                      post
                    </Fab>
                  </Tooltip>
                  <Tooltip title="LogOut">
                    <Fab
                      color="secondary.light"
                      size="small"
                      onClick={handleClick}
                    >
                      <LogoutIcon />
                    </Fab>
                  </Tooltip>
                </Stack>
              </Grid>
              <Grid>
                <Typography
                  mt={2}
                  sx={{ fontSize: 14, fontWeight: "bold" }}
                  align="right"
                >
                  {user?.email}
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
