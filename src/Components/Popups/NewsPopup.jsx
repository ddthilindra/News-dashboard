import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles({
  popup: {
    width: "100%",
  },
});

export default function NewsPopup(props) {
  const { openNewsPopup, setNewsOpenPopup, newsRecordForEdit } = props;
  const classes = useStyles();

  const handleClose = () => {
    setNewsOpenPopup(false);
  };
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [titleError, settitleError] = useState(false);
  const [descriptionError, setdescriptionError] = useState(false);
  const [category, setcategory] = useState("todos");
  const [titleHError, settitleHError] = useState("");
  const [descHError, setdescHError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("first");
    settitleError(false);
    setdescriptionError(false);
    if (title == "") {
      settitleError(true);
      settitleHError("Required");
    }
    if (description == "") {
      setdescriptionError(true);
      setdescHError("Required");
    }

    if (title && description) {
      console.log(title, description, category);
    }
  };
  const [values, setValues] = useState("");
  const [name, setname] = useState("");
  useEffect(() => {
    setValues("")
    settitleError(false);
    setdescriptionError(false);
    const initChat = async () => {
       const values =await newsRecordForEdit;
       console.log(values)

       setname(values)
       if (newsRecordForEdit != null) {
        setValues({
          ...newsRecordForEdit,
        });
      }
    }
    initChat();
    
  }, [newsRecordForEdit]);

  return (
    <div className={classes.popup}>
      <Dialog open={openNewsPopup} onClose={handleClose}>
        <DialogTitle>Add New Employee</DialogTitle>
        <p>{name}</p>
        <div
          className="dlgcontainer"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <DialogContent dividers>
            <TextField
              helperText={titleHError}
              value={values.value}
              onChange={(e) => settitle(e.target.value)}
              className={classes.field}
              label="News Title"
              variant="outlined"
              fullWidth
              required
              error={titleError}
            />
          </DialogContent>
          <DialogContent dividers>
            <FormControl style={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                // onChange={(e) => setcategory(e.target.value)}
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"developer"}>Developer</MenuItem>
                <MenuItem value={"XXX"}>X</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogContent dividers>
            <Button variant="contained" component="label">
              Upload
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </DialogContent>
        </div>
        <TextField
          helperText={descHError}
          onChange={(e) => setdescription(e.target.value)}
          className={classes.field}
          label="Description"
          variant="outlined"
          multiline
          rows={8}
          fullWidth
          required
          error={descriptionError}
        />
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="success">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
