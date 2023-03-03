import { Box, Paper, ThemeProvider, CardHeader } from "@mui/material";

export default function CompanyHeader() {
  return (
    <ThemeProvider>
      <Box paddingTop={4} minWidth={400}>
        <Paper sx={{ padding: "12px" }} square>
          <CardHeader title="IKEA" subheader="iOS Developer" />
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
