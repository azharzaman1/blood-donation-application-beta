import React, { useEffect } from "react";
import HomePage from "./Pages/HomePage";
import Registeration from "./Pages/Registeration";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import "./App.css";
import { auth } from "./Files/firebase";

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
        <Switch>
          <Route path="/user_authentication">
            <SignIn />
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

{
  /* <Route path="/dashboard-consumer">
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
          </Route> */
}
{
  /* <Route path="/email_verification">
            <EmailVerficationNotif />
          </Route> */
}

// useEffect(() => {
//   auth.onAuthStateChanged((authUser) => {
//     if (authUser) {
//       dispatch({
//         type: "SET_USER",
//         user: authUser,
//       });
//     } else {
//       dispatch({
//         type: "SET_USER",
//         user: null,
//       });
//     }
//   });
// }, []);
