import React, {useState} from "react";
import { Navigate, Link } from "react-router-dom";
import firebaseConfig from "../firebaseConfig";
import { MDBContainer, 
  MDBRow, 
  MDBCol, 
  MDBInput, 
  MDBCard, 
  MDBCardBody, 
} from 'mdbreact';

import recruitment from "../images/recruitment.jpg";

const Signup = () => {
  const [currentUser, setCurrentUser] = useState(false);   
  const [emailError,setEmailError]=useState('');
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  }); 

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();    
    const { email, password, name } = formValue;
   
    try {
        firebaseConfig.auth().createUserWithEmailAndPassword(email, password).then((e)=>{
            var uid=e.user.uid;
            var db = firebaseConfig.firestore();
            db.collection("users").doc(uid).set(
            {
                isAdmin: false,
                name: name,
                email: email
            }
            )
            .catch((error) => {
            console.error("Error adding document: ", error);
            });

            setCurrentUser(true);

        }).catch( (err) =>{
            console.log(err)

            switch(err.code){
            case "auth/email-already-in-use":
                setEmailError("Email already in use. Login instead");
                throw err;
            case "auth/invalid-email":
                setEmailError("Invalid Email ID. Check the email you have entered");
                throw err;
            case "auth/weak-password":
                setEmailError("Weak Password. Choose a strong one.");
                throw err;
            default:
                setCurrentUser(false);
                throw err;
            }
        });
    } 
    
    catch (error) {
      console.log(error)
      alert(error);
    }
  };
  
  if (currentUser) {
      return <Navigate to="/dashboard" />;
  }
  return (
    <MDBContainer className="mt-4 ">
      <MDBRow>
        <MDBCol md="3"></MDBCol>
        <MDBCol md="6">
          <MDBCard>
          <img src={recruitment} alt="Shangri-La"/>
            <MDBCardBody>
                <form onSubmit={handleSubmit}>
                    <p className="h4 text-center py-4">Signup</p>
                    {emailError===''?'':
                      <div className="alert alert-danger" role="alert">
                        <p className="errorMsg">{emailError}</p>      
                      </div>
                    } 
                    <div className="grey-text">
                    <MDBInput
                        label="Full Name"
                        icon="user"
                        group
                        type="text"
                        name='name'
                        onChange={onChange}
                        validate
                        error="wrong"
                        success="right"
                    />
                    <MDBInput
                        label="Email"
                        icon="envelope"
                        group
                        type="email"
                        name='email'
                        onChange={onChange}
                        validate
                        error="wrong"
                        success="right"
                    />
                    <MDBInput
                        label="Password"
                        icon="lock"
                        group
                        type="password"
                        name='password'
                        onChange={onChange}
                        validate
                    />
                    </div>
                    <div className="text-center py-4 mt-3">
                      <button className="btn btn-primary">
                          Register
                      </button>
                    </div>
                    <div className="text-center py-4 mt-3">
                      <p>Already a User?{" "} <Link to="/login">Log In</Link> here</p>
                    </div>  
                </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Signup;