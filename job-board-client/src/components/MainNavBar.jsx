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
  Grid,
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
            <Grid
              width={200}
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
                  {user?.role?.provider ? (
                    <Tooltip title="Manage Job Post">
                      <Fab
                        size="medium"
                        color="secondary.light"
                        onClick={() => {
                          navigate("/dashboard", { replace: false });
                        }}
                      >
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
                        variant="extended"
                        color="secondary.light"
                        size="medium"
                        onClick={handleClick}
                      >
                        <AccountCircleIcon />
                        LogIn
                      </Fab>
                    </Tooltip>
                  )}
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
