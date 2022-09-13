import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";

export default function CategoryPopup(props) {
  const { openCategoryPopup, setCategoryOpenPopup, adminrecordForEdit } = props;

  const token = localStorage.getItem("token")
  
  const config = {
    headers: { Authorization: token },
  };

  const [category, setcategory] = useState("");
  const [categoryError, setcategoryError] = useState(false);
  const [categoryHError, setcategoryHError] = useState("");

  const [description, setdescription] = useState("");
  const [descriptionError, setdescriptionError] = useState(false);
  const [descriptionHError, setdescriptionHError] = useState("");

  const handleClose = () => {
    setCategoryOpenPopup(false);  
    setcategoryError(false);
    setdescriptionError(false)
    setcategoryHError("")
    setdescriptionHError("")

    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (category == "") {
      setcategoryError(true);
      setcategoryHError("Required");
    }
    if (description == "") {
        setdescriptionError(true);
        setdescriptionHError("Required");
    }

    if (category && description) {
      const categoryData = {
        category,
        description
      };
      axios
        .post(`http://localhost:8000/category/addCategory`, categoryData, config)
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
  return (
    <Dialog open={openCategoryPopup} onClose={handleClose} maxWidth="lg">
      <DialogTitle>Add New Category</DialogTitle>
      <DialogContent dividers>
        <TextField
          helperText={categoryHError}
          error={categoryError}
          value={category}
          required
          autoFocus
          margin="dense"
          id="category"
          label="Category Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setcategory(e.target.value)}
        />
        <TextField
          helperText={descriptionHError}
          error={descriptionError}
          value={description}
          required
          autoFocus
          margin="dense"
          id="description"
          label="Category description"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setdescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="success">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
