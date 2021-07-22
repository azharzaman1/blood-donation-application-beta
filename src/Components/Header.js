import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useStateValue } from "../Files/ContextProvider";

const Header = () => {
  const [{ userState }, dispatch] = useStateValue();

  const registerAsContributorHandler = () => {
    localStorage.setItem("userRole", "CONTRIBUTOR");
  };

  const signInAsContributorHandler = () => {
    localStorage.setItem("userRole", "CONTRIBUTOR");
  };

  const registerAsConsumerHandler = () => {
    localStorage.setItem("userRole", "CONSUMER");

  };

  const signInAsConsumerHandler = () => {
    localStorage.setItem("userRole", "CONSUMER");
  };

  return (
    <div className="header flexRow center align-center">
      <Link
        onClick={signInAsContributorHandler}
        className="contributor__singin"
        to="user_authentication"
      >
        Already a Contributor
      </Link>

      <div className="headerNav__left flexRow align-center">
        <Link to="how-can-i-contribute">
          <Button variant="outlined">How Can I Contribute?</Button>
        </Link>
        <Link to="user_registration">
          <Button onClick={registerAsContributorHandler} variant="outlined">
            Register as Contributor
          </Button>
        </Link>
      </div>

      <Link to="/" classname="header__logoSection">
        <img
          className="header__logo"
          src="https://i.ibb.co/HHy5LzH/Logo.png"
          alt="Donate Blood"
        />
      </Link>

      <div className="headerNav__right flexRow align-center">
        <Link onClick={registerAsConsumerHandler} to="user_registration">
          <Button variant="outlined">Register as Consumer</Button>
        </Link>
        <Link to="how-can-i-consume">
          <Button variant="outlined">How Can I Consume?</Button>
        </Link>
      </div>
      <Link
        onClick={signInAsConsumerHandler}
        className="consumer__singin"
        to="user_authentication"
      >
        Already a Consumer
      </Link>
    </div>
  );
};

export default Header;
