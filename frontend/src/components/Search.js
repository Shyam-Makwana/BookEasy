import { ImLocation } from "react-icons/im";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaBed } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import "../Styles/Styles.css";
import "bootstrap/dist/css/bootstrap.css";

function Search(props) {
  const __searchObj = {
    destination: props.destination,
    checkIn: props.checkIn,
    checkOut: props.checkOut,
    rooms: props.rooms,
    guests: props.guests,
  };

  let handleChange = (event) => {
    // console.log(event.target.dataset.for);
    //console.log(event.target.value);

    if (
      event.target.dataset.for == "checkIn" ||
      event.target.dataset.for == "checkOut"
    ) {
      let d = new Date(event.target.value);
      __searchObj[event.target.dataset.for] =
        d.getFullYear().toString() +
        "-" +
        d.toLocaleString("en-us", { month: "2-digit", timeZone: "UTC" }) +
        "-" +
        d.toLocaleString("en-us", { day: "2-digit", timeZone: "UTC" });
    } else __searchObj[event.target.dataset.for] = event.target.value;

    if (
      __searchObj.destination.length > 2 &&
      (__searchObj.checkIn != "" + __searchObj.checkOut) != "" &&
      __searchObj.rooms != "" &&
      __searchObj.guests != ""
    )
      props.onSearchChange(__searchObj);
  };
  return (
    <div className="App">
      <div className="search-container">
        <div className="search-textbox">
          <ImLocation size={25} />
          <input
            type="text"
            class="no-border-textbox search-textbox"
            id="inlineFormInputName2"
            placeholder="Destination"
            onChange={handleChange}
            data-for="destination"
          />
        </div>
        <div className="search-textbox">
          <BsFillCalendarDateFill size={25} />
          <input
            type="Date"
            placeholder="Check-in Date"
            onChange={handleChange}
            data-for="checkIn"
          />
        </div>
        <div className="search-textbox">
          <BsFillCalendarDateFill size={25} />
          <input
            type="Date"
            placeholder="Check-out Date"
            onChange={handleChange}
            data-for="checkOut"
          />
        </div>
        <div className="search-textbox">
          <FaBed size={25} />
          <input
            type="text"
            class="no-border-textbox search-textbox"
            id="inlineFormInputName2"
            placeholder="Rooms"
            onChange={handleChange}
            data-for="rooms"
          />
        </div>
        <div className="search-textbox">
          <IoMdContact size={25} />
          <input
            type="text"
            class="no-border-textbox search-textbox"
            id="inlineFormInputName2"
            placeholder="Guests"
            onChange={handleChange}
            data-for="guests"
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
