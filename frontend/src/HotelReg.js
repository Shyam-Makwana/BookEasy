import React, { useState } from "react";

import { useEffect, useRef } from "react";

import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

import UploadWidget from "./components/UploadWidget";
import toast, { Toaster } from "react-hot-toast";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import "./Styles/Styles.css";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";

function HotelReg(props) {
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

  const [url_1, updateUrl_1] = useState("1");
  const [url_2, updateUrl_2] = useState("2");
  const [url_3, updateUrl_3] = useState("3");
  const [error, updateError] = useState("error");

  const [input_error, setinput_error] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    contact_no: "",
    price: "",
    rooms: "",
    beds_per_room: "",
    guests_per_room: "",
    bathrooms: "",
    wifi: "",
    television: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any field is empty
    const isFieldEmpty = Object.values(formData).some((value) => value === "");

    //check if any url is empty
    const isUrlEmpty = url_1 === "" || url_2 === "" || url_3 === "";

    if (isFieldEmpty || isUrlEmpty) {
      setinput_error("Please fill in all fields.");
      console.log("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://bookeasy-api.onrender.com/api/owners/add-hotel",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + logged_in_token_val,
          },
          body: JSON.stringify({
            name: formData.name,
            description: formData.description,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            country: formData.country,
            contact_no: formData.contact_no,
            price: formData.price,
            rooms: formData.rooms,
            beds_per_room: formData.beds_per_room,
            guests_per_room: formData.guests_per_room,
            bathrooms: formData.bathrooms,
            wifi: formData.wifi,
            television: formData.television,
            urls: {
              url_1: url_1,
              url_2: url_2,
              url_3: url_3,
            },
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        console.log("API call successful:", data);
        toast.success("Successfully Registered Hotel!");
        // Handle success
      } else {
        toast.error("Error in registering hotel!");
        console.log("API call unsuccessful:", data);
        // Handle failure
      }
    } catch (error) {
      toast.error("Error in registering hotel!");
      console.error("API call error:", error);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  function handleOnUpload_1(error, result, widget) {
    console.log("handleOnUpload_1");
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

  function handleOnUpload_2(error, result, widget) {
    console.log("handleOnUpload_2");
    console.log(error);

    console.log(result.info.secure_url);
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    updateUrl_2(result?.info?.secure_url);
  }

  function handleOnUpload_3(error, result, widget) {
    console.log("handleOnUpload_3");
    console.log(error);

    console.log(result.info.secure_url);
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    updateUrl_3(result?.info?.secure_url);
  }

  return (
    <div>
      <Navbar {...props} active="2" />
      <Toaster />

      <div
        style={{
          marginTop: "50px",
          overflow: "auto",
          marginBottom: "100px",
        }}
      >
        <form onSubmit={handleSubmit} className="hotel_reg_form">
          <span className="poppins-extra-bold-green-36px">
            Hotel Registration
          </span>
          <label htmlFor="name" className="hotel_reg_label">
            Name:
          </label>
          <input
            className="hotel_reg_input_text"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="description" className="hotel_reg_label">
            Description:
          </label>
          <textarea
            className="hotel_reg_input_text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <label htmlFor="address" className="hotel_reg_label">
            Address:
          </label>
          <input
            className="hotel_reg_input_text"
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          <label htmlFor="city" className="hotel_reg_label">
            City:
          </label>
          <input
            className="hotel_reg_input_text"
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />

          <label htmlFor="state" className="hotel_reg_label">
            State:
          </label>
          <input
            className="hotel_reg_input_text"
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />

          <label htmlFor="pincode" className="hotel_reg_label">
            Pincode:
          </label>
          <input
            className="hotel_reg_input_text"
            type="text"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
          />

          <label htmlFor="country" className="hotel_reg_label">
            Country:
          </label>
          <input
            className="hotel_reg_input_text"
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />

          <label htmlFor="contact_no" className="hotel_reg_label">
            Contact Number:
          </label>
          <input
            className="hotel_reg_input_text"
            type="text"
            id="contact_no"
            name="contact_no"
            value={formData.contact_no}
            onChange={handleChange}
          />

          <label htmlFor="price" className="hotel_reg_label">
            Price:
          </label>
          <input
            className="hotel_reg_input_text"
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />

          <label htmlFor="rooms" className="hotel_reg_label">
            Rooms:
          </label>
          <input
            className="hotel_reg_input_text"
            type="number"
            id="rooms"
            name="rooms"
            value={formData.rooms}
            onChange={handleChange}
          />

          <label htmlFor="beds_per_room" className="hotel_reg_label">
            Beds Per Room:
          </label>
          <input
            className="hotel_reg_input_text"
            type="number"
            id="beds_per_room"
            name="beds_per_room"
            value={formData.beds_per_room}
            onChange={handleChange}
          />

          <label htmlFor="guests_per_room" className="hotel_reg_label">
            Guests Per Room:
          </label>
          <input
            className="hotel_reg_input_text"
            type="number"
            id="guests_per_room"
            name="guests_per_room"
            value={formData.guests_per_room}
            onChange={handleChange}
          />

          <label htmlFor="bathrooms" className="hotel_reg_label">
            Bathrooms:
          </label>
          <input
            className="hotel_reg_input_text"
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
          />

          <label htmlFor="wifi" className="hotel_reg_label">
            Wifi:
          </label>
          <input
            className="hotel_reg_input_text"
            type="number"
            id="wifi"
            name="wifi"
            value={formData.wifi}
            onChange={handleChange}
          />

          <label htmlFor="television" className="hotel_reg_label">
            Television:
          </label>
          <input
            className="hotel_reg_input_text"
            type="number"
            id="television"
            name="television"
            value={formData.television}
            onChange={handleChange}
          />

          <UploadWidget onUpload={handleOnUpload_1}>
            {({ open }) => {
              function handleOnClick(e) {
                e.preventDefault();
                open();
              }
              return (
                <button className="hotel_reg_button" onClick={handleOnClick}>
                  Upload Main Image
                </button>
              );
            }}
          </UploadWidget>

          <UploadWidget onUpload={handleOnUpload_2}>
            {({ open }) => {
              function handleOnClick(e) {
                e.preventDefault();
                open();
              }
              return (
                <button className="hotel_reg_button" onClick={handleOnClick}>
                  Upload 2 Image
                </button>
              );
            }}
          </UploadWidget>

          <UploadWidget onUpload={handleOnUpload_3}>
            {({ open }) => {
              function handleOnClick(e) {
                e.preventDefault();
                open();
              }
              return (
                <button className="hotel_reg_button" onClick={handleOnClick}>
                  Upload 3 Image
                </button>
              );
            }}
          </UploadWidget>

          <button type="submit" className="hotel_reg_button">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default HotelReg;
