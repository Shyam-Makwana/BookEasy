import { useEffect, useState } from "react";
import Hotel from "./Hotel";

import "../Styles/Styles.css";
import "bootstrap/dist/css/bootstrap.css";

export default function PastBooking() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    let logedInToken = sessionStorage.getItem("loggedInToken");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + logedInToken);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://bookeasy-api.onrender.com/api/users/booking-details",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setHotels(result.booking_details);
      })
      .catch((error) => console.log("error", error));
  }, []);
  //console.log(hotels);
  return (
    <div class="past-bookings-container">
      <div class="card-heading" style={{ marginBottom: 10 }}>
        Past Bookings
      </div>
      {hotels.map((hotel) => {
        return (
          <Hotel
            hotelName={hotel.hotel_name}
            checkIn={hotel.checkin}
            checkOut={hotel.checkout}
          ></Hotel>
        );
      })}
    </div>
  );
}
