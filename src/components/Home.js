import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../firebaseConfig";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="p-5">
      <div className="row">
        <div className="col-4 m-2">
          <h1>Carehome Application Management</h1>
        </div>
        <div className="col-4 m-2"></div>
        <div className="col-2">
        {currentUser ? (
          <div>
            <button className="btn btn-danger" onClick={() => firebaseConfig.auth().signOut()}>Sign out</button>
          </div>
        ) :''
        }
        </div>
      </div>
      
      {currentUser ? (
        <div>
          <p>
            You are logged in - <Link to="/dashboard">View Dashboard</Link> {" "} to answer survey questions.
          </p>
        </div>
      ) : (
        <div>
          <p>You are not logged in.
            <Link to="/login"> Log In</Link> or <Link to="/signup">Sign Up</Link> 
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;