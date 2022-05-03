import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../firebaseConfig";


const MainDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [admin, setAdmin] = useState(false);
  const [name,setName] = useState('');

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  var db = firebaseConfig.firestore();
  db.collection("users").doc(currentUser.uid).get().then((doc) => {
      if (doc.exists) {
          setAdmin(doc.data().isAdmin);
          setName(doc.data().name);
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch((error) => {
        console.log("Error getting document:", error);
  });
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Welcome, {name}</h1>
        <button className="btn btn-danger" onClick={() => firebaseConfig.auth().signOut()}>Sign out</button>
      </div>
      {admin?<p>Hello Admin</p>:<p>Hello User</p>}
    </div>
  );
};

export default MainDashboard;