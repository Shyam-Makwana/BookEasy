import "../Styles/Styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { useState } from "react";

export default function Calculator(props) {
  const [rooms, setRooms] = useState(parseInt(props.rooms));
  const [guests, setGuests] = useState(parseInt(props.guests));
  const [checkIn, setCheckIn] = useState(props.checkIn);
  const [checkOut, setCheckOut] = useState(props.checkOut);

  const __searchObj = {
    destination: props.destination,
    checkIn: props.checkIn,
    checkOut: props.checkOut,
    rooms: props.rooms,
    guests: props.guests,
  };

  let handleDateChange = (event) => {
    //console.log(event.target.dataset.for);
    //console.log(event.target.value);

    if (event.target.dataset.for == "checkIn") {
      let d = new Date(event.target.value);
      // console.log(d);
      __searchObj[event.target.dataset.for] =
        d.getFullYear().toString() +
        "-" +
        d.toLocaleString("en-us", { month: "2-digit", timeZone: "UTC" }) +
        "-" +
        d.toLocaleString("en-us", { day: "2-digit", timeZone: "UTC" });

      setCheckIn(__searchObj[event.target.dataset.for]);
    } else {
      let d = new Date(event.target.value);
      __searchObj[event.target.dataset.for] =
        d.getFullYear().toString() +
        "-" +
        d.toLocaleString("en-us", { month: "2-digit", timeZone: "UTC" }) +
        "-" +
        d.toLocaleString("en-us", { day: "2-digit", timeZone: "UTC" });

      setCheckOut(__searchObj[event.target.dataset.for]);
    }

    props.onParamsChange(__searchObj);
  };

  let handleControlClick = (event) => {
    if (event.currentTarget.dataset.btnfunc == "rooms-add") {
      __searchObj.rooms = rooms + 1;
      setRooms(rooms + 1);
    } else if (event.currentTarget.dataset.btnfunc == "rooms-sub") {
      if (rooms > 0) {
        __searchObj.rooms = rooms - 1;
        setRooms(rooms - 1);
      }
    } else if (event.currentTarget.dataset.btnfunc == "guests-add") {
      __searchObj.guests = guests + 1;
      setGuests(guests + 1);
    } else if (event.currentTarget.dataset.btnfunc == "guests-sub") {
      if (rooms > 0) {
        __searchObj.guests = guests - 1;
        setGuests(guests - 1);
      }
    }

    props.onParamsChange(__searchObj);
  };

  let handleClick = () => {
    //console.log(__searchObj);
    props.onMoveToPayment();
  };

  return (
    <div class="calc-container poppins">
      <div class="mb-2 heading">Booking Details</div>
      <div class="flex mb-3">
        <div class="price margin-right-5 ">${props.price}</div>
        <div class="txt">Per DAY</div>
      </div>
      <div class="booking mb-4">
        <div class="mb-2">Rooms</div>
        <div class="flex rooms">
          <AiOutlinePlus
            size="25"
            class="control-icon"
            data-btnfunc="rooms-add"
            onClick={handleControlClick}
          />
          <div class="control-number">
            <div>{rooms} Rooms</div>
          </div>
          <AiOutlineMinus
            size="25"
            class="control-icon"
            data-btnfunc="rooms-sub"
            onClick={handleControlClick}
          />
        </div>
      </div>
      <div class="booking mb-4">
        <div class="mb-2">Travelers</div>
        <div class="flex rooms">
          <AiOutlinePlus
            size="25"
            class="control-icon"
            data-btnfunc="guests-add"
            onClick={handleControlClick}
          />
          <div class="control-number">
            <div>{guests} Travelers</div>
          </div>
          <AiOutlineMinus
            size="25"
            class="control-icon"
            data-btnfunc="guests-sub"
            onClick={handleControlClick}
          />
        </div>
      </div>
      <div class="booking mb-4">
        <div class="flexbox">
          <div>
            <div>Check In</div>
            <input
              type="Date"
              placeholder="Check-out"
              onChange={handleDateChange}
              data-for="checkIn"
              value={checkIn}
              style={{ width: 150, marginLeft: 0 }}
            />
          </div>
          <div>
            <div>Check Out</div>
            <input
              type="Date"
              placeholder="Check-out"
              onChange={handleDateChange}
              data-for="checkOut"
              value={checkOut}
              style={{ width: 150, marginLeft: 0 }}
            />
          </div>
        </div>
      </div>
      <div class="price-details mb-2">
        You will pay <b>560$</b> For <b>2 Nights</b>
      </div>
      <div class="book-btn" onClick={handleClick}>
        Continue to Book
      </div>
    </div>
  );
}
