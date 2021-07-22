import React, { useState } from "react";
import firebase from "firebase";
import "./EmailVerficationNotif.css";
import { Redirect } from "react-router-dom";
import { useStateValue } from "../Files/ContextProvider";

const EmailVerficationNotif = () => {
  const [emailStatus, setEmailStatus] = useState("Email Sent");
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

  const [{ currentUser }] = useStateValue();

  if (currentUser?.emailVerified) {
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

  const resendEmailVerificationRequest = async () => {
    try {
      await firebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(() => {
          console.log("Sent email VERIFICATION");
        });

      setEmailStatus("Email Sent Again");
    } catch {
      console.log("There was a problem sending email verfication");
    }
  };

  const verifyAccountActivation = () => {
    window.location.reload(false);
  };

  return (
    <div className="emailVerify__notification">
      <div className="emailVerify__notificationContent flexColumn">
        <h3 className="tagline1">{emailStatus}</h3>
        <h3 className="tagline2">
          Please check your inbox for further instructions
        </h3>
        <div className="email__servcies flexRow">
          <a target="_blank" href="https://mail.google.com/">
            Gmail
          </a>
          <a target="_blank" href="https://mail.yahoo.com/">
            YahooMail
          </a>
          <a target="_blank" href="https://protonmail.com/">
            ProtonMail
          </a>
          <a target="_blank" href="https://gmxmail.com/">
            GMXMail
          </a>
        </div>

        <button onClick={verifyAccountActivation} className="verifyBtn">
          Click to Verify
        </button>

        <h3 className="resend__email">
          Didn't recieved an Email!
          <strong onClick={resendEmailVerificationRequest}>Resend</strong>
        </h3>
      </div>
    </div>
  );
};

export default EmailVerficationNotif;
