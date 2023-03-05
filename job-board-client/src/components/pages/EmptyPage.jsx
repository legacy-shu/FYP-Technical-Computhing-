import { Paper, Typography, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
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

export default function EmptyPage() {
  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Typography sx={{ pt: 30, pl:5 }} variant="h2" color="secondary">
          Click on the card
        </Typography>
        <Typography sx={{ mt: 2, pl: 5 }} variant="h2" color="secondary">
          on the left to view
        </Typography>
        <Typography sx={{ mt: 2, pl: 5, pb:30 }} variant="h2" color="secondary">
          the job details
        </Typography>
      </Paper>
    </ThemeProvider>
  );
}
