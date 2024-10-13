import React, { useState } from "react";
import "./Regpage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Ar() {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [retype, setRetype] = useState("");
  const [role, setRole] = useState("USER"); // Adding role field
  const [name, setName] = useState("");
  const nav = useNavigate();

  const register = async (event) => {
    event.preventDefault();

    if (pass !== retype) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://172.18.157.244:8080/ChatBot/Users",
        {
          id: null, // You can either set it to null, or let the database auto-generate the ID.
          username,
          password: pass,
          role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Registered Successfully");
      nav("/Login");
      console.log(response.data);
    } catch (e) {
      console.error("Error: " + e.message);

      alert("Registration failed. Please try again.");
      setName("");
      setPass("");
      setRetype("");
      setUsername("");
    }
  };
  return (
    <div>
      <div class="container-fluid">
        <div class="row">
          <div
            id="brandname"
            class="col d-flex  justify-content-center align-items-center "
          >
            <p class=" mt-0 mb-0">HEALTHCARE AI</p>
          </div>
        </div>
        <div
          class="row d-flex  flex-column justify-content-center align-items-center"
          id="form"
        >
          <div class="col-12 col-sm-6 d-flex  flex-column justify-content-center align-items-center mt-5 mt-sm-0">
            <div id="formborder">
              <form
                class="d-flex  flex-column justify-content-center align-items-center "
                onSubmit={register}
              >
                <div id="loginname">Admin Sign Up</div>
                <div>
                  <div id="nameinput">
                    <label for="">
                      <i class="fa-solid fa-user"></i>
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div id="emailinput">
                    <label for="">
                      <i class="fa-solid fa-envelope"></i>
                    </label>
                    <input
                      value={username}
                      type="email"
                      placeholder="E-Mail"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div id="passinput">
                    <label for="">
                      <i class="fa-solid fa-lock"></i>
                    </label>
                    <input
                      value={pass}
                      type="password"
                      placeholder="Password"
                      onChange={(e) => {
                        setPass(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div id="passinput">
                    <label for="">
                      <i class="fa-solid fa-lock"></i>
                    </label>
                    <input
                      value={retype}
                      type="password"
                      placeholder="Confirm Password"
                      onChange={(e) => {
                        setRetype(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div class="container-fluid">
                    <div class="row">
                      <div
                        id="sub"
                        class="col-12 d-flex  flex-column justify-content-center align-items-center"
                      >
                        <button type="submit">
                          <a>Submit</a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            id="regside"
            class="col-12 col-sm-6 d-flex  flex-column justify-content-center align-items-center"
          >
            <p>Already have an Account?</p>

            <Link to="/Login">
              <a>Login Here</a>
            </Link>
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
                  <i class="fa fa-copyright"></i> HEALTHCARE AI 2024
                </p>
                <a>Take Care of your health bY AI</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
