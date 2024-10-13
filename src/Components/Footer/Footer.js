import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div>
      <div id="foot" class="container-fluid p-5">
        <div class="row d-flex justify-content-center align-items-start">
          <div
            id="f1"
            class="col-12 col-sm-3 d-flex flex-column justify-content-center align-items-start"
          >
            <p>Explore</p>
            <a href="#">About Us</a>
            <a href="#">Blog</a>
            <a href="#">FAQ</a>
          </div>

          <div
            id="f2"
            class="col-12 col-sm-3 d-flex flex-column justify-content-center align-items-start"
          >
            <p>Legal Terms</p>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Refund and Returns Policy</a>
          </div>

          <div
            id="f3"
            class="col-12 col-sm-3 d-flex flex-column justify-content-center align-items-start"
          >
            <p>Follow Us</p>
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
          </div>

          <div
            id="f4"
            class="col-12 col-sm-3 d-flex flex-column justify-content-center align-items-start"
          >
            <p>Newsletter</p>
            <input type="email" placeholder="Enter your email address" />
            <a href="#">Submit</a>
          </div>
        </div>
      </div>
      <div
        id="footdown"
        class="container-fluid d-flex justify-content-center align-items-center"
      >
        <div class="row">
          <div
            id="f5"
            class="col d-flex justify-content-center align-items-center"
          >
            <p>
              <i class="fa fa-copyright" aria-hidden="true"></i> 2024, Crumble.
              All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
