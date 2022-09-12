import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";

const useStyles = makeStyles({
  btn: {
    fontSize: 60,
    backgroundColor: "violet",
    "&:hover": {
      backgroundColor: "blue",
    },
  },
  title: {
    textDecoration: "underline",
    marginBottom: 20,
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});
export default function Dashboard() {
  const classes = useStyles();
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [titleError, settitleError] = useState(false);
  const [descriptionError, setdescriptionError] = useState(false);
  const [category, setcategory] = useState("todos");

  useEffect(() => {
    settitleError(false);
    setdescriptionError(false);
    
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    settitleError(false);
    setdescriptionError(false);
    if (title == "") {
      settitleError(true);
    }
    if (description == "") {
      setdescriptionError(true);
    }

    if (title && description) {
      console.log(title, description,category);
    }
  };
  return (
    <Container>
      <Typography
        className={classes.title}
        variant="h6"
        component="h2"
        color="primary"
        gutterBottom
      >
        Create news
      </Typography>

      <form noValidate onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => settitle(e.target.value)}
          className={classes.field}
          label="News Title"
          variant="outlined"
          fullWidth
          required
          error={titleError}
        />
        <TextField
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
        <FormControl className={classes.field}>
            <FormLabel>Category</FormLabel>
        <RadioGroup value={category} onChange={(e)=>setcategory(e.target.value)}>
            <FormControlLabel value="money" control={<Radio />} label="Money"/>
            <FormControlLabel value="todos" control={<Radio />} label="Todos"/>
            <FormControlLabel value="work" control={<Radio />} label="Work"/>
        </RadioGroup>
        </FormControl>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          endIcon={<SendIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
