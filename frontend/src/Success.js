import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import "./Styles/Styles.css";

import Navbar from "./components/navbar";
//import MyNavbar from "./components/navbar_temp";
import Button from "./components/Button";
import Footer from "./components/Footer";

function Success(props) {
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

  function handleClick_Home() {
    navigate("/");
  }

  return (
    <div>
      <Navbar {...props} />
      <div className="confirm_container">
        <div className="confirm_text">
          <div className="welcome-back-traveler">
            <span className="poppins-extra-bold-green-36px">
              Yay! Completed
            </span>
          </div>
        </div>
        <div className="confirm_pic">
          <img
            src="https://i.ibb.co/HYFKZvF/confirmation-img.png"
            width="300"
            height="300"
            alt=""
          />
        </div>

        <span
          className="nunito-normal-biscay-24px"
          style={{ display: "block" }}
        >
          We will inform you via email later
        </span>
        <span
          className="nunito-normal-biscay-24px"
          style={{ display: "block" }}
        >
          once the transaction has been accepted
        </span>
        <div className="button_confirm_home">
          <Button clickHandler={handleClick_Home} text="Back to Bookeasy" />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Success;
