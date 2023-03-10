import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  CssBaseline,
  Stack,
  Box,
  Fab,
  ThemeProvider,
  Tooltip,
} from "@mui/material";
import { styled, alpha, createTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import LooksIcon from "@mui/icons-material/Looks";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";
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
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 3,
  marginRight: theme.spacing(0),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "60vw",
  },
}));
export default function MainNavBar({
  setKeyword,
  user,
  setUser,
  userAuthService,
}) {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const handleChage = (event) => {
    setValue(event.target.value);
  };

  const handleViewProfile = () => {
    navigate("/profile", { replace: true });
  };

  const handleLoginOut = () => {
    if (user) {
      setUser(undefined);
      userAuthService.logout();
      navigate("/", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
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
                  window.location.reload();
                }}
              >
                <LooksIcon></LooksIcon>
              </IconButton>
              <Typography
                variant="h7"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                JOB FINDER
              </Typography>
            </Stack>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Job Title"
                inputProps={{ "aria-label": "search" }}
                onChange={handleChage}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    setKeyword(value);
                  }
                }}
                value={value}
              />
            </Search>
            <Stack direction="row" alignItems="center" spacing={2}>
              {user?.role?.provider ? (
                <Tooltip title="Manage Job Post">
                  <Fab
                    sx={{ boxShadow: 0 }}
                    size="small"
                    color="primary"
                    onClick={() => {
                      navigate("/dashboard", { replace: false });
                    }}
                  >
                    <DashboardIcon />
                  </Fab>
                </Tooltip>
              ) : null}
              {user ? (
                <Stack direction="row" spacing={2}>
                  <Tooltip title="Profile">
                    <Fab
                      sx={{ boxShadow: 0 }}
                      color="primary"
                      size="small"
                      onClick={handleViewProfile}
                    >
                      <PermIdentityIcon />
                    </Fab>
                  </Tooltip>
                  <Tooltip title="LogOut">
                    <Fab
                      sx={{ boxShadow: 0 }}
                      color="primary"
                      size="small"
                      onClick={handleLoginOut}
                    >
                      <LogoutIcon />
                    </Fab>
                  </Tooltip>
                </Stack>
              ) : (
                <Tooltip title="LogIn">
                  <Fab
                    sx={{ boxShadow: 0 }}
                    variant="extended"
                    color="primary"
                    size="medium"
                    onClick={handleLoginOut}
                  >
                    <LoginIcon />
                    LogIn
                  </Fab>
                </Tooltip>
              )}
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
