import "bootstrap/dist/css/bootstrap.css";
import Subscribe from "./Subscribe";
import "../Styles/Styles.css";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";

function Footer(props) {
  return (
    <div class="footer-container">
      <Subscribe />
      <div class="footer">
        <div class="footer-section">
          <img
            class="footer-logo"
            src="https://i.ibb.co/QrkH9Xv/logo.png"
            alt="logo"
            border="0"
          />
          <div class="space-between icons">
            <BsInstagram size="10" />
            <BsFacebook size="10" />
            <BsTwitter size="10" />
            <BsYoutube size="10" />
          </div>
        </div>
        <div class="footer-section flex-start">
          <div class="footer-text">
            <b>Our Destinations</b>
            <div class="color-blue">Indiana</div>
            <div class="color-blue">Massachusetts</div>
            <div class="color-blue">California</div>
            <div class="color-blue">Illinois</div>
          </div>
        </div>
        <div class="footer-section flex-start">
          <div class="footer-text">
            <b>For Beginners</b>
            <div class="color-blue">New Account</div>
            <div class="color-blue">Start Booking a room</div>
            <div class="color-blue">Explore hotels</div>
          </div>
        </div>

        <div class="footer-section flex-start">
          <div class="footer-text">
            <b>Our Destinations</b>
            <div class="color-blue">Our Careers</div>
            <div class="color-blue">Privacy</div>
            <div class="color-blue">Terms & Conditions</div>
          </div>
        </div>
        <div class="footer-section flex-start">
          <div class="footer-text">
            <b>Connect</b>
            <div class="color-blue">Support@bookeasy.com</div>
            <div class="color-blue">812-999-9999</div>
            <div class="color-blue">Bloomington, Indiana</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
