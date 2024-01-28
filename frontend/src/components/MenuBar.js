//https://bookeasy.netlify.app/dashboard

import "../Styles/Styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { MdDashboard } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi";
import { ImProfile } from "react-icons/im";
import { BsFillBagFill } from "react-icons/bs";
import { MdWorkHistory } from "react-icons/md";

export default function MenuBar(props) {
  const {
    menuSelection,
    setMenuSelection,
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

  console.log(" MenuBar.js: isAdmin_val: ", isAdmin_val);

  const handleClickProfile = () => {
    setMenuSelection("Profile");
  };

  const handleClickDashboard = () => {
    setMenuSelection("Dashboard");
  };

  const handleClickCurrentBookings = () => {
    setMenuSelection("CurrentBooking");
  };

  const handleHistoryClick = () => {
    setMenuSelection("History");
  };

  return (
    <div class="poppins" style={{ width: "10%" }}>
      <div class="user-details">
        <div>
          {logged_in_photo_val ? (
            <img
              src={logged_in_photo_val}
              alt="Example image"
              className="nav-img"
              style={{ borderRadius: "50%", width: "80px", height: "80px" }}
            />
          ) : (
            <div>
              <HiUserCircle size="60" />
            </div>
          )}
        </div>
        <div>{logged_in_name_val}</div>
        <div class="text-truncate" style={{ width: "100%" }}>
          {logged_in_email_val}
        </div>
        <div>{logged_in_phone_val}</div>
        {isAdmin_val === "yes" ? <div>Hotel Owner</div> : <div>Customer</div>}
      </div>

      <div class="options">
        <div
          class={"opts " + (menuSelection == "Dashboard" ? " active-opt" : "")}
        >
          <MdDashboard size="20" />
          <div
            class="margin-left-3"
            onClick={handleClickDashboard}
            style={{ cursor: "pointer" }}
          >
            Dashboard
          </div>
        </div>
        <div
          class={"opts " + (menuSelection == "Profile" ? " active-opt" : "")}
        >
          <ImProfile size="20" />
          <div
            class="margin-left-3"
            onClick={handleClickProfile}
            style={{ cursor: "pointer" }}
          >
            View Profile
          </div>
        </div>
        <div
          class={
            "opts " + (menuSelection == "CurrentBooking" ? " active-opt" : "")
          }
        >
          <BsFillBagFill size="20" />
          <div
            class="margin-left-3"
            onClick={handleClickCurrentBookings}
            style={{ cursor: "pointer" }}
          >
            Current Bookings
          </div>
        </div>
        <div
          class={"opts " + (menuSelection == "History" ? " active-opt" : "")}
        >
          <MdWorkHistory size="20" />
          <div
            class="margin-left-3"
            onClick={handleHistoryClick}
            style={{ cursor: "pointer" }}
          >
            Booking History
          </div>
        </div>
      </div>
    </div>
  );
}
