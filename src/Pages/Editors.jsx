import { Box, Button, Container, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
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

  const openInPopup = async (id, update) => {
    if (update) {
      // console.log("first " + id);
      //   setNewsRecordForEdit(id);
    }
    setOpenPopup(true);
  };
  return (
    <div>
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
          <EditorTbl data={editorData}/>
        </div>
      </div>
    </div>
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
