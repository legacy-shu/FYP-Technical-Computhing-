import React from "react";
import { Box, Paper, CardHeader } from "@mui/material";

export default function CompanyHeader() {
  return (
    <React.Fragment>
      <Box paddingTop={4} minWidth={400}>
        <Paper sx={{ padding: "12px" }} square>
          <CardHeader title="IKEA" subheader="iOS Developer" />
        </Paper>
      </Box>
    </React.Fragment>
  );
}
