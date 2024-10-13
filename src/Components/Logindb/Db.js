import React from "react";
import { Link } from "react-router-dom";

function LoginDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-md py-4 px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-800">HEALTHCARE AI</h1>
        </div>
      </header>
      
      <div className="flex flex-wrap justify-center items-center flex-grow p-4">
        <div className="bg-white shadow-md rounded-lg p-6 m-4 w-80 md:w-96 lg:w-1/3 xl:w-1/4">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Patient Dashboard</h2>
          <Link to="/Loginpage">
            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-lg">
              Login as Patient
            </button>
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 m-4 w-80 md:w-96 lg:w-1/3 xl:w-1/4">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Doctor Dashboard</h2>
          <Link to="/Doctorlogin">
            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-lg">
              Login as Doctor
            </button>
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 m-4 w-80 md:w-96 lg:w-1/3 xl:w-1/4">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Admin Dashboard</h2>
          <Link to="/Adminlogin">
            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-lg">
              Login as Admin
            </button>
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 m-4 w-80 md:w-96 lg:w-1/3 xl:w-1/4">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Researcher Dashboard</h2>
          <Link to="/Researcherlogin">
            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-lg">
              Login as Researcher
            </button>
          </Link>
        </div>
      </div>

      <footer className="bg-white shadow-md py-4 px-6 mt-4">
        <div className="text-center">
          <p className="m-0 text-gray-600">
            <i className="fa fa-copyright"></i> HEALTHCARE AI 2024
          </p>
          <p className="text-gray-600">Take Care of your health by AI</p>
        </div>
      </footer>
    </div>
  );
}

export default LoginDashboard;