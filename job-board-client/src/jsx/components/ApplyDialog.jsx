import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function ApplyDialog({ dialogInfo }) {
  const [open, setOpen] = useState(dialogInfo.open);
  const handleLeft = () => {
    dialogInfo?.handleLeft();
    setOpen(false);
  };
  const handleRight = () => {
    dialogInfo?.handleRight();
    setOpen(false);
  };
  useEffect(() => {
    setOpen(dialogInfo.open);
  }, [dialogInfo]);
  return (
    <div>
      <Dialog
        open={open}
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
          {dialogInfo?.close ? (
            <Button variant="outlined" onClick={handleLeft}>
              {dialogInfo?.close}
            </Button>
          ) : null}

          {dialogInfo?.yes ? (
            <Button variant="outlined" onClick={handleRight} autoFocus>
              {dialogInfo?.yes}
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </div>
  );
}
