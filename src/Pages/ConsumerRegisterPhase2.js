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
import { db } from "../Files/firebase";
// import { useStateValue } from "../Files/ContextProvider";

const ContributorRegisterPhase2 = () => {
  // const [{ currentUser }, dispatch] = useStateValue();
  const [selectedDOB, setSelectedDOB] = useState(null);
  const [mySelfRecipient, setMySelfRecipient] = useState(true);
  const [relationToRecipient, setRelationToRecipient] =
    useState("family-member");
  const [willToContribute, setWillToContribute] = useState(true);
  const [reasonForNotToDonate, setReasonForNotToDonate] = useState("select");
  const [sourceToKnow, setSourceToKnow] = useState("select");
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

  const proceedToDashboard = async () => {
    if (!selectedDOB) {
      alert("Date of Birth is mandetory to Proceed to dashboard");
    } else {
      const DocRef = db.collection("consumersList").doc(currentUser?.uid);

      DocRef.set(
        {
          phase2: {
            dob: selectedDOB,
            mySelfRecipient: mySelfRecipient,
            relationToRecipient: relationToRecipient,
            willToContribute: willToContribute,
            reasonForNotToDonate: reasonForNotToDonate,
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

  const handleMySelfRecipient = (e) => {
    setMySelfRecipient(e.target.checked);
  };

  const handleWillToContribute = (e) => {
    setWillToContribute(e.target.checked);
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
            <h3 className="input__text">Are you blood Recipient yourself?</h3>
            <Checkbox
              checked={mySelfRecipient}
              onChange={handleMySelfRecipient}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>

          {!mySelfRecipient && (
            <div className="phase2__input flexRow align-center">
              <h3 className="input__text">
                How are you related to Blood Receipient?
              </h3>
              <FormControl required className="phase2__dropdown">
                <Select
                  onChange={(e) => {
                    console.log(e.target.value);
                    setRelationToRecipient(e.target.value);
                  }}
                  variant="outlined"
                  value={relationToRecipient}
                >
                  <MenuItem value="family-member"> Family Member </MenuItem>
                  <MenuItem value="friend"> Friend </MenuItem>
                  <MenuItem value="colleague">Colleague</MenuItem>
                  <MenuItem value="stranger">Stranger</MenuItem>
                  <MenuItem value="other"> Other </MenuItem>
                </Select>
              </FormControl>
            </div>
          )}

          <div className="phase2__input flexRow align-center">
            <h3 className="input__text">
              Are you willing to Contribute to our community in future?
            </h3>
            <Checkbox
              checked={willToContribute}
              onChange={handleWillToContribute}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>

          {!willToContribute && (
            <div className="phase2__input flexRow align-center">
              <h3 className="input__text">
                We will be glad to know the Reason?
              </h3>
              <FormControl required className="phase2__dropdown">
                <Select
                  onChange={(e) => {
                    console.log(e.target.value);
                    setReasonForNotToDonate(e.target.value);
                  }}
                  variant="outlined"
                  value={reasonForNotToDonate}
                >
                  <MenuItem value="select"> Select </MenuItem>
                  <MenuItem value="below_17_years"> Below 17 Years </MenuItem>
                  <MenuItem value="health_issues">Health Issues</MenuItem>
                  <MenuItem value="weak_physique">Weak Physique</MenuItem>
                  <MenuItem value="not_allowed">
                    Not Allowed by Guardians
                  </MenuItem>
                  <MenuItem value="other"> Some Other Reason </MenuItem>
                </Select>
              </FormControl>
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
