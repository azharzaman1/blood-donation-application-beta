import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";
import { auth, db } from "../Files/firebase";
import { useHistory } from "react-router-dom";
import { FormControl, Grid, MenuItem, Select } from "@material-ui/core";

const Registeration = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [userID, setUserID] = useState(localStorage.getItem("userID"));
  const [finalizedUserRole, setFinalizedUserRole] = useState(
    localStorage.getItem("userRole")
  );

  const history = useHistory();
  const signinHandler = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(emailValue, passwordValue)
      .then((userObject) => {
        if (userRole === "CONTRIBUTOR" && userObject) {
          history.push("dashboard-contributor");
        } else if (userRole === "CONSUMER" && userObject) {
          history.push("dashboard-consumer");
        }
      })
      .catch((error) => alert(error.message));
  };

  const disableSubmitBtn = () => {
    if (emailValue === "" || passwordValue === "") {
      return true;
    }
  };

  const onUserRoleSelect = (event) => {
    setUserRole(event.target.value);
    setFinalizedUserRole(event.target.value);
  };

  const passwordResetHandler = () => {
    localStorage.setItem("passwordResetDefaultEmail", emailValue);
  };

  return (
    <Grid container className="signIn__container">
      <Grid item xs="12">
        <form onSubmit={signinHandler} className="signIn__form flexColumn">
          <Grid className="formHeader" container>
            <Grid item xs="12">
              <h4>Welcome Back</h4>
            </Grid>
            <Grid
              item
              container
              xs="12"
              className="signIn__formContent flexColumn"
            >
              <div className="signIn__formInput">
                <label>
                  Your Email Address <strong>*</strong>
                </label>
                <input
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  required
                  type="text"
                />
              </div>
              <div className="signIn__formInput">
                <label>
                  Your Password <strong>*</strong>
                </label>
                <input
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  required
                  type="password"
                />
                <Link onClick={passwordResetHandler} to="retrieve-password">
                  {" "}
                  Forgot password?{" "}
                </Link>
              </div>

              <input
                disabled={disableSubmitBtn()}
                className="submit__btn"
                type="submit"
              />
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Link className="back__to__home__link" to="/">
        Back to Home
      </Link>
    </Grid>
  );
};

export default Registeration;
