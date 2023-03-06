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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[900],
    },
    secondary: {
      main: blueGrey[800],
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
  marginRight: theme.spacing(3),
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
    width: "50vw",
  },
}));
export default function NavBar({ setKeyword, user, setUser, userAuthService }) {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const handleChage = (event) => {
    setValue(event.target.value);
  };
  const handleClick = () => {
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
            }}
          >
            <Stack direction="row" alignItems="center">
              <IconButton
                size="large"
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
                  <Fab size="medium" color="secondary.light">
                    <DashboardIcon />
                  </Fab>
                </Tooltip>
              ) : null}
              {user ? (
                <Tooltip title="LogOut">
                  <Fab
                    color="secondary.light"
                    size="medium"
                    onClick={handleClick}
                  >
                    <LogoutIcon />
                  </Fab>
                </Tooltip>
              ) : (
                <Tooltip title="LogIn">
                  <Fab
                    color="secondary.light"
                    size="medium"
                    onClick={handleClick}
                  >
                    <AccountCircleIcon />
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
