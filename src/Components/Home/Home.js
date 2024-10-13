import React from "react";
import "./Home.css";
import card from "./Images/fixbg.jpg";
import bg from "./Images/imggym.png";
import smbg from "./Images/smimg.png";
function Home() {
  return (
    <div>
      <div id="bgimg" class="container-fluid p-0">
        <img class="img-fluid d-none d-sm-flex" src={bg} alt="" />
        <img class="img-fluid d-flex d-sm-none" src={smbg} alt="" />
        <div class="container-fluid">
          <div class="row">
            <div id="bgtext" class="col">
              <p>WISE STEP TOWARDS YOUR FITNESS</p>
              <p>with Crumble</p>
              <a href="#">Discover more</a>
            </div>
          </div>
        </div>
      </div>
      <div id="bg">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <p id="cardhead">Explore</p>
            </div>
          </div>
        </div>
        <div class="container-fluid p-0">
          <div id="cards">
            <div>
              <a href="#">
                <img src={card} alt="" />
              </a>
              <p>Menu</p>
            </div>
            <div>
              <a href="#">
                <img src={card} alt="" />
              </a>
              <p>Menu Item</p>
            </div>
            <div>
              <a href="#">
                <img src={card} alt="" />
              </a>
              <p>Menu Item</p>
            </div>
            <div>
              <a href="#">
                <img src={card} alt="" />
              </a>
              <p>Menu Item</p>
            </div>
            <div>
              <a href="#">
                <img src={card} alt="" />
              </a>
              <p>Menu Item</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
