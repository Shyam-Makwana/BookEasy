import { BsWifi } from "react-icons/bs";
import { SlScreenDesktop } from "react-icons/sl";
import { TbToolsKitchen2 } from "react-icons/tb";
import { BiBath } from "react-icons/bi";
import { GiPersonInBed } from "react-icons/gi";
import "../Styles/Styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { MdKeyboardBackspace } from "react-icons/md";
import Calculator from "./Calculator";

export default function HotelInformation(props) {
  let handleReturn = () => {
    //console.log("Here");
    props.onReturn();
  };

  return (
    <div class="mb-100">
      <div class="hotel-name">
        <div class="return-btn" onClick={handleReturn}>
          <MdKeyboardBackspace size="20" />
          Back
        </div>
        <div class="name">{props.hotel.name}</div>
        <div class="addr">
          {props.hotel.city}, {props.hotel.state}
        </div>
      </div>
      <div class="flex hotel-page-container justify-content-center mb-5 ">
        <div class="mr-5">
          <img
            src={props.hotel.url_1}
            alt="hotel img"
            height="550"
            class="hotel-image"
          />
        </div>
        <div class="flex flex-direction-col">
          <div class="mb-1">
            <img
              src={props.hotel.url_2}
              alt="hotel img 2"
              height="275"
              class="hotel-image"
            />
          </div>
          <img
            src={props.hotel.url_3}
            alt="hotel img 2"
            height="275"
            class="hotel-image flex-basis-25"
          />
        </div>
      </div>
      <div class="flex hotel-information-container">
        <div class="flex-basis-50 ml-150">
          <div>
            <div class="mb-1">About this Hotel</div>
            <div class="Poppins">{props.hotel.description}</div>
            <br />
            <div class="Poppins mb-15">
              Staying at the Biddle Hotel puts you at the center of IU’s
              world-renowned Bloomington campus, where you’ll be surrounded by
              stunning natural beauty, breathtaking architecture, and IU
              landmarks such as the Sample Gates, Showalter Fountain, and the
              Rose Well House. You’ll also have no shortage of things to do on
              campus.
            </div>
            <div class="services">
              {props.hotel.wifi ? (
                <div>
                  <BsWifi size="25" />
                  <div>Wifi</div>
                </div>
              ) : (
                ""
              )}
              {props.hotel.television ? (
                <div>
                  <SlScreenDesktop size="25" />
                  <div class="text-center">TV</div>
                </div>
              ) : (
                ""
              )}
              <div>
                <TbToolsKitchen2 size="25" />
                <div class="text-center">Kitchen</div>
              </div>

              <div>
                <BiBath size="25" />
                <div class="text-center">{props.hotel.bathrooms} Bath</div>
              </div>

              <div>
                <GiPersonInBed size="25" />
                <div class="text-center">{props.hotel.beds_per_room} beds</div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-basis-50 calculator-container">
          <Calculator
            rooms={props.rooms}
            guests={props.guests}
            checkIn={props.checkIn}
            checkOut={props.checkOut}
            price={props.hotel.price}
            destination={props.hotel.city}
            onParamsChange={props.onParamsChange}
            onMoveToPayment={props.onMoveToPayment}
          />
        </div>
      </div>
    </div>
  );
}
