import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function ApplyDialog({ dialogInfo, setDialogInfo }) {
  const handleLeft = () => {
    let info = {
      ...dialogInfo,
      open: false,
    };
    dialogInfo?.handleLeft();
    setDialogInfo(info);
  };

  const handleRight = () => {
    let info = {
      ...dialogInfo,
      open: false,
    };
    dialogInfo?.handleRight();
    setDialogInfo(info);
  };
  return (
    <div>
      <Dialog
        open={dialogInfo?.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogInfo?.head}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogInfo?.body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleLeft}>
            {dialogInfo?.close}
          </Button>
          <Button variant="outlined" onClick={handleRight} autoFocus>
            {dialogInfo?.yes}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
