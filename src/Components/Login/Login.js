import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from 'react-router';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

const Login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignInClick = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = { UserName: displayName, email: email }
                setLoggedInUser(signedInUser);
                history.replace(from);
                // console.log(signedInUser)
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = error.credential;
                console.log(errorCode, errorMessage, email, credential);
            });
    }

    const handleLogOut = () => {
        setLoggedInUser({});
    }

    return (
        <div style={{textAlign: 'center'}}>
           {
                loggedInUser.UserName ?
                <button onClick={handleLogOut} className="btn btn-primary">Logout</button> :
                <button onClick={handleGoogleSignInClick} className="btn btn-primary"><i className="fa fa-google"></i>Login with Google</button>
           }
        </div>
    );
};

export default Login;