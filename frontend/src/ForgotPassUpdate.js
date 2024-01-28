import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import { useLocation } from "react-router-dom";

import "./Styles/Styles.css";

import HomeButton from "./components/HomeButton";
import Button from "./components/Button";
import InputFramePass from "./components/InputFramePass";

function ForgotPassUpdate() {
  const navigate = useNavigate();

  const [password_val, setpassword] = useState("");
  const [password_2_val, setpassword_2] = useState("");
  const [formerror, setError] = useState("");

  const location = useLocation();
  const url = location.pathname;
  const regex = /reset-password\/(\w+)/;
  const match = url.match(regex);

  const resetToken = match[1];

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
    navigate("/login");
  }

  function handleFailure(error) {
    // Called when the API request fails
    console.error("Error:", error);

    // setShowTextSuccess(true);
    // setTextSucess("Login Failed");
    // Call any other functions or update state as needed
  }

  function handleClick_Update() {
    if (!password_val || !password_2_val) {
      setError("Please enter both passwords.");
      console.log(formerror);
    } else if (password_val !== password_2_val) {
      setError("Passwords do not match.");
      console.log(formerror);
    } else {
      console.log("Reset token: " + resetToken);

      fetch("https://bookeasy-api.onrender.com/api/users/new-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password_val,
          token: resetToken,
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

      <div className="explorer_pic_passup">
        <img
          src={require("./resources/explorer.png")}
          width="960"
          height="848"
          alt=""
        />
      </div>
      <div className="left_spacing">
        <div className="title_text_header">
          <span className="nunito-bold-biscay-28px">Update password</span>
        </div>

        <div className="text_header">
          <div>
            <span className="nunito-semi-bold-biscay-28px">Password</span>
          </div>

          <InputFramePass
            placeholder="Enter your password"
            parent_function={setpassword}
          />
        </div>

        <div className="text_header">
          <div>
            <span className="nunito-semi-bold-biscay-28px">
              Re-enter your password
            </span>
          </div>

          <InputFramePass
            placeholder="Re-enter your password"
            parent_function={setpassword_2}
          />
        </div>

        <div>
          <div className="button_login">
            <Button clickHandler={handleClick_Update} text="Update" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassUpdate;
