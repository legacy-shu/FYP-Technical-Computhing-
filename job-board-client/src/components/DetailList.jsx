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
export default function DetailList({ detail }) {
  return (
    <List sx={{ bgcolor: "background.paper" }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AttachMoneyIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="SALARY" />
        <ListItemText style={{ textAlign: "right" }} primary={detail?.salary} />
      </ListItem>
      <Divider />

      <ListItem>
        <ListItemAvatar>
          <Avatar>
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
          <Avatar>
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
          <Avatar>
            <ScheduleSendIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="POSTED" />
        <ListItemText style={{ textAlign: "right" }} primary={detail?.posted} />
      </ListItem>
      <Divider />
    </List>
  );
}
