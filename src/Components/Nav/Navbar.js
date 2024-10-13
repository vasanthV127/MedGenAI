import React from "react";
import "./Navbar.css";
function Navbar() {
  return (
    <div>
      <header>
        <div
          id="head"
          class="container-fluid bg-white border-bottom border-black"
          style={{ height: "50px" }}
        >
          <div class="row h-100">
            <div
              class="col-4 d-flex justify-content-start align-items-center"
              style={{
                fontFamily: "'Yesteryear', cursive",
                fontSize: "25px",
                fontWeight: 400,
                fontStyle: "normal",
                color: "#673147",
              }}
            >
              Crumble
            </div>
            <div
              class="col-4 d-flex justify-content-center align-items-center"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "30px",
                fontWeight: 700,
                fontStyle: "normal",
                color: "black",
              }}
            >
              Crumble
            </div>
            <div
              class="col-4 d-flex justify-content-end align-items-center text-black"
              style={{ gap: "35px", fontSize: "23px", cursor: "pointer" }}
            >
              <a href="#">
                <i id="icon" class="fa-solid fa-cart-shopping"></i>
              </a>
              <a href="#">
                <i id="icon2" class="fa-regular fa-user"></i>
              </a>
            </div>
          </div>
        </div>
        <nav>
          <div
            class="container-fluid bg-white border-bottom border-black"
            style={{ height: "50px" }}
          >
            <div class="row h-100">
              <div
                class="col d-sm-none d-flex  align-items-center text-black"
                style={{ fontSize: "24px" }}
              >
                <a href="#">
                  <i id="icon3" class="fa-solid fa-bars"></i>
                </a>
              </div>
              <div
                class="col d-none d-sm-flex d-flex  align-items-center text-black"
                style={{ gap: "25px" }}
              >
                <a id="nav1" href="#">
                  Plans
                </a>
                <a id="nav2" href="#">
                  Customize
                </a>
                <a id="nav3" href="#">
                  About Us
                </a>
              </div>
              <div class="col  d-flex justify-content-end align-items-center text-black">
                <a id="nav4" href="#">
                  Subscription
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
