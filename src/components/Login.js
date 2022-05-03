import React, {useState, useContext} from "react";
import { Navigate, Link } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../firebaseConfig";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody } from 'mdbreact';
import recruitment from "../images/recruitment.jpg";


const Login = () => {

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    }); 
    const [emailError,setEmailError]=useState('');

    const onChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formValue;
        try {
        firebaseConfig.auth().signInWithEmailAndPassword(email, password).catch(error=>{
            switch(error.code){
                case "auth/user-not-found":
                  setEmailError("User not found. Sign Up or Check the details you have entered.");
                  break;
                case "auth/invalid-email":
                  setEmailError("Invalid Email ID. Check the email you have entered");
                  break;
                case "auth/wrong-password":
                  setEmailError("Wrong Password. Check the password you have typed.");
                  break;
                default:
                    console.log(error);
            }
        });
        } 
        catch (error) {
            console.log(error)
            
        }
    };
    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        return <Navigate to="/dashboard" />;
    }
    return (
        <MDBContainer className="mt-4 ">
            <MDBRow>
                <MDBCol md="3"></MDBCol>
                <MDBCol md="6">
                <MDBCard p="4">
                    <img src={recruitment} alt=""/>
                    <MDBCardBody>
                        <form onSubmit={handleSubmit}>
                            <p className="h4 text-center py-4">Login</p>
                            {emailError===''?'':
                                <div className="alert alert-danger" role="alert">
                                    <p className="errorMsg">{emailError}</p>      
                                </div>
                            } 
                            <div className="grey-text">
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
                                Login
                            </button>
                            </div>
                            <div className="text-center py-4 mt-3">
                                <p>New User?{" "} <Link to="/signup">Sign Up</Link> here</p>
                            </div>                 
                        </form>
                    </MDBCardBody>
                </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Login;