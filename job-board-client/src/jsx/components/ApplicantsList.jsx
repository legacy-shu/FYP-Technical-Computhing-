import * as React from "react";
import { storage } from "../../utils/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { useEffect, useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  open,
  setOpen,
  applicants,
  userProfileService,
}) {
  const [appliedUsers, setAppliedUsers] = useState(undefined);
  const handleListItemClick = (event, index) => {
    const link = appliedUsers[index].cv;
    window.open(link, '_blank', 'noreferrer')
  };

  useEffect(() => {
    const getCVFromStorage = async () => {
      let storageRef;
      let urls = await Promise.all(
        applicants?.map(async (id) => {
          storageRef = ref(storage, `CVs/${id}`);
          return await getDownloadURL(storageRef);
        }) ?? []
      );
      let result = await Promise.all(
        applicants?.map(async (id) => {
          return await userProfileService.getUser(id);
        }) ?? []
      );

      let appliedusers = result?.map((result, index) => {
        return {
          name: `${result.data.profile.name.first} ${result.data.profile.name.last}`,
          email: result.data.profile.user.email,
          cv: urls[index],
        };
      });
      setAppliedUsers(appliedusers);
    };
    getCVFromStorage();
  }, [applicants]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Applicant List
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {appliedUsers?.map((user, index) => (
            <>
              <ListItemButton
                key={index}
                onClick={(event) => handleListItemClick(event, index)}
              >
                <ListItemText primary={user.name} secondary={user.email} />
              </ListItemButton>
              <Divider />
            </>
          ))}
        </List>
      </Dialog>
    </div>
  );
}
