import ".././Styles/Styles.css";

import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import UploadWidget from "./UploadWidget";

import toast, { Toaster } from "react-hot-toast";

function Profileupdate(props) {
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

  const [input_error, setinput_error] = useState("");
  const [url_1, updateUrl_1] = useState(logged_in_photo_val);
  const [formData, setFormData] = useState({
    first_name: logged_in_name_val.split(" ")[0],
    last_name: logged_in_name_val.split(" ")[1],
    email: logged_in_email_val,
    phone: logged_in_phone_val,
  });

  const handleUpdate = async (event) => {
    //will put the data to the database
    event.preventDefault();

    // Check if any field is empty
    const isFieldEmpty = Object.values(formData).some((value) => value === "");

    //check if any url is empty
    const isUrlEmpty = url_1 === "";

    if (isFieldEmpty || isUrlEmpty) {
      setinput_error("Please fill in all fields.");
      console.log("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://bookeasy-api.onrender.com/api/users/update-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + logged_in_token_val,
          },
          body: JSON.stringify({
            email: formData.email,
            first_name: formData.first_name,
            last_name: formData.last_name,
            phone_number: formData.phone,
            photo_url: url_1,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        toast.success("Profile updated successfully!");
        console.log("Update API call successful:", data);
        // Handle success
        //should update the state

        setlogged_in_name_func(formData.first_name + " " + formData.last_name);
        setlogged_in_email_func(formData.email);
        setlogged_in_phone_func(formData.phone);
        setlogged_in_photo_func(url_1);
      } else {
        toast.error("Profile update failed!");
        console.log("Update API call unsuccessful:", data);
        // Handle failure
      }
    } catch (error) {
      toast.error("Profile update failed!");
      console.error("Update API call error:", error);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  function handleOnUpload_pic(error, result, widget) {
    console.log("handleOnUpload_pic");
    console.log(error);

    console.log(result.info.secure_url);
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    updateUrl_1(result?.info?.secure_url);
  }

  return (
    <div>
      <Toaster />
      <div className="profile_up_container">
        <form onSubmit={handleUpdate} className="profile_up_form">
          <span className="poppins-extra-bold-green-36px">Profile Update</span>
          <label htmlFor="first_name" className="hotel_reg_label">
            First Name:
          </label>
          <input
            className="profile_up_input_text"
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />

          <label htmlFor="last_name" className="profile_up_label">
            Last Name:
          </label>
          <input
            className="profile_up_input_text"
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />

          <label htmlFor="email" className="profile_up_label">
            Email:
          </label>
          <input
            className="profile_up_input_text"
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="phone" className="profile_up_label">
            Phone:
          </label>
          <input
            className="profile_up_input_text"
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <UploadWidget onUpload={handleOnUpload_pic}>
            {({ open }) => {
              function handleOnClick(e) {
                e.preventDefault();
                open();
              }
              return (
                <button className="profile_up_button" onClick={handleOnClick}>
                  Upload Profile Image
                </button>
              );
            }}
          </UploadWidget>

          <button type="submit" className="profile_up_button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profileupdate;
