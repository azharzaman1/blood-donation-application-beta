import React, { useState, useEffect } from "react";
import {
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import firebase from "firebase";
import "./Registeration.css";
import { auth, db } from "../Files/firebase";
import { useHistory, Redirect } from "react-router-dom";
// import { useStateValue } from "../Files/ContextProvider";

const Registeration = () => {
  // const [{ currentUser }] = useStateValue();
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [mobileNoValue, setMobileNoValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [presentAddressValue, setPresentAddressValue] = useState("");
  const [postalCodeValue, setPostalCodeValue] = useState("");
  const [purposeToJoinValue, setPurposeToJoinValue] = useState("");
  const [bloodGroup, setBloodGroup] = useState("not__select");
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [userID, setUserID] = useState(localStorage.getItem("userID"));
  const [finalizedUserRole, setFinalizedUserRole] = useState(
    localStorage.getItem("userRole")
  );

  const history = useHistory();

  const signupHandler = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(emailValue, passwordValue)
      .then((userObject) => {
        const collectionName = () => {
          if (finalizedUserRole === "CONTRIBUTOR") {
            return "contributorsList";
          } else if (finalizedUserRole === "CONSUMER") {
            return "consumersList";
          } else {
            return "errorUsers";
          }
        };
        db.collection(collectionName())
          .doc(userObject?.user.uid)
          .set({
            userID: userObject?.user.uid,
            userRole: finalizedUserRole,
            firstName: firstNameValue,
            lastName: lastNameValue,
            displayName: `${firstNameValue} ${lastNameValue}`,
            userEmail: emailValue,
            accountPassword: passwordValue,
            accountMobileNumber: mobileNoValue,
            presentAddress: presentAddressValue,
            postalCode: postalCodeValue,
            purposeToJoin: purposeToJoinValue,
            bloodGroup: bloodGroup,
            phase2: {},
            phase2Completed: false,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });

        localStorage.setItem(
          "displayName",
          `${firstNameValue} ${lastNameValue}`
        );

        if (finalizedUserRole === "CONTRIBUTOR" && userObject) {
          history.push("contributor_register-phase2");
        } else if (finalizedUserRole === "CONSUMER" && userObject) {
          history.push("consumer_register-phase2");
        }
      })
      .catch((error) => alert(error.message));
  };

  const onBloodGroupSelect = (event) => {
    const selectedBloodGroupCode = event.target.value;
    setBloodGroup(selectedBloodGroupCode);
  };

  const onUserRoleSelect = (event) => {
    setUserRole(event.target.value);
    setFinalizedUserRole(event.target.value);
  };

  const disableSubmitBtn = () => {
    if (bloodGroup === "not__select") {
      return true;
    }
  };

  return (
    <Container maxWidth="md" className="pageContainer signupPage__container">
      <form onSubmit={signupHandler} className="form signupForm">
        <div className="formHeader">
          <h4>Welcome Here</h4>
        </div>

        <FormRow>
          <FormRowItem className="form__input">
            <label>
              First Name <strong>*</strong>
            </label>
            <input
              value={firstNameValue}
              onChange={(e) => setFirstNameValue(e.target.value)}
              required
              type="text"
            />
          </FormRowItem>
          <FormRowItem>
            <label>
              Last Name <strong>*</strong>
            </label>
            <input
              value={lastNameValue}
              onChange={(e) => setLastNameValue(e.target.value)}
              required
              type="text"
            />
          </FormRowItem>
        </FormRow>

        <FormRow>
          <FormRowItem>
            <label>
              Email Address <strong>*</strong>
            </label>
            <input
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              required
              type="text"
            />
          </FormRowItem>
          <FormRowItem>
            <label>
              Secure Account with Password <strong>*</strong>
            </label>
            <input
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              required
              type="password"
            />
          </FormRowItem>
        </FormRow>

        <FormRow>
          <FormRowItem>
            <label>
              Phone No <strong>*</strong>
            </label>
            <input
              value={mobileNoValue}
              onChange={(e) => setMobileNoValue(e.target.value)}
              type="text"
            />
          </FormRowItem>
          <FormRowItem>
            <label>City</label>
            <input
              value={cityValue}
              onChange={(e) => setCityValue(e.target.value)}
              type="text"
            />
          </FormRowItem>
        </FormRow>

        <FormRow>
          <FormRowItem>
            <label>
              Present Address <strong>*</strong>
            </label>
            <input
              value={presentAddressValue}
              onChange={(e) => setPresentAddressValue(e.target.value)}
              required
              type="radiobox"
            />
          </FormRowItem>
          <FormRowItem>
            <label>
              Postal Code <strong>*</strong>
            </label>
            <input
              value={postalCodeValue}
              onChange={(e) => setPostalCodeValue(e.target.value)}
              type="text"
            />
          </FormRowItem>
        </FormRow>
        <input type="submit" value="Create Account" />
      </form>
    </Container>
  );
};

function FormRow({ children }) {
  return (
    <Grid container spacing={1}>
      {children}
    </Grid>
  );
}

function FormRowItem({ children }) {
  return (
    <Grid item container direction="column" xs={12} md={6}>
      {children}
    </Grid>
  );
}

export default Registeration;

{
  /* <Link className="back__to__home__link" to="/">
Back to Home
</Link> */
}

{
  /* <div className="form__content flexColumn">
          <div className="form__inputsRow flexRow">
            <div className="form__input">
              
            </div>
            <div className="form__input">
              
            </div>
          </div>

          <div className="form__inputsRow flexRow">
            <div className="form__input">
              
            </div>
          </div>

          <div className="form__inputsRow flexRow">
            <div className="form__input">
              
            </div>
          </div>

          <div className="form__inputsRow flexRow">
            <div className="form__input">
              
            </div>
          </div>

          <div className="form__inputsSpecRow flexRow">
            <div className="form__input">
              <label>What is your aim to join us?</label>
              <textarea
                value={purposeToJoinValue}
                onChange={(e) => setPurposeToJoinValue(e.target.value)}
                cols="10"
                rows="5"
              />
            </div>
            <FormControl required className="form__dropdown">
              <Select
                onChange={onBloodGroupSelect}
                variant="outlined"
                value={bloodGroup}
              >
                <MenuItem value="not__select"> Your Blood Group </MenuItem>
                <MenuItem value="O__Neg"> O - </MenuItem>
                <MenuItem value="O__Pos"> O + </MenuItem>
                <MenuItem value="A__Neg"> A - </MenuItem>
                <MenuItem value="A__Pos"> A + </MenuItem>
                <MenuItem value="B__Neg"> B - </MenuItem>
                <MenuItem value="B__Pos"> B + </MenuItem>
                <MenuItem value="AB__Neg"> AB - </MenuItem>
                <MenuItem value="AB__Pos"> AB + </MenuItem>
              </Select>
            </FormControl>
          </div>
          <input
            disabled={disableSubmitBtn()}
            className="submit__btn"
            type="submit"
          />
        </div> */
}

{
  /* <div className="form__status">
            <h3>Registring as</h3>
            <FormControl required className="formStatus__dropdown">
              <Select
                onChange={onUserRoleSelect}
                variant="outlined"
                value={finalizedUserRole}
                className="formStatus__dropdownSelect"
              >
                <MenuItem className="menu__item" value={userRole}>
                  {userRole}
                </MenuItem>
                <MenuItem
                  className="menu__item"
                  value={
                    userRole === "CONTRIBUTOR" ? "CONSUMER" : "CONTRIBUTOR"
                  }
                >
                  {userRole === "CONTRIBUTOR" ? "CONSUMER" : "CONTRIBUTOR"}
                </MenuItem>
              </Select>
            </FormControl>
          </div> */
}
