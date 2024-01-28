import { useState } from "react";
import "../Styles/Styles.css";
import BarChart from "./BarChart";
import { UserData } from "../utils/Data";
import MenuBar from "./MenuBar";
import Footer from "./Footer";
import PastBooking from "./PastBooking";
import CurrentBooking from "./CurrentBooking";

import Navbar from "./navbar";

import Profileupdate from "./Profileupdate";

function Dashboard(props) {
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

  //state to hold menu selection

  const [menuSelection, setMenuSelection] = useState("Dashboard");

  // props to send to menu bar
  const menuBarProps = {
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
  };

  //console.log(UserData);
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Total Spending Monthly",
        data: UserData.map((data) => data.userGain),
        barPercentage: 0.3,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
      },
    ],
  });

  return (
    <div>
      <Navbar {...props} active="3" />
      <div
        class="padding-left-10 padding-right-10 margin-top-50 "
        style={{ marginBottom: "770px" }}
      >
        <div class="float-left margin-right-60">
          <MenuBar {...menuBarProps} />
        </div>

        <div>
          {menuSelection === "Dashboard" && (
            <div>
              <div class="flexbox">
                <div class="dashboard-details margin-right-60">
                  <div class="margin-top-20">Total Hotels Stayed</div>
                  <div class="flex-center">4</div>
                </div>
                <div class="dashboard-details margin-right-60">
                  <div class="margin-top-20">Total Rooms Booked</div>
                  <div class="flex-center">24</div>
                </div>
                <div class="dashboard-details margin-right-60">
                  <div class="margin-top-20">Total Expenses</div>
                  <div class="flex-center">$280</div>
                </div>
              </div>
              <div class="margin-top-50 ">
                <BarChart chartData={userData} />
              </div>
            </div>
          )}

          {menuSelection === "Profile" && <Profileupdate {...props} />}

          {menuSelection === "CurrentBooking" && <CurrentBooking />}
          {menuSelection === "History" && <PastBooking />}
        </div>

        {menuSelection === "History" && (
          <div class="margin-bottom-150">
            <br />
          </div>
        )}
        {menuSelection === "CurrentBooking" && (
          <div class="margin-bottom-150">
            <br />
          </div>
        )}

        <div class="margin-top-350">
          <br />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
