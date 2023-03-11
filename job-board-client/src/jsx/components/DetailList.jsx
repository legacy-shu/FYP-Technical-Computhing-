import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PlaceIcon from "@mui/icons-material/Place";
import WorkIcon from "@mui/icons-material/Work";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import moment from "moment";

export default function DetailList({ detail }) {
  return (
    <List sx={{ bgcolor: "background.paper" }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "secondary.dark" }}>
            <AttachMoneyIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="SALARY" />
        <ListItemText style={{ textAlign: "right" }} primary={detail?.salary} />
      </ListItem>
      <Divider />

      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "secondary.dark" }}>
            <PlaceIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="LOCATION" />
        <ListItemText
          style={{ textAlign: "right" }}
          primary={`${detail?.address?.city},${detail?.address?.country}`}
        />
      </ListItem>
      <Divider />

      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "secondary.dark" }}>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="JOB TYPE" />
        <ListItemText
          style={{ textAlign: "right" }}
          primary={detail?.jobType}
        />
      </ListItem>
      <Divider />

      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "secondary.dark" }}>
            <ScheduleSendIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="POSTED" />
        <ListItemText
          style={{ textAlign: "right" }}
          primary={moment(detail?.posted, "YYYY-MM-DDTHH:mm:ssZ").fromNow()}
        />
      </ListItem>
      <Divider />
    </List>
  );
}
