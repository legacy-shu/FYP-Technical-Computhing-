import { Box, Paper, Typography, ThemeProvider } from "@mui/material";
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
        <Box sx={{ p: 5 }}>
          <Typography sx={{ p: 5 }} variant="h2" color="secondary">
            Click on the card on the left to view the job details
          </Typography>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}
