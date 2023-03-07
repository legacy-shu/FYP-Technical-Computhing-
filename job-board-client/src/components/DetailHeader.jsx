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
export default function DetailHeader({ detail }) {
  return (
    <ThemeProvider theme={theme}>
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
              <Fab
                sx={{ fontSize: "small" }}
                size="medium"
                color="secondary"
                variant="extended"
              >
                <NavigationIcon sx={{ mr: 1, fontSize: "small" }} />
                Apply
              </Fab>
            </Box>
          </CardContent>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
