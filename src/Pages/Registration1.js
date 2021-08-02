import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Authentication.css";
import { auth, db } from "../Files/firebase";
import { useHistory } from "react-router-dom";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@material-ui/core";

const Registeration = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  // const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  // const [userID, setUserID] = useState(localStorage.getItem("userID"));
  // const [finalizedUserRole, setFinalizedUserRole] = useState(
  //   localStorage.getItem("userRole")
  // );

  // const history = useHistory();
  // const signinHandler = (e) => {
  //   e.preventDefault();

  //   auth
  //     .signInWithEmailAndPassword(emailValue, passwordValue)
  //     .then((userObject) => {
  //       if (userRole === "CONTRIBUTOR" && userObject) {
  //         history.push("dashboard-contributor");
  //       } else if (userRole === "CONSUMER" && userObject) {
  //         history.push("dashboard-consumer");
  //       }
  //     })
  //     .catch((error) => alert(error.message));
  // };

  // const disableSubmitBtn = () => {
  //   if (emailValue === "" || passwordValue === "") {
  //     return true;
  //   }
  // };

  // const onUserRoleSelect = (event) => {
  //   setUserRole(event.target.value);
  //   setFinalizedUserRole(event.target.value);
  // };

  // const passwordResetHandler = () => {
  //   localStorage.setItem("passwordResetDefaultEmail", emailValue);
  // };

  return (
    <Container maxWidth="xs" className="pageContainer signupPage__container">
      <Grid item xs="12">
        <form className="form signupForm">
          <Grid
            container
            alignItems="center"
            direction="column"
            className="formHeader"
          >
            <Grid item xs="12">
              <h4>Fill in your details to Register</h4>
            </Grid>
            <Grid item container xs="12" className="signupForm__content">
              <Grid
                item
                container
                direction="column"
                className="signupForm__input"
              >
                <TextField
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  color="primary"
                  onChange={(e) => setEmailValue(e.target.value)}
                />
              </Grid>
              <Grid
                item
                container
                direction="column"
                className="signupForm__input"
              >
                <TextField
                  label="Your Password"
                  type="password"
                  variant="outlined"
                  color="primary"
                  onChange={(e) => setPasswordValue(e.target.value)}
                />
              </Grid>
              <Grid
                item
                container
                direction="column"
                className="signupForm__input"
              >
                <FormControl component="fieldset">
                  <FormLabel component="legend">I am a</FormLabel>
                  <RadioGroup
                    aria-label="roles"
                    name="controlled-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="contributor"
                      control={<Radio />}
                      label="Donor"
                    />
                    <FormControlLabel
                      value="consumer"
                      control={<Radio />}
                      label="Consumer"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs="12">
              <Button
                color="primary"
                variant="outlined"
                className="submitButton"
              >
                Create Account
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      {/* <Link className="back__to__home__link" to="/">
        Back to Home
      </Link> */}
    </Container>
  );
};

export default Registeration;
