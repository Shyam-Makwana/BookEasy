import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import "./Styles/Styles.css";

import toast, { Toaster } from "react-hot-toast";

//Component imports
import InputFrame from "./components/InputFrame";
import Button from "./components/Button";

import TextRedirect from "./components/TextRedirect";
import InputFramePass from "./components/InputFramePass";

import HomeButton from "./components/HomeButton";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

function Login(props) {
  /*
    <a href="https://imgbb.com/"><img src="https://i.ibb.co/HYFKZvF/confirmation-img.png" alt="confirmation-img" border="0"></a>
<a href="https://ibb.co/DQKy6yD"><img src="https://i.ibb.co/RcHmMmp/explorer.png" alt="explorer" border="0"></a>
<a href="https://ibb.co/QPrDHz2"><img src="https://i.ibb.co/N9ZTNQ8/line.png" alt="line" border="0"></a><br /><a target='_blank' href='https://imgbb.com/'>how to copy an image from google</a><br />
    */
  const navigate = useNavigate();

  const {
    email_val,
    email_func,
    password_val,
    password_func,
    logged_in_email_val,
    setlogged_in_email_func,
    logged_in_firebase_val,
    setlogged_in_firebase_func,
    logged_in_name_val,
    setlogged_in_name_func,
    logged_in_photo_val,
    setlogged_in_photo_func,
    logged_in_auth_type_val,
    setlogged_in_auth_type_func,
    logged_in_token_val,
    setlogged_in_token_func,
    logged_in_phone_val,
    setlogged_in_phone_func,
    isAdmin_val,
    setIsAdmin_func,
  } = props;

  var final_auth_type = "";

  const uiConfig = {
    signInFlow: "popup", //redirect
    signInSuccessUrl: "/",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult) => {
        // console log the firebase response
        console.log("authResult", authResult);
        console.log("firebase.auth().currentUser", firebase.auth().currentUser);
        console.log(
          "firebase.auth().currentUser.displayName",
          firebase.auth().currentUser.displayName
        );
        console.log(
          "firebase.auth().currentUser.email",
          firebase.auth().currentUser.email
        );
        console.log(
          "firebase.auth().currentUser.photoURL",
          firebase.auth().currentUser.photoURL
        );
        console.log(
          "firebase.auth().currentUser.phoneNumber",
          firebase.auth().currentUser.phoneNumber
        );

        var temp_final_auth_type = "";

        // if provider is phone
        if (
          firebase.auth().currentUser.providerData[0].providerId === "phone"
        ) {
          temp_final_auth_type = "phone";
        } else {
          const originalString =
            firebase.auth().currentUser.providerData[0].providerId;
          temp_final_auth_type = originalString.replace(/\.com/g, "");
        }

        final_auth_type = temp_final_auth_type;
        //log auth type
        console.log("fire base auth type", final_auth_type);

        if (final_auth_type !== "phone") {
          // api call to get token
          fetch("https://bookeasy-api.onrender.com/api/users/firebase-auth", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: firebase.auth().currentUser.email,
              display_name: firebase.auth().currentUser.displayName,
              photo_url: firebase.auth().currentUser.photoURL,
              admin: "no",
              auth_type: final_auth_type,
            }),
          })
            .then((response) => handleResponse_3(response))
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
        } else {
          // api call to get token
          fetch("https://bookeasy-api.onrender.com/api/users/firebase-auth", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone_number: firebase.auth().currentUser.phoneNumber,
              admin: "no",
              auth_type: final_auth_type,
            }),
          })
            .then((response) => handleResponse_3(response))
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
        }

        return false;
      },
    },
  };

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setlogged_in_firebase_func(!!user);
        console.log("user", user);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setpasswordError] = useState("");

  // functions for post call after login pressed

  function handleResponse(response) {
    if (response.ok) {
      return response.json().then((data) => handleSuccess(data));
    } else {
      return response.json().then((error) => handleFailure(error));
    }
  }

  // function call for inital firebase call should also login

  function handleResponse_3(response) {
    if (response.ok) {
      return response.json().then((data) => handleSuccess_3(data));
    } else {
      return response.json().then((error) => handleFailure_3(error));
    }
  }

  function handleSuccess_3(data) {
    console.log("Success:", data);

    //set session variables
    //set token

    setlogged_in_token_func(data.token);

    setIsAdmin_func("no");

    try {
      if (final_auth_type !== "phone") {
        setlogged_in_email_func(firebase.auth().currentUser.email);
      } else {
        setlogged_in_email_func("Guest Email");
      }
    } catch (e) {
      setlogged_in_email_func("Guest Email");
      console.log("Error");
    }

    try {
      if (final_auth_type !== "phone") {
        setlogged_in_name_func(data.first_name + " " + data.last_name);
      } else {
        setlogged_in_name_func("Guest Name");
      }
    } catch (e) {
      setlogged_in_name_func("Guest Name");
      console.log("Error");
    }

    try {
      if (final_auth_type !== "phone") {
        setlogged_in_photo_func(firebase.auth().currentUser.photoURL);
      } else {
        setlogged_in_photo_func(
          "https://www.w3schools.com/howto/img_avatar.png"
        );
      }
    } catch (e) {
      setlogged_in_photo_func("https://www.w3schools.com/howto/img_avatar.png");
      console.log("Error");
    }

    try {
      if (final_auth_type !== "phone") {
        setlogged_in_phone_func("");
      } else {
        setlogged_in_phone_func(firebase.auth().currentUser.phoneNumber);
      }
    } catch (e) {
      setlogged_in_phone_func("");
      console.log("Error");
    }

    setlogged_in_auth_type_func(final_auth_type);

    // do get request with token to get user data

    fetch("https://bookeasy-api.onrender.com/api//api/users/get-profile", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + data.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // set user data
        setlogged_in_email_func(data.user.email);
        setlogged_in_name_func(
          data.user.first_name + " " + data.user.last_name
        );
        setlogged_in_photo_func(data.user.photo_url);
        setlogged_in_phone_func(data.user.phone_number);
      })
      .catch((error) => {
        console.error(error);
      });

    navigate("/");
  }

  function handleFailure_3(error) {
    console.error("Error:", error);
    toast.error("Error:", error);
  }

  function handleSuccess(data) {
    console.log("Success:", data);

    setlogged_in_token_func(data.token);

    // set isAdmin to true if admin=== "yes"
    setIsAdmin_func(data.admin);

    try {
      setlogged_in_email_func(email_val);
    } catch (e) {
      setlogged_in_email_func("Guest Email");
      console.log("Error");
    }

    try {
      setlogged_in_name_func(data.first_name + " " + data.last_name);
    } catch (e) {
      setlogged_in_name_func("Guest Name");
      console.log("Error");
    }

    try {
      setlogged_in_photo_func(data.photo_url);
    } catch (e) {
      setlogged_in_photo_func("https://www.w3schools.com/howto/img_avatar.png");
      console.log("Error");
    }

    setlogged_in_phone_func("Guest Phone Number");

    setlogged_in_auth_type_func("email");

    // do get request with token to get user data

    fetch("https://bookeasy-api.onrender.com/api/users/get-profile", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + data.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // set user data
        setlogged_in_email_func(data.user.email);
        setlogged_in_name_func(
          data.user.first_name + " " + data.user.last_name
        );
        setlogged_in_photo_func(data.user.photo_url);
        setlogged_in_phone_func(data.user.phone_number);
      })
      .catch((error) => {
        console.error(error);
      });

    navigate("/");
  }

  function handleFailure(error) {
    console.error("Error:", error);
    toast.error("Error:", error);
  }

  function handleClick_Logout() {
    setlogged_in_email_func("");
    setlogged_in_auth_type_func("");
    setlogged_in_name_func("");
    setlogged_in_photo_func("");
    setlogged_in_phone_func("");
    setlogged_in_token_func("");
    try {
      firebase.auth().signOut();
    } catch (e) {
      console.log("Error");
    }
  }

  function handleClick_Login() {
    if (!email_val) {
      setEmailError("Email is required");
      console.log(emailError);
    } else if (!/\S+@\S+\.\S+/.test(email_val)) {
      setEmailError("Invalid email format");
      console.log(emailError);
    } else if (!password_val) {
      setpasswordError("Please enter a password");
      console.log(passwordError);
    } else {
      setEmailError("");
      setpasswordError("");

      fetch("https://bookeasy-api.onrender.com/api/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email_val,
          password: password_val,
          auth_type: "email",
        }),
      })
        .then((response) => handleResponse(response))
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    }
  }

  return (
    <div>
      <Toaster />
      <div className="top-right-icons">
        <div className="icon home-button1">
          <HomeButton />
        </div>
        <div className="icon contact">
          <span className="nunito-semi-bold-green-20px">Contact us</span>
        </div>
        <div className="icon help">
          <span className="nunito-semi-bold-green-20px">Help</span>
        </div>
      </div>

      <div className="left_spacing">
        <div className="explorer_pic">
          <img
            src="https://i.ibb.co/RcHmMmp/explorer.png"
            width="960"
            height="848"
            alt=""
          />
        </div>
        <div className="welcome-back-traveler">
          <span className="poppins-extra-bold-green-36px">
            WELCOME BACK TRAVELER!
          </span>
        </div>

        <p>
          <span className="nunito-normal-biscay-24px">
            Don’t have a account,
          </span>
          <span className="nunito-normal-biscay-24px">&nbsp;</span>
          <TextRedirect
            text="Sign Up"
            location="/signup"
            classname="nunito-bold-biscay-24px"
          />
        </p>

        <div className="email">
          <span className="nunito-semi-bold-biscay-28px">Email</span>
        </div>

        <InputFrame placeholder="test@gmail.com" parent_function={email_func} />

        <div className="password">
          <span className="nunito-semi-bold-biscay-28px">Password</span>
        </div>

        <InputFramePass
          placeholder="Enter your password"
          parent_function={password_func}
        />
        <div>
          <p className="forgot_password">
            <span>
              <TextRedirect
                text="Forgot password?"
                location="/reset-password-email"
                classname="nunito-semi-bold-biscay-20px"
              />
            </span>
          </p>

          <div>
            {logged_in_email_val ? (
              <div></div>
            ) : (
              <div>
                <div className="button_login">
                  <Button clickHandler={handleClick_Login} text="Login" />
                </div>
                <div className="line">
                  <img
                    src="https://i.ibb.co/N9ZTNQ8/line.png"
                    width="448"
                    height="30"
                    alt=""
                  />{" "}
                </div>
                <div className="firebase_auth">
                  <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
