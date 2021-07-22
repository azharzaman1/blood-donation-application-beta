import React, { useEffect } from "react";
import "./App.css";
import HomePage from "./Pages/HomePage";
import Registeration from "./Pages/Registeration";
import ContributorProfilePage from "./Pages/ContributorDashboard";
import ConsumerProfilePage from "./Pages/ConsumerDashboard";
import ConsumerRegisterPhase2 from "./Pages/ConsumerRegisterPhase2";
import ContributorRegisterPhase2 from "./Pages/ContributorRegisterPhase2";
import RetrievePassword from "./Pages/RetrievePassword";
import SignIn from "./Pages/SignIn";
import { useStateValue } from "./Files/ContextProvider";
import { auth } from "./Files/firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import EmailNotification from "./Pages/EmailNotification";
import EmailVerficationNotif from "./Pages/EmailVerficationNotif";

const App = () => {
  const [{ userState, currentUser }, dispatch] = useStateValue();
  let history = useHistory();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
        // localStorage.setItem("userID", authUser?.uid);
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  console.log(currentUser);

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/dashboard-consumer">
            <ConsumerProfilePage />
          </Route>
          <Route path="/dashboard-contributor">
            <ContributorProfilePage />
          </Route>
          <Route path="/consumer_register-phase2">
            <ConsumerRegisterPhase2 />
          </Route>
          <Route path="/contributor_register-phase2">
            <ContributorRegisterPhase2 />
          </Route>
          <Route path="/email-notification">
            <EmailNotification />
          </Route>
          <Route path="/retrieve-password">
            <RetrievePassword />
          </Route>
          <Route path="/user_authentication">
            <SignIn />
          </Route>
          <Route path="/email_verification">
            <EmailVerficationNotif />
          </Route>
          <Route path="/user_registration">
            <Registeration />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
