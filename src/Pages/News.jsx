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
import NewsCard from "../Components/NewsCard";
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
  useEffect(() => {
    axios
      .get("http://localhost:3000/news")
      .then((res) => {
        console.log(res);
        setnews(res.json());
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = async (id) => {
    console.log("first");
    axios
      .put("http://localhost:3000/news" + id)
      .then((res) => {
        console.log(res);
        setnews(res.json());
      })
      .catch((err) => console.log(err));

    const newNews = news.filter((data) => data.id != id);
    setnews(newNews);
  };
  const classes = useStyles();

  const [category, setcategory] = useState("");

  const [newsRecordForEdit, setNewsRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);

  const openInPopup = async (id, update) => {
    if (update) {
      // console.log("first " + id);
      setNewsRecordForEdit(id);
    }
    setOpenPopup(true);
  };
  return (
    <Container>
      <Box className={classes.add}>
        <FormControl style={{ minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Category"
            onChange={(e) => setcategory(e.target.value)}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"developer"}>Developer</MenuItem>
            <MenuItem value={"XXX"}>X</MenuItem>
          </Select>
        </FormControl>
        <Button color="primary" variant="contained" onClick={openInPopup}>
          Add News
        </Button>
      </Box>
      <NewsPopup
        openNewsPopup={openPopup}
        setNewsOpenPopup={setOpenPopup}
        newsRecordForEdit={newsRecordForEdit}
      ></NewsPopup>
      <Grid container spacing={3}>
        {category == "" &&
          newsData.map((data) => (
            <Grid item key={data.id} md={3} xs={12} sm={6} lg={4}>
              <NewsCard news={data} openInPopup={openInPopup} />
            </Grid>
          ))}
        {category == "All" &&
          newsData.map((data) => (
            <Grid item key={data.id} md={3} xs={12} sm={6} lg={4}>
              <NewsCard news={data} openInPopup={openInPopup} />
            </Grid>
          ))}
        {category == "XXX" &&
          newsData.map((data) => (
            <Grid item key={data.id} md={3} xs={12} sm={6} lg={4}>
              <NewsCard news={data} openInPopup={openInPopup} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

const newsData = [
  {
    id: 1,
    title: "News1",
    desc: "asdasdasdas asdasdasd asdasd asd a sd as dasd    asd as d  asd as dasdasdasd  asdasdas",
    category: "XXX",
    imageUrl:
      "https://www.borouge.com/MediaCentre/Images1/News-Website-banner-V1.JPG",
  },
  {
    id: 2,
    title: "News1",
    category: "XXX",
    desc: "asdasdasdas asdasdasd asdasd asd a sd as dasd    asd as d  asd as dasdasdasd  asdasdas",
  },
  {
    id: 3,
    title: "News1",
    category: "XXX",
    desc: "asdasdasdas asdasdasd asdasd asd a sd as dasd    asd as d  asd as dasdasdasd  asdasdas",
  },
  {
    id: 4,
    title: "News1",
    category: "XXX",
    desc: "asdasdasdas asdasdasd asdasd asd a sd as dasd    asd as d  asd as dasdasdasd  asdasdas",
  },
  {
    id: 5,
    title: "News1",
    category: "XXX",
    desc: "asdasdasdas asdasdasd asdasd asd a sd as dasd    asd as d  asd as dasdasdasd  asdasdas",
  },
];
