import { Box, Button, Container, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../Components/Layout";
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
  const token = localStorage.getItem("token");

  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      history.push("/");
    }
    const config = {
      headers: { Authorization: token },
    };

    axios
      .get("http://localhost:8000/category/getAllCategory", config)
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
    <>
      <Layout />

      <div style={{ "margin-left": "18vw", "margin-right": "2vw" }}>
        <Container>
          <Box className={classes.add}>
            <Button color="primary" variant="contained" onClick={openInPopup}>
              Add
            </Button>
          </Box>
          <Box></Box>
        </Container>
        <div>
          <CategoryPopup
            openCategoryPopup={openPopup}
            setCategoryOpenPopup={setOpenPopup}
          ></CategoryPopup>
        </div>

        <div className="grid">
          <div className="listContainer">
            <CategoryTbl data={categories} />
            {/* <EditorTbl data={editorData} /> */}
          </div>
        </div>
      </div>
    </>
  );
}
