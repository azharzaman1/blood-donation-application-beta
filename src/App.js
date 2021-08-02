import React, { useEffect } from "react";
import HomePage from "./Pages/HomePage";
import Registeration from "./Pages/Registeration";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import "./App.css";
import { auth } from "./Files/firebase";
import Header from "./Components/Header";

// import ContributorProfilePage from "./Pages/ContributorDashboard";
// import ConsumerProfilePage from "./Pages/ConsumerDashboard";
// import ConsumerRegisterPhase2 from "./Pages/ConsumerRegisterPhase2";
// import ContributorRegisterPhase2 from "./Pages/ContributorRegisterPhase2";
// import RetrievePassword from "./Pages/RetrievePassword";
// import EmailNotification from "./Pages/EmailNotification";
// import EmailVerficationNotif from "./Pages/EmailVerficationNotif";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route path="/authentication/login">
            <SignIn />
          </Route>
          <Route path="/authentication/register">
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
