import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import "./Styles/Styles.css";

import HomeButton from "./components/HomeButton";
import InputFrame from "./components/InputFrame";
import Button from "./components/Button";

function ForgotPassEmail() {
  const [email_val, setemail_val] = useState("");
  const [emailError, setEmailError] = useState("");

  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {};

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

    // setIsAuthenticated(true);
    // setloggedinuser(data.email);

    // setShowTextSuccess(true);
    // setTextSucess(`Logged in as ${data.email}!`);

    // Call any other functions or update state as needed
    // setlogged_in_email_func(email_val);
    // navigate("/");
  }

  function handleFailure(error) {
    // Called when the API request fails
    console.error("Error:", error);

    // setShowTextSuccess(true);
    // setTextSucess("Login Failed");
    // Call any other functions or update state as needed
  }

  function handleClick_Reset() {
    if (!email_val) {
      setEmailError("Email is required");
      console.log(emailError);
    } else if (!/\S+@\S+\.\S+/.test(email_val)) {
      setEmailError("Invalid email format");
      console.log(emailError);
    } else {
      setEmailError("");

      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);

      fetch("https://bookeasy-api.onrender.com/api/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email_val,
        }),
      })
        .then((response) => handleResponse(response))
        .catch((error) => console.error(error));
    }
  }

  const prompt_1 = "Enter the email address associated with your account,";
  const prompt_2 = "and we'll email you a link to reset your password.";
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

      <div className="explorer_pic">
        <img
          src={require("./resources/explorer.png")}
          width="960"
          height="848"
          alt=""
        />
      </div>

      <div className="left_spacing">
        <p>
          <span className="nunito-bold-biscay-24px">
            {prompt_1} <br /> {prompt_2}
          </span>
        </p>

        <div className="text_header">
          <div>
            <span className="nunito-semi-bold-biscay-28px">Email</span>
          </div>
          <InputFrame
            placeholder="test@gmail.com"
            parent_function={setemail_val}
          />
        </div>

        <div>
          <div className="button_login">
            <Button clickHandler={handleClick_Reset} text="Send reset link" />
          </div>
        </div>
        {showMessage && (
          <p>
            <span className="nunito-bold-biscay-24px">
              Email has been sent!
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default ForgotPassEmail;
