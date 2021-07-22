import React, { useState } from "react";
import { useStateValue } from "../Files/ContextProvider";
import { db } from "../Files/firebase";

const Profile = ({ setUserID }) => {
  const [{ user }, dispatch] = useStateValue();
  //   const [userID, setUserID] = useState("");
  console.log(user);

  return (
    <div className="profile">
      <h3>Yoour Profile</h3>
      {/* <h3>userID: {userID}</h3> */}
      {user?.user.email}
    </div>
  );
};

export default Profile;
