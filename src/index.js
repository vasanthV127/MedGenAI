import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./Components/L&R/Login.js";
import reportWebVitals from "./reportWebVitals";
import Register from "./Components/L&R/Register.js";
import Navbar from "./Components/Nav/Navbar.js";
import Home from "./Components/Home/Home.js";
import Footer from "./Components/Footer/Footer.js";
import Db from "./Components/Logindb/Db.js";
import Loginpage from "./Components/TTAILP/Loginpage.js";
import Regpage from "./Components/TTAIRP/Regpage.js";
import Al from "./Components/ALoginHCAI/Al.js";
import Dl from "./Components/DLoginHCAI/Dl.js";
import Rl from "./Components/RLoignHCAI/Rl.js";
import Alhome from "./Components/Adminhome/Alhome.js";
import Dlhome from "./Components/Doctorhome/Dlhome.js";
import Plhome from "./Components/Patienthome/Plhome.js";
import Rlhome from "./Components/Researchhome/Rlhome.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/Db" element={<Db />} />
        <Route path="/Loginpage" element={<Loginpage />} />
        <Route path="/register" element={<Regpage />} />
        <Route path="/Adminlogin" element={<Al />} />
        <Route path="/Doctorlogin" element={<Dl />} />
        <Route path="/Researcherlogin" element={<Rl />} />
        <Route path="/Adminhome" element={<Alhome />} />
        <Route path="/Doctorhome" element={<Dlhome />} />
        <Route path="/Patienthome" element={<Plhome />} />
        <Route path="/Researchhome" element={<Rlhome />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*<BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Firstpage />}></Route>
        <Route path="/Login" element={<Loginpage />}></Route>
        <Route path="/Register" element={<Regpage />}></Route>
        <Route path="/Booking" element={<Secpage />}></Route>
      </Routes>
    </BrowserRouter>*/

/* <BrowserRouter>
      <Routes>
        <Route path="/Db" element={<Db />} />
        <Route path="/Loginpage" element={<Loginpage />} />
        <Route path="/Register" element={<Regpage />} />
      </Routes>
    </BrowserRouter>*/
