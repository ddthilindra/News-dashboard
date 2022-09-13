import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles({
  popup: {
    width: "100%",
  },
});

export default function EditorPopup(props) {
  const { openEditorPopup, setEditorOpenPopup } = props;
  const classes = useStyles();
  const [fname, setfname] = useState("");
  const [email_address, setemail_address] = useState("");
  const [mobile_number, setmobile_number] = useState(Number);
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [lname, setlname] = useState("");
  const token = localStorage.getItem("token")
  useEffect(() => {
    setErrorFname(false);
    setErrorEmail(false);
    setErrorPhone(false);
    setErrorPass(false);
    setErrorCPass(false);
  }, []);
  const handleClose = () => {
    setEditorOpenPopup(false);
    setfname("");
    setemail_address("");
    setmobile_number("");
    setpassword("");
    setcpassword("");
    setlname("");

    setErrorFname(false);
    setErrorEmail(false);
    setErrorPhone(false);
    setErrorPass(false);
    setErrorCPass(false);
    seterrorLname(false);

    setfNameError("");
    setemailAddressError("");
    setPhoneError("");
    setPassError("");
    setCPassError("");
    setlnameError("");
  };

  const [errorFname, setErrorFname] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [errorCPass, setErrorCPass] = useState(false);

  const [errorLname, seterrorLname] = useState(false);

  const [lnameError, setlnameError] = useState(false);

  const [fNameError, setfNameError] = useState("");
  const [emailAddressError, setemailAddressError] = useState(false);
  const [PhoneError, setPhoneError] = useState(false);
  const [PassError, setPassError] = useState(false);
  const [CPassError, setCPassError] = useState(false);

  function validate() {
    setErrorFname(false);
    setErrorEmail(false);
    setErrorPhone(false);
    setErrorPass(false);
    setErrorCPass(false);
    seterrorLname(false);

    setfNameError("");
    setemailAddressError("");
    setPhoneError("");
    setPassError("");
    setCPassError("");
    setlnameError("");

    if (fname == "") {
      console.log("empty admin_name");
      setErrorFname(true);
      setfNameError("This field is required");
    }
    if (!lname.trim()) {
      console.log("empty email_address");
      seterrorLname(true);
      setlnameError("This field is required");
    }

    if (!email_address.trim()) {
      console.log("empty email_address");
      setErrorEmail(true);
      setemailAddressError("This field is required");
    }

    if (mobile_number < 10) {
      console.log("empty mobile_number");
      setErrorPhone(true);
      setPhoneError("This field is required");
    }
    //password validation
    const cond3 = "/^(?=.*[0-9]).{6,20}$/";
    if (!password) {
      console.log("empty password");
      setErrorPass(true);
      setPassError("This field is required");
    } else if (password.length < 6) {
      console.log("empty password");
      setErrorPass(true);
      setPassError("Password must be longer than 6 characters");
    } else if (password.length >= 20) {
      console.log("empty password");
      setErrorPass(true);
      setPassError("Password must shorter than 20 characters");
    }

    if (!cpassword.trim()) {
      console.log("empty password");
      setErrorCPass(true);
      setCPassError("This field is required");
    } else if (cpassword != password) {
      console.log("passward missmatch");
      setErrorCPass(true);
      setCPassError("Password does not match confirmation password");
    }
  }

  async function addEditor(e) {
    e.preventDefault();
    const validation = await validate();
    if (fname && email_address && mobile_number && password && cpassword) {
      const editorData = {
        firstName: fname,
        lastName: lname,
        email: email_address,
        mobile: mobile_number,
        password,
      };
      console.log(editorData)
      const config = {
        headers: { Authorization: token },
      };
      axios
        .post(`http://localhost:8000/editor/addEditor`, editorData,config)
        .then((response) => {
          console.log(response.data);

          if (response.status == 200) {
            window.alert(`${response.data.message}`);
            // setUpdateOpenPopup(false);
            window.location.reload(false);
            console.log(`${response.status}`);
            console.log(response.data.message);
            setfname("");
            setemail_address("");
            setmobile_number("");
            setpassword("");
            setcpassword("");
          } else {
            window.alert("Somthing went wrong");
            console.log(`${response.status}`);
            console.log(response.data.message);
          }
        })
        .catch((err) => {
          console.log("Sever error");
          if (
            err.response &&
            err.response.status >= 400 &&
            err.response.status <= 500
          ) {
            window.alert("Sever error");
          }
        });
    } else {
    }
  }
  return (
    <div className={classes.popup}>
      <Dialog open={openEditorPopup} onClose={handleClose}>
        <DialogTitle>Add New Employee</DialogTitle>
        {/* <p>{name}</p> */}
        <div
          className="dlgcontainer"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <DialogContent dividers>
            <TextField
              error={errorFname}
              helperText={fNameError}
              value={fname}
              required
              autoFocus
              margin="dense"
              id="name"
              label="First Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setfname(e.target.value)}
            />

            <TextField
              // defaultValue={values.id}
              error={errorPhone}
              helperText={PhoneError}
              value={mobile_number}
              required
              margin="dense"
              id="name"
              label="Phone Number"
              type="number"
              fullWidth
              variant="standard"
              onChange={(e) => setmobile_number(e.target.value)}
            />

            <TextField
              error={errorPass}
              helperText={PassError}
              value={password}
              required
              margin="dense"
              id="name"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              onChange={(e) => setpassword(e.target.value)}
            />
          </DialogContent>
          <DialogContent dividers>
            <TextField
              error={errorLname}
              helperText={lnameError}
              value={lname}
              required
              margin="dense"
              id="name"
              label="Last Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setlname(e.target.value)}
            />

            <TextField
              error={errorEmail}
              helperText={emailAddressError}
              value={email_address}
              required
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              onChange={(e) => setemail_address(e.target.value)}
            />

            <TextField
              error={errorCPass}
              helperText={CPassError}
              value={cpassword}
              required
              margin="dense"
              id="name"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="standard"
              onChange={(e) => setcpassword(e.target.value)}
            />
          </DialogContent>
        </div>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={addEditor} variant="contained" color="success">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
