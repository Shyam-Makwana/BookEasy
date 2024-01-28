import "../Styles/Styles.css";
import "bootstrap/dist/css/bootstrap.css";

import BillingPreview from "./BillingPreview";

import { useNavigate } from "react-router-dom";

import React, { useState } from "react";

import toast, { Toaster } from "react-hot-toast";

export default function Payment(props) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const totalDays =
    (new Date(props.searchParams.checkOut) -
      new Date(props.searchParams.checkIn)) /
    (1000 * 3600 * 24);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(formData);
    console.log(props.hotel);
    console.log(props.user);
    console.log(props.searchParams);

    // Check if any field is empty
    const isFieldEmpty = Object.values(formData).some((value) => value === "");

    if (isFieldEmpty) {
      console.log("Please fill in all fields.");
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://bookeasy-api.onrender.com/api/users/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + props.user.logged_in_token_val,
          },
          body: JSON.stringify({
            hotel_id: props.hotel.id,
            checkin: props.searchParams.checkIn,
            checkout: props.searchParams.checkOut,
            total_rooms: props.searchParams.rooms,
            total_nights: totalDays,
            total_guests: props.searchParams.guests,
            room_price: props.hotel.price,
            image: props.hotel.url_1,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.mobileNumber,
            billing_address: formData.address,
            billing_city: formData.city,
            billing_state: formData.state,
            billing_zip_code: formData.zipCode,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        console.log("API call successful:", data);
        toast.success("Successfully Booked!");

        window.location.href = data.url;
        // Handle success
      } else {
        toast.error("Error in Booking!");
        console.log("API call unsuccessful:", data);
        // Handle failure
      }
    } catch (error) {
      toast.error("Error in Booking!");
      console.error("API call error:", error);
    }
    // navigate("/confirmation");
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div class="payments-container">
      <Toaster />
      <div class="flexbox">
        <form
          style={{
            flexBasis: "60%",
          }}
          onSubmit={handleSubmit}
        >
          <fieldset class="poppins mb-5 border-2">
            <legend>Personal Information</legend>
            <div class="flexbox">
              <input
                type="text"
                class="form-control"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                style={{ flexBasis: "49%" }}
              />
              <input
                type="text"
                class="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                style={{ flexBasis: "49%" }}
              />
            </div>
            <div class="mt-3">
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                name="email"
                value={formData.email}
                onChange={handleChange}
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div class="mt-3">
              <input
                type="tel"
                class="form-control"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                aria-describedby="emailHelp"
                placeholder="Mobile Number"
              />
            </div>
          </fieldset>
          <fieldset class="poppins mb-5 border-2">
            <legend>Billing Address</legend>
            <div class="mt-3 mb-3">
              <textarea
                class="form-control"
                id="exampleInputEmail1"
                name="address"
                value={formData.address}
                onChange={handleChange}
                aria-describedby="emailHelp"
                placeholder="Address"
              />
            </div>
            <div class="flexbox">
              <input
                type="text"
                class="form-control"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                style={{ flexBasis: "33%" }}
              />
              <input
                type="text"
                class="form-control"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                style={{ flexBasis: "33%" }}
              />
              <input
                type="text"
                class="form-control"
                id="Zip Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="Zip Code"
                style={{ flexBasis: "33%" }}
              />
            </div>
          </fieldset>
          <div class="center-align">
            <button type="submit" class="btn btn-success">
              Continue Booking
            </button>
          </div>
        </form>
        <div style={{ flexBasis: "30%" }}>
          <BillingPreview
            searchParams={props.searchParams}
            hotel={props.hotel}
          />
        </div>
      </div>
    </div>
  );
}
