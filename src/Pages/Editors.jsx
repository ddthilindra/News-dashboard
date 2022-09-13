import { Box, Button, Container, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../Components/Layout";
import EditorPopup from "../Components/Popups/EditorPopup";
import EditorTbl from "../Components/Table/EditorTbl";

const useStyles = makeStyles({
  add: {
    marginBottom: "1%",
    marginRight: "2%",
    display: "flex",
    justifyContent: "flex-end",
  },
});

export default function Editors() {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const token = localStorage.getItem("token")

  const openInPopup = async (id, update) => {
    if (update) {
      // console.log("first " + id);
      //   setNewsRecordForEdit(id);
    }
    setOpenPopup(true);
  };
const [editors, seteditors] = useState([]);

const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      history.push('/')
    }
    const config = {
      headers: { Authorization: token },
    };
    
    axios
      .get("http://localhost:8000/editor/getAllEditors", config)
      .then((res) => {
        if (res.data.code == 200 && res.data.success == true) {
          seteditors(res.data.data);
        } else {
          window.alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Layout />
    
    <div style={{"margin-left": "18vw","margin-right": "2vw"}}>
      <Container>
        <Box className={classes.add}>
          <Button color="primary" variant="contained" onClick={openInPopup}>
            Add
          </Button>
        </Box>
        <Box></Box>
      </Container>
      <div>
        <EditorPopup
          openEditorPopup={openPopup}
          setEditorOpenPopup={setOpenPopup}
        ></EditorPopup>
      </div>

      <div className="grid">
        <div className="listContainer">
          <EditorTbl data={editors}/>
        </div>
      </div>
    </div>
    </>
  );
}

const editorData = [
  {
    id: 1,
    name: "Deshtha",
    email: "ddthilinsra@gmail.com",
    contactNo: "0705577355",
  },
  {
    id: 2,
    name: "Deshtha",
    email: "ddthilinsra@gmail.com",
    contactNo: "0705577355",
  },
  {
    id: 3,
    name: "Deshtha",
    email: "ddthilinsra@gmail.com",
    contactNo: "0705577355",
  },
  {
    id: 4,
    name: "Deshtha",
    email: "ddthilinsra@gmail.com",
    contactNo: "0705577355",
  },
  {
    id: 5,
    name: "Deshtha",
    email: "ddthilinsra@gmail.com",
    contactNo: "0705577355",
  },
  
];
