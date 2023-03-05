import React from "react";
import { Typography, Box, Paper, CardContent } from "@mui/material";
export default function JobDescription({ detail }) {
  return (
    <React.Fragment>
      <Box>
        <Paper sx={{ padding: "16px" }}>
          <CardContent>
            <Typography
              sx={{ mb: 3, fontSize: 40, fontWeight: "bold" }}
              variant="h4"
              component="div"
            >
              Description
            </Typography>
            <Typography
              sx={{ mt: 5, fontSize: 30, fontWeight: "bold" }}
              variant="subtitle1"
              component="div"
            >
              About:
            </Typography>
            <Typography sx={{ mb: 3, p: 1 }} variant="body1">
              {detail?.about}
            </Typography>

            <Typography
              sx={{ mt: 5, fontSize: 30, fontWeight: "bold" }}
              variant="subtitle1"
              component="div"
            >
              Responsibilities:
            </Typography>

            <Typography sx={{ p: 1 }}>{detail?.responsibilities}</Typography>

            <Typography
              sx={{ mt: 5, fontSize: 30, fontWeight: "bold" }}
              variant="subtitle1"
              component="div"
            >
              Skills:
            </Typography>
            <Typography sx={{ p: 1 }}>{detail?.responsibilities}</Typography>
          </CardContent>
        </Paper>
      </Box>
    </React.Fragment>
  );
}
