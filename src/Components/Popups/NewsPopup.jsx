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
import axios from "axios";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles({
  popup: {
    width: "100%",
  },
});
let file;
export default function NewsPopup(props) {
  const { openNewsPopup, setNewsOpenPopup, newsRecordForEdit } = props;
  const classes = useStyles();
  const [categories, setcategories] = useState([]);
  const [btnText, setbtnText] = useState("Submit");
  const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2MzFmNWExZjBkZjhjMTFmMTA3ZmEzZTgiLCJ1c2VyTmFtZSI6ImRlc2hpdGhhIiwiZW1haWwiOiJkZHRoaWxpbmRyYUBtYWlsLmNvbSIsImltYWdlIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZGNrMTU2bGJ3L2ltYWdlL3VwbG9hZC92MTY2Mjk5OTA2OS9wcm9maWxlUGljdHVyZS93Y2lmZ25rZ2t3bXhzcndiZHRldS5wbmcifSwiaWF0IjoxNjYzMDA5MjgzMzkyLCJleHAiOjE2NjMwMTA0OTI5OTJ9.D9neE0xgBhKHz30ndQPjPemqLImb1_HQGC7kEE0hYv4`;
  const config = {
    headers: { Authorization: token },
  };

  const handleClose = () => {
    setNewsOpenPopup(false);
    settitle("");
    setdescription("");
    setcategory("");

    settitleError(false);
    settitleHError(false);
    setdescriptionError(false);
    setdescHError(false);
    setcategoryError(false);
    setcategoryHError(false);

    window.location.reload();
  };
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState([]);

  const [titleError, settitleError] = useState(false);
  const [descriptionError, setdescriptionError] = useState(false);
  const [categoryError, setcategoryError] = useState("");

  const [titleHError, settitleHError] = useState("");
  const [descHError, setdescHError] = useState("");
  const [categoryHError, setcategoryHError] = useState("");

  const [Uimage, setUImage] = useState({});

  const handleFile = (e) => {
     console.log(e.target.files, "$$$$");
     console.log(e.target.files[0], "$$$$");
    //  let formdata = new FormData();
    // formdata.append("image", e.target.files[0]);
   
  };
  const handleSubmit = (e) => {
    
    e.preventDefault();
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
    if (category == "") {
      setcategoryError(true);
      setcategoryHError("Required");
    }

    if (title && description && category) {

      const newsData = {
        title,
        description,
        category,
      };
      console.log(newsData);
      axios
        .post(`http://localhost:8000/news/AddNews`, newsData,config)
        .then((res) => {
          if (res.data.code == 200 && res.data.success == true) {
            window.alert(res.data.message);
          } else {
            window.alert(res.data.message);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const handleUpdate = (e) => {
    
    e.preventDefault();
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
    if (category == "") {
      setcategoryError(true);
      setcategoryHError("Required");
    }

    if (title && description && category) {

      const newsData = {
        title,
        description,
        category,
      };
      console.log(newsData);
      axios
        .put(`http://localhost:8000/news/UpdateNews/`+updateId, newsData,config)
        .then((res) => {
          if (res.data.code == 200 && res.data.success == true) {
            window.alert(res.data.message);
          } else {
            window.alert(res.data.message);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const [values, setValues] = useState("");
  const [updateId, setupdateId] = useState("");
  useEffect(() => {
    setValues("");
    settitleError(false);
    setdescriptionError(false);
    const initChat = async () => {
      var id = await newsRecordForEdit;
      setupdateId(id)
      // console.log(id);
      if (id) {
        await axios
          .get(`http://localhost:8000/news/GetNewsById/` + id, config)
          .then((res) => {
            if (res.data.code == 200 && res.data.success == true) {
              // setname(id);
              settitle(res.data.data.title);
              setdescription(res.data.data.description);
              setcategory(res.data.data.category);
            } else {
              window.alert(res.data.message);
            }
          })
          .catch((err) => console.log(err));

        setbtnText("Update");
      }
      if (newsRecordForEdit != null) {
        setValues({
          ...newsRecordForEdit,
        });
      }
    };
    initChat();

    const config = {
      headers: { Authorization: token },
    };

    axios
      .get("http://localhost:8000/category/GetAllCategory", config)
      .then((res) => {
        if (res.data.code == 200 && res.data.success == true) {
          setcategories(res.data.data);
        } else {
          window.alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  }, [newsRecordForEdit]);

  return (
    <div className={classes.popup}>
      <Dialog open={openNewsPopup} onClose={handleClose}>
        <DialogTitle>Add New Employee</DialogTitle>

        <div
          className="dlgcontainer"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <DialogContent dividers>
            <TextField
              helperText={titleHError}
              value={title}
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
                helperText={categoryHError}
                error={categoryError}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                value={category}
                onChange={(e) => setcategory(e.target.value)}
              >
                {categories.map((data) => (
                  <MenuItem
                    key={data.id}
                    value={data.category}
                    setSelectedValue={data.category}
                  >
                    {data.category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogContent dividers>
            <Button variant="contained" component="label">
              Upload
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={handleFile}
              />
            </Button>
          </DialogContent>
        </div>
        <TextField
          value={description}
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
          <Button onClick={btnText == "Submit" ? handleSubmit : handleUpdate} variant="contained" color="success">
            {btnText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
