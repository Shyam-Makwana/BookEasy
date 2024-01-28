import "../Styles/Styles.css";
import "bootstrap/dist/css/bootstrap.css";

export default function BillingPreview(props) {
  const totalDays =
    (new Date(props.searchParams.checkOut) -
      new Date(props.searchParams.checkIn)) /
    (1000 * 3600 * 24);
  return (
    <div class="border-2">
      <div class="center-align">
        <img src={props.hotel.url_2} width="350" alt="Hotel" class="mb-2" />
        <div class="poppins billing-hotel-name text-truncate">
          {props.hotel.name} - {props.hotel.city}
        </div>
      </div>
      <div>
        <div class="poppins" style={{ fontSize: 14 }}>
          <div class="card border-0 ">
            <div class="card-body pt-0">
              <hr class="my-2 mb-3" />
              <div class="row ">
                <div class="col">
                  <div class="row justify-content-between mb-1">
                    <div class="col-6">
                      <p class="mb-1">
                        <b>Check In</b>
                      </p>
                    </div>
                    <div class="flex-sm-col col-auto">
                      <p class="mb-1">{props.searchParams.checkIn}</p>
                    </div>
                  </div>
                  <div class="row justify-content-between mb-1">
                    <div class="col">
                      <p class="mb-1">
                        <b>Check Out</b>
                      </p>
                    </div>
                    <div class="flex-sm-col col-auto">
                      <p class="mb-1">{props.searchParams.checkOut}</p>
                    </div>
                  </div>
                  <div class="row justify-content-between mb-1">
                    <div class="col">
                      <p class="mb-1">
                        <b>Rooms</b>
                      </p>
                    </div>
                    <div class="flex-sm-col col-auto">
                      <p class="mb-1">{props.searchParams.rooms}</p>
                    </div>
                  </div>
                  <div class="row justify-content-between mb-1">
                    <div class="col">
                      <p class="mb-1">
                        <b>Rooms Cost</b>
                      </p>
                    </div>
                    <div class="flex-sm-col col-auto">
                      <p class="mb-1">
                        $
                        {props.searchParams.rooms *
                          totalDays *
                          props.hotel.price}
                      </p>
                    </div>
                  </div>
                  <div class="row justify-content-between mb-1">
                    <div class="col">
                      <p class="mb-1">
                        <b>Service Fee</b>
                      </p>
                    </div>
                    <div class="flex-sm-col col-auto">
                      <p class="mb-1">$100</p>
                    </div>
                  </div>
                  <div class="row justify-content-between mb-1">
                    <div class="col">
                      <p class="mb-1">
                        <b>Tax</b>
                      </p>
                    </div>
                    <div class="flex-sm-col col-auto">
                      <p class="mb-1">$30</p>
                    </div>
                  </div>
                  <hr class="my-2" />
                  <div class="row justify-content-between">
                    <div class="col-6">
                      <p>
                        <b>Total</b>
                      </p>
                    </div>
                    <div class="flex-sm-col col-auto">
                      <p class="mb-1">
                        $
                        {props.searchParams.rooms *
                          totalDays *
                          props.hotel.price +
                          120}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
