import "../Styles/Styles.css";
import "bootstrap/dist/css/bootstrap.css";

export default function Hotel(props) {
  return (
    <div class="mb-2">
      <div class="hotel-container justify-content-space-between poppins">
        <div>{props.hotelName}</div>
        <div class="flexbox">
          <span
            class="badge badge-pill badge-secondary"
            style={{ background: "black", marginRight: 5 }}
          >
            {props.checkIn}
          </span>
          <span
            class="badge badge-pill badge-secondary"
            style={{ background: "black" }}
          >
            {props.checkOut}
          </span>
        </div>
      </div>
    </div>
  );
}
