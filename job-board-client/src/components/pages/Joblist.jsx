import React from "react";
import { useEffect, useState } from "react";
import OutlinedCard from "../Card";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, ThemeProvider } from "@mui/material";
import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export function JoblistView({ service }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: grey[200],
      },
    },
  });
  //   const [joblist, setJoblist] = useState([]);
  //   useEffect(() => {
  //     async function getAllJobs() {
  //       const jobs = await service.getAllJobs();
  //       setJoblist(jobs);
  //     }
  //     getAllJobs();
  //   }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid
        bgcolor="primary.light"
        container
        component="main"
        sx={{ height: "100vh" }}
      >
        <CssBaseline />
        <Grid item xs={4}>
          <Box style={{ maxHeight: "100vh", overflow: "auto" }}>
            <OutlinedCard></OutlinedCard>
            <OutlinedCard></OutlinedCard>
            <OutlinedCard></OutlinedCard>
            <OutlinedCard></OutlinedCard>
            <OutlinedCard></OutlinedCard>
            <OutlinedCard></OutlinedCard>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box style={{ maxHeight: "100vh", overflow: "auto" }}></Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
