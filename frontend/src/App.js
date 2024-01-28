import "./Styles/Styles.css";

import React, { useState, useEffect } from "react";
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

import Home from "./components/Home";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassEmail from "./ForgotPassEmail";
import ForgotPassUpdate from "./ForgotPassUpdate";
import HotelReg from "./HotelReg";
import Success from "./Success";
//import ExampleProfileUp from "./ExampleProfileUp";

import Dashboard from "./components/Dashboard";

function App() {
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");

  const [logged_in_email, setlogged_in_email] = useState(
    sessionStorage.getItem("loggedIn") || ""
  );
  const [logged_in_firebase, setlogged_in_firebase] = useState(
    sessionStorage.getItem("loggedInFirebase") || false
  );

  const [logged_in_name, setlogged_in_name] = useState(
    sessionStorage.getItem("loggedInName") || ""
  );

  const [logged_in_photo, setlogged_in_photo] = useState(
    sessionStorage.getItem("loggedInPhoto") || ""
  );

  const [logged_in_auth_type, setlogged_in_auth_type] = useState(
    sessionStorage.getItem("loggedInAuthType") || ""
  );

  const [logged_in_token, setlogged_in_token] = useState(
    sessionStorage.getItem("loggedInToken") || ""
  );

  const [logges_in_phone, setlogged_in_phone] = useState(
    sessionStorage.getItem("loggedInPhone") || ""
  );

  const [isAdmin, setIsAdmin] = useState(
    sessionStorage.getItem("isAdmin") || "no"
  );

  useEffect(() => {
    sessionStorage.setItem("loggedInPhone", logges_in_phone);
  }, [logges_in_phone]);

  useEffect(() => {
    sessionStorage.setItem("loggedInName", logged_in_name);
  }, [logged_in_name]);

  useEffect(() => {
    sessionStorage.setItem("loggedInPhoto", logged_in_photo);
  }, [logged_in_photo]);

  useEffect(() => {
    sessionStorage.setItem("loggedInAuthType", logged_in_auth_type);
  }, [logged_in_auth_type]);

  useEffect(() => {
    sessionStorage.setItem("loggedInToken", logged_in_token);
  }, [logged_in_token]);

  useEffect(() => {
    sessionStorage.setItem("loggedIn", logged_in_email);
  }, [logged_in_email]);

  useEffect(() => {
    sessionStorage.setItem("loggedInFirebase", logged_in_firebase);
  }, [logged_in_firebase]);

  useEffect(() => {
    sessionStorage.setItem("isAdmin", isAdmin);
  }, [isAdmin]);

  firebase.initializeApp({
    apiKey: "AIzaSyCt0PHGmSISchE63fvSWEFosGNHmOo5hz8",
    authDomain: "bookeasy-firebase-auth.firebaseapp.com",
    projectId: "bookeasy-firebase-auth",
    storageBucket: "bookeasy-firebase-auth.appspot.com",
    messagingSenderId: "540829392687",
    appId: "1:540829392687:web:322238f62133f4035acbda",
    measurementId: "G-QYBQCFT1TT",
  });

  const homePageData = {
    logged_in_email_val: logged_in_email,
    setlogged_in_email_func: setlogged_in_email,
    logged_in_firebase_val: logged_in_firebase,
    setlogged_in_firebase_func: setlogged_in_firebase,
    logged_in_name_val: logged_in_name,
    setlogged_in_name_func: setlogged_in_name,
    logged_in_photo_val: logged_in_photo,
    setlogged_in_photo_func: setlogged_in_photo,
    logged_in_auth_type_val: logged_in_auth_type,
    setlogged_in_auth_type_func: setlogged_in_auth_type,
    logged_in_token_val: logged_in_token,
    setlogged_in_token_func: setlogged_in_token,
    logged_in_phone_val: logges_in_phone,
    setlogged_in_phone_func: setlogged_in_phone,
    isAdmin_val: isAdmin,
    setIsAdmin_func: setIsAdmin,
  };

  const loginPageData = {
    email_val: email,
    email_func: setemail,
    password_val: password,
    password_func: setpassword,
    logged_in_email_val: logged_in_email,
    setlogged_in_email_func: setlogged_in_email,
    logged_in_firebase_val: logged_in_firebase,
    setlogged_in_firebase_func: setlogged_in_firebase,
    logged_in_name_val: logged_in_name,
    setlogged_in_name_func: setlogged_in_name,
    logged_in_photo_val: logged_in_photo,
    setlogged_in_photo_func: setlogged_in_photo,
    logged_in_auth_type_val: logged_in_auth_type,
    setlogged_in_auth_type_func: setlogged_in_auth_type,
    logged_in_token_val: logged_in_token,
    setlogged_in_token_func: setlogged_in_token,
    logged_in_phone_val: logges_in_phone,
    setlogged_in_phone_func: setlogged_in_phone,
    isAdmin_val: isAdmin,
    setIsAdmin_func: setIsAdmin,
  };

  const siginupPageData = {
    logged_in_email_val: logged_in_email,
    setlogged_in_email_func: setlogged_in_email,
    logged_in_firebase_val: logged_in_firebase,
    setlogged_in_firebase_func: setlogged_in_firebase,
    logged_in_name_val: logged_in_name,
    setlogged_in_name_func: setlogged_in_name,
    logged_in_photo_val: logged_in_photo,
    setlogged_in_photo_func: setlogged_in_photo,
    logged_in_auth_type_val: logged_in_auth_type,
    setlogged_in_auth_type_func: setlogged_in_auth_type,
    logged_in_token_val: logged_in_token,
    setlogged_in_token_func: setlogged_in_token,
    logged_in_phone_val: logges_in_phone,
    setlogged_in_phone_func: setlogged_in_phone,
    isAdmin_val: isAdmin,
    setIsAdmin_func: setIsAdmin,
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home {...homePageData} />} />
          <Route path="/cancel_url" element={<Home {...homePageData} />} />
          <Route path="/login" element={<Login {...loginPageData} />} />
          <Route path="/signup" element={<Signup {...siginupPageData} />} />
          <Route path="/reset-password-email" element={<ForgotPassEmail />} />
          <Route
            path="/reset-password/:reset_token"
            element={<ForgotPassUpdate />}
          />

          <Route path="/hotelreg" element={<HotelReg {...homePageData} />} />
          <Route path="/confirmation" element={<Success {...homePageData} />} />
          {/*< Route
            path="/profileup"
            element={<ExampleProfileUp {...homePageData} />}
  />*/}

          <Route path="/dashboard" element={<Dashboard {...homePageData} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
