import {
  Button,
  Typography,
  Box,
  Paper,
  CardActions,
  CardContent,
} from "@mui/material";

export default function JobCard() {
  return (
    <Box sx={{ m: 4, minWidth: 320 }}>
      <Paper sx={{ padding: "12px" }} variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            ABCDEFGGGGGGG
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="secondary" size="small">
            Learn More
          </Button>
        </CardActions>
      </Paper>
    </Box>
  );
}
