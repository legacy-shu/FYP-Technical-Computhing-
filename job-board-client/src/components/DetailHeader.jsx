import {
  Fab,
  Box,
  Paper,
  CardContent,
  Typography,
  ThemeProvider,
} from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import { createTheme } from "@mui/material/styles";
import { blueGrey, cyan } from "@mui/material/colors";
import { useState } from "react";
import ApplyDialog from "./ApplyDialog";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[900],
    },
    secondary: {
      main: cyan[800],
    },
  },
});

export default function DetailHeader({ detail, userProfile }) {
  const [dialogInfo, setDialogInfo] = useState({ open: false });
  const navigate = useNavigate();
  const handleApply = () => {
    let info = {
      head: "Information",
      handleLeft: handleClose,
      handleRight: handleYes,
      open: true,
      close: "Close",
      yes: "Yes, I do",
    };
    if (userProfile.cv) {
      info.body = "Do you want to apply for this job?";
    } else {
      info.body = "You need to upload your CV go to upload your CV";
    }
    setDialogInfo(info);
  };
  const handleClose = () => {
  };
  const handleYes = () => {
    if (userProfile.cv) {
    } else {
      navigate("/profile", { replace: true });
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <ApplyDialog
        dialogInfo={dialogInfo}
        setDialogInfo={setDialogInfo}
      ></ApplyDialog>
      <Box>
        <Paper sx={{ p: 1 }} square>
          <CardContent>
            <Typography
              sx={{ fontSize: 35, fontWeight: "bold" }}
              component="div"
            >
              {detail?.title}
            </Typography>
            <Typography
              mt={1}
              sx={{ fontSize: 25, fontWeight: "bold" }}
              color="secondary.dark"
              gutterBottom
            >
              {detail?.company}
            </Typography>
            <Box
              sx={{
                alignSelf: "stretch",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-start",
                p: 1,
              }}
            >
              {!userProfile.user.role.provider ? (
                <Fab
                  sx={{ fontSize: "small", boxShadow: 0 }}
                  size="medium"
                  color="secondary"
                  variant="extended"
                  onClick={handleApply}
                >
                  <NavigationIcon sx={{ mr: 1, fontSize: "small" }} />
                  Apply
                </Fab>
              ) : null}
            </Box>
          </CardContent>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
