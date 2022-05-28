import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../firebaseConfig";


const Privacy = () => {
    const { currentUser } = useContext(AuthContext);
    const [name,setName] = useState('');
    const [privacy, setPrivacy] = useState(false);

    const [checked, setChecked] = React.useState(false);

    let navigate=useNavigate();

    const handleChange = () => {
        setChecked(!checked);
    };
    if (!currentUser) {
        return <Navigate to="/" />;
    }

    var db = firebaseConfig.firestore();
    db.collection("users").doc(currentUser.uid).get().then((doc) => {
        if (doc.exists) {
            setName(doc.data().name);
            setPrivacy(doc.data().privacy);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });


    const accept=()=>{
        db.collection("users").doc(currentUser.uid).update({privacy:true});
        navigate('/dashboard');
    }

    if(privacy){
        return <Navigate to="/dashboard" />;
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
            <h1>Welcome, {name}</h1>
            <button className="btn btn-danger" onClick={() => firebaseConfig.auth().signOut()}>Sign out</button>
            </div>
            <p>Privacy Policy: <a>Link</a></p>
            <label>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                />
                I have gone through the privacy policy and understand how sensitive data is handled by Brackenberry.
            </label>

            <button className="btn btn-success" onClick={accept} disabled={!checked}>Continue</button>

        </div>
    );
};

export default Privacy;