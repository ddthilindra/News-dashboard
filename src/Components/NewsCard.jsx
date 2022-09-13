import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { blue, yellow } from "@material-ui/core/colors";
import { DeleteOutlined, EditOutlined } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles({
  // test: {
  //   border: (news) => {
  //     if (news.category == "XXX") {
  //       return "1px solid red";
  //     }
  //   },
  // },
  CardMedia: {
    marginTop: "10px",
    height: "150px",
  },
  avatar: {
    backgroundColor: (news) => {
      if (news.category == "XXX") {
        return blue[700];
      }
      return yellow[500];
    },
  },
});
export default function NewsCard({ news, openInPopup , openInDeletePopup}) {
  const classes = useStyles(news);
  return (
    <div>
      <Card elevation={1} className={classes.test}>
        <CardMedia
          className={classes.CardMedia}
          image={news.imageUrl}
        ></CardMedia>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {" "}
              {news.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <div>
              <IconButton onClick={() => openInPopup(news._id,"update")}>
              {/* <p>{news._id}</p> */}
                <EditOutlined />
              </IconButton>
              <IconButton>
                <DeleteOutlined onClick={() => openInDeletePopup(news)} />
              </IconButton>
            </div>
          }
          title={news.title}
          subheader={news.category}
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {news.desc}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
