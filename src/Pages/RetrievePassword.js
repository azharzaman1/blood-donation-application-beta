import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../Files/firebase";
import "./RetrivePassword.css";

const RetrievePassword = () => {
  const [emailValue, setEmailValue] = useState(
    localStorage.getItem("passwordResetDefaultEmail")
  );
  const [error, setError] = useState("");

  let [loading, setLoading] = useState(false);

  let history = useHistory();

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    localStorage.setItem("passwordResetDefaultEmail", emailValue);
    setLoading(true);
    try {
      await auth.sendPasswordResetEmail(emailValue).then(() => {
        console.log("Password reset email sent successfully!");
      });
      history.push("email-notification");
    } catch {
      setLoading(false);
      alert(
        "Failed to process your request at the moment, please try sometime else"
      );
    }
  };

  return (
    <div className="forgotPassword__page">
      <form
        onSubmit={forgotPasswordHandler}
        className="forgotPassword__contentContainer flexColumn"
      >
        <h3>Password Reset</h3>
        <div className="passwordReset__formInput">
          <label>Your Email Address to Proceed</label>
          <input
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            required
            type="text"
          />
        </div>
        <input
          disabled={loading}
          className="passwordReset__requestSubmit"
          type="submit"
          value="Send Request"
        />
      </form>
      <Link className="return__to__login__page" to="user_authentication">
        Return to login
      </Link>
    </div>
  );
};

export default RetrievePassword;
