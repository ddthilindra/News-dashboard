import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../Components/Layout";
import NewsCard from "../Components/NewsCard";
import DeleteNewsPopup from "../Components/Popups/DeleteNewsPopup";
import NewsPopup from "../Components/Popups/NewsPopup";

const useStyles = makeStyles({
  add: {
    marginBottom: "2%",
    display: "flex",
    justifyContent: "space-between",
  },
});

export default function News() {
  const [news, setnews] = useState([]);
  const [categories, setcategories] = useState([]);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      history.push("/");
    }
    const config = {
      headers: { Authorization: token },
    };
    axios
      .get("http://localhost:8000/news/getAllNews")
      .then((res) => {
        if (res.data.code == 200 && res.data.success == true) {
          setnews(res.data.data);
        } else {
          window.alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));
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

  const [dataTable, setdataTable] = useState([]);
  const handleEdit = async (id) => {
    axios
      .put("http://localhost:3000/news" + id)
      .then((res) => {
        setnews(res.json());
      })
      .catch((err) => console.log(err));

    const newNews = news.filter((data) => data.id != id);
    setdataTable(newNews);
  };
  const classes = useStyles();

  const [category, setcategory] = useState("");

  const [newsRecordForEdit, setNewsRecordForEdit] = useState(null);

  const [newsRecordForDelete, setnewsRecordForDelete] = useState(null);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  const [openPopup, setOpenPopup] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const openInPopup = async (id, update) => {
    if (update) {
      setNewsRecordForEdit(id);
    }
    setOpenPopup(true);
  };
  const openInDeletePopup = async (item) => {
    setnewsRecordForDelete(item);
    setOpenDeletePopup(true);
  };

  function handleSelectChange(event) {
    setcategory(event.target.value);
    let _vals = event.target.value
      ? news.filter((c) => c.category === event.target.value)
      : news;
    setdataTable(_vals);
  }
  return (
    <>
      <Layout />

      <Container style={{ "margin-left": "18vw", "padding-right": "3vw" }}>
        <Box className={classes.add}>
          <FormControl style={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Category"
              onChange={handleSelectChange}
            >
              <MenuItem value={"All"}>All</MenuItem>
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
          {role == "editor" ? (
            ""
          ) : (
            <Button color="primary" variant="contained" onClick={openInPopup}>
              Add News
            </Button>
          )}
        </Box>
        <NewsPopup
          openNewsPopup={openPopup}
          setNewsOpenPopup={setOpenPopup}
          newsRecordForEdit={newsRecordForEdit}
        ></NewsPopup>
        <DeleteNewsPopup
          openDeletePopup={openDeletePopup}
          setOpenDeletePopup={setOpenDeletePopup}
          newsRecordForDelete={newsRecordForDelete}
        ></DeleteNewsPopup>
        <Grid container spacing={3}>
          {category == "" &&
            news.map((data) => (
              <Grid item key={data.id} md={3} xs={12} sm={6} lg={4}>
                <NewsCard
                  news={data}
                  openInPopup={openInPopup}
                  openInDeletePopup={openInDeletePopup}
                />
              </Grid>
            ))}
          {category == "All" &&
            news.map((data) => (
              <Grid item key={data.id} md={3} xs={12} sm={6} lg={4}>
                <NewsCard news={data} openInPopup={openInPopup} />
              </Grid>
            ))}
          {dataTable.map((data) => (
            <Grid item key={data.id} md={3} xs={12} sm={6} lg={4}>
              <NewsCard news={data} openInPopup={openInPopup} />
            </Grid>
          ))}
          {/* {category == selectedValue &&
        news.map((data) => (
            <Grid item key={data.id} md={3} xs={12} sm={6} lg={4}>
              <NewsCard news={data} openInPopup={openInPopup} />
            </Grid>
          ))} */}
        </Grid>
      </Container>
    </>
  );
}
