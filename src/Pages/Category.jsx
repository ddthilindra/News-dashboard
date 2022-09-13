import { Box, Button, Container, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CategoryPopup from "../Components/Popups/CategoryPopup";
import CategoryTbl from "../Components/Table/CategoryTbl";

const useStyles = makeStyles({
    add: {
      marginBottom: "1%",
      marginRight: "2%",
      display: "flex",
      justifyContent: "flex-end",
    },
  });
export default function Category() {
    const classes = useStyles();

    const [openPopup, setOpenPopup] = useState(false);

    const openInPopup = async () => {
      
      setOpenPopup(true);
    };

    const [categories, setcategories] = useState([]);
    const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2MzFmNWExZjBkZjhjMTFmMTA3ZmEzZTgiLCJ1c2VyTmFtZSI6ImRlc2hpdGhhIiwiZW1haWwiOiJkZHRoaWxpbmRyYUBtYWlsLmNvbSIsImltYWdlIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZGNrMTU2bGJ3L2ltYWdlL3VwbG9hZC92MTY2Mjk5OTA2OS9wcm9maWxlUGljdHVyZS93Y2lmZ25rZ2t3bXhzcndiZHRldS5wbmcifSwiaWF0IjoxNjYzMDA5MjgzMzkyLCJleHAiOjE2NjMwMTA0OTI5OTJ9.D9neE0xgBhKHz30ndQPjPemqLImb1_HQGC7kEE0hYv4`;

    useEffect(() => {
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
      }, []);
    
  return (
    <div>
      <Container>
        <Box className={classes.add}>
          <Button color="primary" variant="contained" 
          onClick={openInPopup}
          >
            Add
          </Button>
        </Box>
        <Box></Box>
      </Container>
      <div>
      <CategoryPopup
      openCategoryPopup={openPopup}
      setCategoryOpenPopup={setOpenPopup}
      >
      
      </CategoryPopup>
        
      </div>

      <div className="grid">
        <div className="listContainer">
        <CategoryTbl data={categories}/>
          {/* <EditorTbl data={editorData} /> */}
        </div>
      </div>
    </div>
  );
}
