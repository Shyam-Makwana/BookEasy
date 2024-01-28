import "../Styles/Styles.css";
import "bootstrap/dist/css/bootstrap.css";
function ExpenseItem(props) {
  let handleHotelBooking = () => {
    props.onHotelSelect(props.id);
  };

  return (
    <div className="card-container">
      <div class="card-content">
        <div class="image-container">
          <span class="badge badge-pill badge-info badge-img flexbox">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Orange_star.svg/1117px-Orange_star.svg.png"
              height="14"
              class="margin-right-5"
              alt="star"
            />
            4.8
          </span>
          <img src={props.img} className="card-image" alt="hotelImage"></img>
        </div>
        <div>
          <p class="card-heading text-truncate">{props.hotel}</p>
        </div>
        <div class="flexbox">
          <div class="flexbox">
            <img
              alt="beds"
              src="https://media.istockphoto.com/id/1216090721/vector/simple-bed-line-icon.jpg?s=170667a&w=0&k=20&c=BvRCEDoIGatk_6c4ng7LDKAiG_IsmYZ6TwKtiq6HNPA="
              height="34"
            />
            <div class="icon-text">{props.beds}</div>
          </div>
          <div class="flexbox margin-left">
            <img
              alt="people"
              src="data:image/png;base64,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"
              height="25"
            />
            <div class="icon-text">{props.people}</div>
          </div>
        </div>
        <div>
          <button
            type="button"
            class="btn btn-success btn-width"
            onClick={handleHotelBooking}
          >
            Book @ ${props.price} / Night
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseItem;
