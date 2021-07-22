import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../Files/firebase";
import "./EmailNotification.css";

const EmailNotification = () => {
  const [emailStatus, setEmailStatus] = useState("Email Sent");

  const resendPasswordResetRequest = async () => {
    try {
      await auth.sendPasswordResetEmail(
        localStorage.getItem("passwordResetDefaultEmail")
      );
      setEmailStatus("Email Sent Again");
    } catch {
      console.log("There was an error");
    }
  };

  return (
    <div className="email__notification">
      <div className="emailNotification__content flexColumn">
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

        <h3 className="resend__email">
          Didn't recieved an Email!
          <strong onClick={resendPasswordResetRequest} href="">
            Resend
          </strong>
        </h3>
      </div>
      <Link className="return__to__login__page" to="user_authentication">
        Return to login
      </Link>
    </div>
  );
};

export default EmailNotification;
