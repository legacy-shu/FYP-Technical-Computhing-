import { CssBaseline, Box, Grid, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import JobDescription from "../JobDescription";
import JobCard from "../JobCard";
import CompanyHeader from "../CompanyHeader";
import CompanyInfoList from "../CompanyInfo";
import MainAppBar from "../MainAppBar";

export default function MainPage() {
  const theme = createTheme({
    palette: {
      primary: {
        main: blueGrey.A200,
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <MainAppBar></MainAppBar>
      <Grid
        bgcolor="primary.dark"
        container
        component="main"
        sx={{ height: "100vh" }}
      >
        <CssBaseline />
        <Grid item xs={4}>
          <Box style={{ maxHeight: "100vh", overflow: "auto", minWidth: 250 }}>
            <JobCard></JobCard>
            <JobCard></JobCard>
            <JobCard></JobCard>
            <JobCard></JobCard>
            <JobCard></JobCard>
            <JobCard></JobCard>
            <JobCard></JobCard>
            <JobCard></JobCard>
            <JobCard></JobCard>
            <JobCard></JobCard>
            <JobCard></JobCard>
            <JobCard></JobCard>
            <JobCard></JobCard>
            <JobCard></JobCard>
            <JobCard></JobCard>
            <JobCard></JobCard>
            <JobCard></JobCard>
            <JobCard></JobCard>
          </Box>
        </Grid>
        <Grid item xs={8} paddingX={8}>
          <CompanyHeader></CompanyHeader>
          <Box style={{ maxHeight: "85vh", overflow: "auto", minWidth: 400 }}>
            <CompanyInfoList></CompanyInfoList>

            <JobDescription></JobDescription>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
