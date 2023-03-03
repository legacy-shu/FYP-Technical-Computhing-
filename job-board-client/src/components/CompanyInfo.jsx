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
export default function CompanyInfoList() {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AttachMoneyIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="SALARY" />
        <ListItemText
          style={{ textAlign: "right" }}
          primary="£25000 - £35000 / Per Year"
        />
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
          primary="Chorley, NW PR7"
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
          primary="Full-Time, Permanent"
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
        <ListItemText style={{ textAlign: "right" }} primary="2 days ago" />
      </ListItem>
      <Divider />
    </List>
  );
}
