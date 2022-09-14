import {
  Avatar,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "-10%",
  },
  paper: {
    margin: theme.spacing(2, 6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [emailError, setemailError] = useState(false);
  const [emailHError, setemailHError] = useState("");
  const [passwordError, setpasswordError] = useState(false);
  const [passwordHError, setpasswordHError] = useState("");

  var isSuccess = false;

  async function handelLogin(e) {
    e.preventDefault();
    setemailError(false);
    setpasswordError(false);
    if (email == "") {
      setemailError(true);
      setemailHError("Required");
    }

    if (password == "") {
      setpasswordError(true);
      setpasswordHError("Required");
    }

    if (email && password) {
      const userData = {
        email,
        password,
      };

      localStorage.clear();
      if (!isSuccess) {
        await axios
          .post(`http://localhost:8000/admin/login`, userData)
          .then((res) => {
            if (res.data.code == 200 && res.data.success == true) {
              isSuccess = true;
              localStorage.setItem("username", res.data.token.sub.firstName);
              localStorage.setItem("email", res.data.token.sub.email);
              localStorage.setItem("token", res.data.token.token);
              localStorage.setItem("isLoggedIn", true);
              localStorage.setItem("role", "admin");
              window.alert(res.data.message);
              history.push("/news");
            } else {
              console.log(res.data.message);
            }
          })
          .catch((err) => console.log(err));
      }
      if (!isSuccess) {
        await axios
          .post(`http://localhost:8000/editor/login`, userData)
          .then((res) => {
            if (res.data.code == 200 && res.data.success == true) {
              isSuccess = true;
              localStorage.setItem("username", res.data.token.sub.firstName);
              localStorage.setItem("email", res.data.token.sub.email);
              localStorage.setItem("token", res.data.token.token);
              localStorage.setItem("isLoggedIn", true);
              localStorage.setItem("role", "editor");
              window.alert(res.data.message);
              history.push("/news");
            } else {
              console.log(res.data.message);
            }
          })
          .catch((err) => console.log(err));
      }
    }
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={2} md={3} className={classes.image} />
      <Grid
        className={classes.size}
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={1}
        square
      >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              onChange={(e) => setemail(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
            />
            <TextField
              onChange={(e) => setpassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handelLogin}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
            {/* <Box mt={5}>
              <Copyright />
            </Box> */}
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
