import {
  Typography,
  Box,
  Paper,
  CardContent,
  ThemeProvider,
  CardActionArea,
  Stack,
  Button,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { blueGrey, cyan } from "@mui/material/colors";
import moment from "moment";

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[500],
    },
    secondary: {
      main: cyan[900],
    },
  },
});
export default function JobCard({
  job,
  onClick,
  id,
  provider,
  clickDelete,
  clickEdit,
  clickApplicants,
}) {
  const description = job?.description || {};
  const { company, title, address, salary, posted, applicants } = description;
  const location = `${address?.city}, ${address?.country}`;
  const clickedCard = () => {
    onClick(id);
  };
  return (
    <ThemeProvider theme={theme}>
      {/* <CardActionArea onClick={clickedCard}> */}
      <Box>
        <Paper elevation={2} sx={{ border: 0, m: 4 }}>
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
              color="secondary.light"
              gutterBottom
            >
              {company}
            </Typography>
            <Typography
              sx={{ fontSize: 16, fontWeight: "bold" }}
              color="primary.dark"
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
              align="left"
            >
              {moment(posted, "YYYY-MM-DDTHH:mm:ssZ").fromNow()}
              <br />
            </Typography>
            {provider ? (
              <Stack
                sx={{ p: 2, alignItems: "right" }}
                direction="row"
                spacing={2}
                justifyContent="end"
              >
                <Button
                  component="span"
                  variant="outlined"
                  onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    clickEdit(id);
                  }}
                >
                  Edit
                </Button>
                <Button
                  component="span"
                  variant="outlined"
                  onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    clickDelete(id);
                  }}
                >
                  Delete
                </Button>
                {applicants.length > 0 ? (
                  <Button
                    component="span"
                    variant="contained"
                    onClick={(event) => {
                      event.stopPropagation();
                      event.preventDefault();
                      clickApplicants(applicants);
                    }}
                  >
                    Applicants
                  </Button>
                ) : null}
              </Stack>
            ) : (
              <Stack
                sx={{ p: 1, alignItems: "right" }}
                direction="row"
                justifyContent="end"
              >
                <Button
                  component="span"
                  variant="outlined"
                  onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    onClick(id);
                  }}
                >
                  See Detail
                </Button>
              </Stack>
            )}
          </CardContent>
        </Paper>
      </Box>
      {/* </CardActionArea> */}
    </ThemeProvider>
  );
}
