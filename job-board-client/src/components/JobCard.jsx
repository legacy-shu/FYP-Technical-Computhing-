import {
  Typography,
  Box,
  Paper,
  CardContent,
  ThemeProvider,
  CardActionArea,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import moment from "moment";

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[500],
    },
    secondary: {
      main: blueGrey[800],
    },
  },
});
export default function JobCard({ job, onClick, id }) {
  const description = job?.description || {};
  const { company, title, address, salary, posted } = description;
  const location = `${address?.city},${address?.country}`;
  const clickedCard = () => {
    onClick(id);
  };
  return (
    <ThemeProvider theme={theme}>
      <CardActionArea onClick={clickedCard}>
        <Box>
          <Paper sx={{ border: 1, m: 4 }} variant="outlined">
            <CardContent>
              <Typography
                sx={{ fontSize: 30, fontWeight: "bold" }}
                component="div"
              >
                {title}
              </Typography>
              <Typography
                mt={1}
                sx={{ fontSize: 20, fontWeight: "bold" }}
                color="secondary"
                gutterBottom
              >
                {company}
              </Typography>
              <Typography
                sx={{ fontSize: 15, fontWeight: "bold" }}
                color="secondary.light"
              >
                {location}
              </Typography>
              <Typography mt={1} sx={{ fontSize: 15, fontWeight: "bold" }}>
                {salary}
                <br />
              </Typography>
              <Typography
                mt={1}
                sx={{ fontSize: 12, fontWeight: "bold" }}
                align="right"
              >
                {moment(posted, "YYYY-MM-DDTHH:mm:ssZ").fromNow()}
                <br />
              </Typography>
            </CardContent>
          </Paper>
        </Box>
      </CardActionArea>
    </ThemeProvider>
  );
}
