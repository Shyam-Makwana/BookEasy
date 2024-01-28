import "bootstrap/dist/css/bootstrap.css";
import "../Styles/Styles.css";
import { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

function navbar(props) {
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

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setlogged_in_firebase_func(!!user);
        console.log("user", user);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  function handleLogoutClick(event) {
    // Handle logout click here
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
    navigate("/");
  }

  const [activeTab, setActiveTab] = useState(parseInt(props.active));

  return (
    <nav class="navbar fixed-top navbar-light navbar-container nav-bar-container">
      <div class="sub-nav-container nav-padding-left">
        <a
          class={"nav-link nav-item" + (activeTab == 1 ? " nav-active" : "")}
          href="/"
        >
          Home
        </a>
        <a
          class={"nav-link nav-item" + (activeTab == 2 ? " nav-active" : "")}
          href="/hotelreg"
        >
          Hotel Registration
        </a>
        <a
          class={"nav-link nav-item" + (activeTab == 3 ? " nav-active" : "")}
          href="/dashboard"
        >
          Dashboards
        </a>
      </div>
      {logged_in_email_val ? (
        <div class="sub-nav-container">
          <span
            class="nav-link nav-item login-btn nav-logout"
            onClick={handleLogoutClick}
          >
            Logout
          </span>
        </div>
      ) : (
        <div class="sub-nav-container">
          <a class="nav-link nav-item login-btn" href="/login">
            Login
          </a>
          <a class="nav-link nav-item sign-up-btn" href="/signup">
            Register
          </a>
        </div>
      )}
    </nav>
  );
}

export default navbar;
