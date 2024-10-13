import React from "react";
import "./Login.css";
import "./Images/img1.jpg";
import "./Images/fixbg.jpg";
function Login() {
  return (
    <div>
      <div class="container-fluid">
        <div class="row">
          <div
            id="brandname"
            class="col d-flex  justify-content-center align-items-center "
          >
            <p class=" mt-0 mb-0">Crumble</p>
          </div>
        </div>
        <div
          class="row d-flex  flex-column justify-content-center align-items-center"
          id="form"
        >
          <div class="col-12 col-sm-6 d-flex  flex-column justify-content-center align-items-center mt-5 mt-sm-0">
            <div id="formborder">
              <form class="d-flex  flex-column justify-content-center align-items-center">
                <div id="loginname">Login</div>
                <div>
                  <div id="emailinput">
                    <label for="">
                      <i class="fa-solid fa-envelope"></i>
                    </label>
                    <input type="email" placeholder="E-Mail"></input>
                  </div>
                  <div id="passinput">
                    <label for="">
                      <i class="fa-solid fa-lock"></i>
                    </label>
                    <input type="password" placeholder="Password"></input>
                  </div>
                  <div class="container-fluid">
                    <div class="row">
                      <div
                        id="sub"
                        class="col-12 d-flex  flex-column justify-content-center align-items-center"
                      >
                        <a href="#">Submit</a>
                      </div>
                    </div>
                  </div>
                  <div id="fp">
                    <a href="#">Forget Password</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            id="regside"
            class="col-12 col-sm-6 d-flex  flex-column justify-content-center align-items-center"
          >
            <p class="text-center">
              New here? Don't have an account? To get Started
            </p>
            <a href="#">Register Here</a>
          </div>
        </div>
        <footer>
          <div class="container-fluid p-0">
            <div class="row">
              <div
                id="footername"
                class="col d-flex  flex-column justify-content-center align-items-center"
              >
                <p class="m-0">
                  <i class="fa fa-copyright"></i> Crumble 2024
                </p>
                <a>Enjoy your Meals with Crumble!!!</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Login;
