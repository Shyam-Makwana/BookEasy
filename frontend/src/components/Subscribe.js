import "bootstrap/dist/css/bootstrap.css";
import "../Styles/Styles.css";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function Subscribe(props) {
  const [email, setEmail] = useState("");

  function handleChange(event) {
    setEmail(event.target.value);
  }

  let showToast = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://bookeasy-api.onrender.com/api/users/subscribe",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        toast.success("Successfully Subscribed");
        setEmail("");
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div class="subscribe-container">
      <div class="subscribe-container-1">
        <div class="sub-header">Subscribe</div>
        <div class="sub-header">Newsletter</div>

        <div class="text margin-top-60">The Travel</div>
        <div class="text margin-bottom-10">
          Get Inspired! Recieve Travel discounts, tips and other stories
        </div>
        <div class="flexbox no-wrap">
          <input
            type="email"
            class="form-control margin-right-10"
            id="exampleFormControlInput1"
            placeholder="Your Email Address"
            value={email}
            onChange={handleChange}
          />
          <button type="button" class="btn btn-dark" onClick={showToast}>
            Subscribe
          </button>
          <Toaster />
        </div>
      </div>
      <img
        src="https://i.ibb.co/RptQtXN/subscribe.png"
        alt="subscribe"
        border="0"
      />
    </div>
  );
}

export default Subscribe;
