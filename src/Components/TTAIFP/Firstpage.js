import React from "react";
import "./Firstpage.css";
import bg from "./IMAGES/BGIMG.jpg";
import mobbg from "./IMAGES/mobgimg.jpg";
import { Link } from "react-router-dom";

function Firstpage() {
  return (
    <div>
      <header>
        <div id="headcont" class="container-fluid pt-3 pb-3">
          <div class="row h-100 d-flex justify-content-center align-items-center">
            <div
              id="head1"
              class="col-6 d-flex justify-content-start align-items-start"
            >
              HEALTHCARE AI
            </div>

            <div class="col-6 d-flex justify-content-end align-items-end">
              <Link to="/Login">
                <a>
                  <i id="head2" class="fa-solid fa-user"></i>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div class="container-fluid">
          <div class="row">
            <div id="main" class="col">
              <p>WELCOME TO HealthCare AI CHATBOT</p>

              <Link to={"/Booking"}>
                <a>START</a>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Firstpage;
