import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../Files/ContextProvider";
import { auth, db } from "../Files/firebase";

const ConsumerProfilePage = () => {
  const [{ userState, currentUser }, dispatch] = useStateValue();

  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [userID, setUserID] = useState(localStorage.getItem("userID"));

  const history = useHistory();

  useEffect(() => {
    const fetchUserFromDB = () => {
      const collectionName = () => {
        if (userRole === "CONTRIBUTOR") {
          return "contributorsList";
        } else if (userRole === "CONSUMER") {
          return "consumersList";
        } else {
          return "someErrorFoundDuringFindingCollectionNameWhileSigningIn";
        }
      };

      const docRef = db.collection(collectionName()).doc(userID);

      docRef
        .get()
        .then((fetchedDoc) => {
          if (fetchedDoc.exists) {
            dispatch({
              type: "SET_FETCHED_USER_DETAILS",
              fetchedUser: fetchedDoc.data(),
            });
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Caught Some Unknown Error:", error);
        });
    };

    fetchUserFromDB();
  }, []);
  return (
    <div className="profilePage profilePage__contributor">
      <h3>
        Hi {localStorage.getItem("displayName")} ! Consumer Welcome to your
        Dashboard
      </h3>
      <button
        onClick={() => {
          auth.signOut();
          history.push("/");
          localStorage.clear();
        }}
      >
        Sign out
      </button>
    </div>
  );
};

export default ConsumerProfilePage;
