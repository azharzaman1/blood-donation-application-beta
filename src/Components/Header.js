import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { Button, IconButton } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { headerPrimaryMenu } from "../Files/menus";
import { useEffect } from "react";
import { Menu, MenuOutlined } from "@material-ui/icons";
import { db } from "../Files/firebase";
import { getFromLS } from "../Files/localStorageUtils";

const Header = ({ header, type }) => {
  const [mobileScreen, setMobileScreen] = useState(false);
  const [genericInfo, setGenericInfo] = useState([]);
  console.log(genericInfo.primaryMenuHeader);
  function myFunction(x) {
    if (!x.matches) {
      setMobileScreen(true);
    } else {
      setMobileScreen(false);
    }
    console.log(mobileScreen);
  }

  useEffect(() => {
    myFunction(x);
  }, [x]);

  var x = window.matchMedia("(min-width: 600px)");
  x.addListener(myFunction);

  useEffect(() => {
    // First Checks Generic info is in localstorgae or not, if not then fetches from database
    const docRef = db.collection("ui_content").doc("generic");

    // if (getFromLS("genricInfo")) {
    //   console.log("Generic info already present in Local Stroage");
    //   setGenericInfo(getFromLS("genricInfo"));
    // } else {
    docRef
      .get()
      .then((fetchedDoc) => {
        if (fetchedDoc.exists) {
          setGenericInfo(fetchedDoc.data());
          console.log("Doc Found", fetchedDoc.data());
          localStorage.setItem("genricInfo", JSON.stringify(fetchedDoc.data()));
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Caught Some Unknown Error:", error);
      });
    // }
  }, []);

  return (
    <>
      {!header || header === "primary" ? (
        <Grid
          container
          className="header primary"
          xs="12"
          direction="row"
          justifyContent="center"
        >
          <Grid className="headerLeft" item xs="3" lg="1">
            <Link to="/">
              <img
                className="logo"
                src="https://i.ibb.co/qrT7gbG/toppng-com-related-wallpapers-blood-donation-logo-646x298.png"
                alt="Logo"
              />
            </Link>
          </Grid>
          <Grid
            className="headerCenter"
            item
            container
            xs="6"
            lg
            justifyContent="center"
            alignItems="center"
          >
            {!mobileScreen ? (
              <>
                {genericInfo?.primaryMenuHeader?.map((menuItem) => (
                  <Link
                    className="headerMenu_item link example"
                    to={menuItem.link}
                    key={menuItem.item}
                  >
                    <span class="hover hover-3">{menuItem.item}</span>
                  </Link>
                ))}
              </>
            ) : (
              <IconButton>
                <MenuOutlined color="primary" />
              </IconButton>
            )}
          </Grid>
          <Grid
            className="headerRight"
            item
            container
            xs="3"
            lg="1"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Link className="link link2" to="/authentication/login">
              Login
            </Link>{" "}
            <h3 className="headerRight_seperator">/</h3>{" "}
            <Link className="link link2" to="/authentication/register">
              Register
            </Link>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </>
  );
};

export default Header;

{
  /* <div className="header flexRow center align-center">
          <Link className="contributor__singin" to="user_authentication">
            Already a Contributor
          </Link>

          <div className="headerNav__left flexRow align-center">
            <Link to="how-can-i-contribute">
              <Button variant="outlined">How Can I Contribute?</Button>
            </Link>
            <Link to="user_registration">
              <Button variant="outlined">Register as Contributor</Button>
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
            <Link to="user_registration">
              <Button variant="outlined">Register as Consumer</Button>
            </Link>
            <Link to="how-can-i-consume">
              <Button variant="outlined">How Can I Consume?</Button>
            </Link>
          </div>
          <Link className="consumer__singin" to="user_authentication">
            Already a Consumer
          </Link>
        </div> */
}
