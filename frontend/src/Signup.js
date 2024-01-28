import React, { useState, useEffect } from "react";

import "./Styles/Styles.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import HomeButton from "./components/HomeButton";

import TextRedirect from "./components/TextRedirect";
import InputFrame from "./components/InputFrame";
import InputFramePass from "./components/InputFramePass";
import Button from "./components/Button";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

function Signup(props) {
  const navigate = useNavigate();

  const {
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

  const [mobile_num_val, setmobile_num] = useState("");
  const [email_val, setemail] = useState("");
  const [first_name_val, setfirst_name] = useState("");
  const [last_name_val, setlast_name] = useState("");
  const [password_val, setpassword] = useState("");

  const [admin_val, setadmin] = useState("no");

  const [input_error, setinput_error] = useState("");

  function isAllDigits(str) {
    // Use a regular expression to check if the string contains only digits
    return /^\d+$/.test(str);
  }

  function isTenDigits(str) {
    // check if the string contains 10 digits
    return str.length === 10;
  }

  // called after 3rd party api call is made

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
        setlogged_in_phone_func("Guest Phone Number");
      } else {
        setlogged_in_phone_func(firebase.auth().currentUser.phoneNumber);
      }
    } catch (e) {
      setlogged_in_phone_func("Guest Phone Number");
      console.log("Error");
    }

    setlogged_in_auth_type_func(final_auth_type);

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

  function handleFailure_3(error) {
    console.error("Error:", error);
  }

  // called after signup pressed

  function handleResponse(response) {
    if (response.ok) {
      return response.json().then((data) => handleSuccess(data));
    } else {
      return response.json().then((error) => handleFailure(error));
    }
  }

  function handleSuccess(data) {
    // Called when the API request is successful
    console.log("Success:", data);

    navigate("/login");
  }

  function handleFailure(error) {
    // Called when the API request fails
    console.error("Error:", error);
  }

  function handleClick_Submit() {
    if (!email_val) {
      setinput_error("Email is required");
      console.log(input_error);
    } else if (!/\S+@\S+\.\S+/.test(email_val)) {
      setinput_error("Invalid email format");
      console.log(input_error);
    } else if (!password_val) {
      setinput_error("Please enter a password");
      console.log(input_error);
    } else if (!first_name_val) {
      setinput_error("Please enter a first_name");
      console.log(input_error);
    } else if (!last_name_val) {
      setinput_error("Please enter a last_name");
      console.log(input_error);
    } else if (!mobile_num_val) {
      setinput_error("Please enter a phone number");
      console.log(input_error);
    } else if (!(isAllDigits(mobile_num_val) && isTenDigits(mobile_num_val))) {
      setinput_error("Mobile number must be in format ##########");
      console.log(input_error);
    } else {
      setinput_error("");

      setmobile_num("");
      setemail("");
      setfirst_name("");
      setlast_name("");
      setpassword("");

      fetch("https://bookeasy-api.onrender.com/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email_val,
          phone_number: mobile_num_val,
          first_name: first_name_val,
          last_name: last_name_val,
          password: password_val,
          admin: admin_val,
          auth_type: "email",
        }),
      })
        .then((response) => handleResponse(response))
        .catch((error) => console.error(error));
    }
  }

  return (
    <div>
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
        <div className="already_have">
          <span className="already_have_text opensans-normal-biscay-24px">
            {"Already have an account? "}
          </span>

          <span>
            <TextRedirect
              text="Login"
              location="/login"
              classname="nunito-bold-biscay-24px"
            />
          </span>
        </div>

        <div>
          <div className="text_header_r">
            <div>
              <span className="nunito-semi-bold-biscay-28px">
                Mobile Number
              </span>
            </div>

            <InputFrame
              placeholder="##########"
              parent_function={setmobile_num}
            />
          </div>

          <div className="text_header_r">
            <div>
              <span className="nunito-semi-bold-biscay-28px">Email</span>
            </div>
            <InputFrame
              placeholder="test@gmail.com"
              parent_function={setemail}
            />
          </div>

          <div className="text_header_r">
            <div>
              <span className="nunito-semi-bold-biscay-28px">First Name</span>
            </div>
            <InputFrame placeholder="Bob" parent_function={setfirst_name} />
          </div>

          <div className="text_header_r">
            <div>
              <span className="nunito-semi-bold-biscay-28px">Last Name</span>
            </div>
            <InputFrame placeholder="Smith" parent_function={setlast_name} />
          </div>

          <div className="text_header_r">
            <div>
              <span className="nunito-semi-bold-biscay-28px">Password</span>
            </div>

            <InputFramePass
              placeholder="Enter your password"
              parent_function={setpassword}
            />
          </div>

          <div className="text_header_r">
            <div>
              <span className="nunito-semi-bold-biscay-28px">Hotel Owner</span>
            </div>

            <div>
              <input
                className="admin_checkbox"
                type="checkbox"
                checked={admin_val === "yes"}
                onChange={(e) => setadmin(e.target.checked ? "yes" : "no")}
              />
              <label className="admin_label opensans-normal-biscay-24px">
                {admin_val}
              </label>
            </div>
          </div>
        </div>

        <div className="button_header">
          <div>
            <Button clickHandler={handleClick_Submit} text="Sign Up" />
          </div>
        </div>

        {logged_in_email_val ? (
          <div></div>
        ) : (
          <div>
            <div className="line_r">
              <img
                src="https://i.ibb.co/N9ZTNQ8/line.png"
                width="448"
                height="30"
                alt=""
              />{" "}
            </div>
            <div className="firebase_auth_r">
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;
