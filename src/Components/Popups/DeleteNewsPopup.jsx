import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function DeleteNewsPopup(props) {
  const { openDeletePopup, setOpenDeletePopup, newsRecordForDelete } = props;
  const [values, setValues] = useState("");
  const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2MzFmNWExZjBkZjhjMTFmMTA3ZmEzZTgiLCJ1c2VyTmFtZSI6ImRlc2hpdGhhIiwiZW1haWwiOiJkZHRoaWxpbmRyYUBtYWlsLmNvbSIsImltYWdlIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZGNrMTU2bGJ3L2ltYWdlL3VwbG9hZC92MTY2Mjk5OTA2OS9wcm9maWxlUGljdHVyZS93Y2lmZ25rZ2t3bXhzcndiZHRldS5wbmcifSwiaWF0IjoxNjYzMDA5MjgzMzkyLCJleHAiOjE2NjMwMTA0OTI5OTJ9.D9neE0xgBhKHz30ndQPjPemqLImb1_HQGC7kEE0hYv4`;
  const config = {
    headers: { Authorization: token },
  };
  useEffect(() => {
    if (newsRecordForDelete != null) {
      setValues({
        ...newsRecordForDelete,
      });
    }
  }, [newsRecordForDelete]);
  const handleClose = () => {
    setOpenDeletePopup(false);
  };

  function deleteAdmin(e) {
    e.preventDefault();

    axios
      .delete(`http://localhost:8000/news/DeleteNewsById/${values._id}`, config)
      .then((response) => {
        if (response.status == 200) {
          window.alert(`${response.data.message}`);

          setOpenDeletePopup(false);
          window.location.reload();
        } else {
          window.alert("Somthing went wrong");
        }
      })
      .catch((err) => {
        console.log("Sever error");
      });
  }
  return (
    <div>
      {/* <Button variant="outlined" >
        Open responsive dialog
      </Button> */}
      <Dialog open={openDeletePopup} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure ?"}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Are you sure you want to delete <b>{values.title}</b> ?
            <br />
            This action cannot be undone!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            cancel
          </Button>
          <Button onClick={deleteAdmin} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
