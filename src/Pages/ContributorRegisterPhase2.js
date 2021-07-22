import React, { useState } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import firebase from "firebase";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "./Step2.css";
import { Checkbox, FormControl, MenuItem, Select } from "@material-ui/core";
import { useHistory, Redirect } from "react-router-dom";
import { auth, db } from "../Files/firebase";
import { useStateValue } from "../Files/ContextProvider";

const ContributorRegisterPhase2 = () => {
  const [{ currentUser }, dispatch] = useStateValue();
  const [selectedDOB, setSelectedDOB] = useState(null);
  const [firstBloodState, setFirstBloodState] = useState(false);
  const [bloodScreeningState, setBloodScreeningState] = useState(false);
  const [sourceToKnow, setSourceToKnow] = useState("select");
  const [bloodScreeningDate, setBloodScreeningDate] = useState(null);
  const [bloodDonationDate, setbloodDonationDate] = useState(null);
  const [userID, setUserID] = useState(localStorage.getItem("userID"));
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [emailStatus, setEmailStatus] = useState(currentUser?.emailVerified);

  let history = useHistory();

  if (localStorage.getItem("phase2Completed")) {
    return (
      <Redirect
        to={
          userRole === "CONTRIBUTOR"
            ? "dashboard-contributor"
            : "dashboard-consumer"
        }
      />
    );
  }

  const handleDateChange = (dob) => {
    setSelectedDOB(dob);
  };

  const handleBloodDonationDateChange = (date) => {
    setbloodDonationDate(date);
  };

  const handleBloodScreeningDateChange = (date) => {
    setBloodScreeningDate(date);
  };

  const handleFirstBloodChange = (e) => {
    setFirstBloodState(e.target.checked);
  };

  const handleBloodScreeningChange = (e) => {
    setBloodScreeningState(e.target.checked);
  };

  const proceedToDashboard = async () => {
    if (!selectedDOB) {
      alert("Date of Birth is mandetory to Proceed to dashboard");
    } else {
      db.collection("contributorsList")
        .doc(currentUser?.uid)
        .set(
          {
            phase2: {
              dob: selectedDOB,
              firstBloodBloodDonated: firstBloodState,
              latestBloodDonationDate: bloodDonationDate,
              bloodScreening: bloodScreeningState,
              latestBloodScreeningDate: bloodScreeningDate,
              sourceToKnowAboutUs: sourceToKnow,
            },
            phase2Completed: true,
          },

          { merge: true }
        );

      localStorage.setItem("phase2Completed", true);

      if (!emailStatus) {
        try {
          await firebase
            .auth()
            .currentUser.sendEmailVerification()
            .then(() => {
              console.log("Sent email VERIFICATION");
            });
          history.push("email_verification");
        } catch {
          console.log("There was a problem sending email verfication");
        }
      } else {
        history.push("dashboard-contributor");
      }
    }
  };

  return (
    <div className="register__phase2">
      <div className="registerPhase2__contentCont flexColumn align-center center">
        <h3 className="registerPhase2__tagline">Registration: Step 2</h3>
        <div className="register__phase2Content align-center center">
          <div className="phase2__input flexRow align-center">
            <h3 className="input__text">
              Your Date of Birth <small>(dd/mm/yyyy)</small>
            </h3>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                value={selectedDOB}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </div>

          <div className="phase2__input flexRow align-center">
            <h3 className="input__text">
              Have you ever had medical checkup{" "}
              <a
                href="https://www.aabb.org/regulatory-and-advocacy/regulatory-affairs/regulatory-for-blood/donor-safety-screening-and-testing"
                target="_blank"
              >
                (blood screening)
              </a>
              ?
            </h3>
            <Checkbox
              checked={bloodScreeningState}
              onChange={handleBloodScreeningChange}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>

          {bloodScreeningState && (
            <div className="phase2__input flexRow align-center">
              <h3 className="input__text">Estimated date of checkup</h3>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  value={bloodScreeningDate}
                  onChange={handleBloodScreeningDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          )}

          <div className="phase2__input flexRow align-center">
            <h3 className="input__text">Have you donated blood first?</h3>
            <Checkbox
              checked={firstBloodState}
              onChange={handleFirstBloodChange}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>

          {firstBloodState && (
            <div className="phase2__input flexRow align-center">
              <h3 className="input__text">Estimated date of donation</h3>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  value={bloodDonationDate}
                  onChange={handleBloodDonationDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          )}

          <div className="phase2__input flexRow align-center">
            <h3 className="input__text">How did you came to know about us?</h3>
            <FormControl required className="phase2__dropdown">
              <Select
                onChange={(e) => {
                  console.log(e.target.value);
                  setSourceToKnow(e.target.value);
                }}
                variant="outlined"
                value={sourceToKnow}
              >
                <MenuItem value="select"> Select </MenuItem>
                <MenuItem value="internet"> Internet </MenuItem>
                <MenuItem value="social_media_advertisment">
                  Social Media Advertisement
                </MenuItem>
                <MenuItem value="friend_relative">
                  Friend or other relative
                </MenuItem>
                <MenuItem value="brochure_tvadvertisement">
                  Brochure or T.V Advertisment
                </MenuItem>
                <MenuItem value="other"> Other </MenuItem>
              </Select>
            </FormControl>
          </div>
          <button onClick={proceedToDashboard}>Proceed to Dashboard</button>
        </div>
      </div>
    </div>
  );
};

export default ContributorRegisterPhase2;
