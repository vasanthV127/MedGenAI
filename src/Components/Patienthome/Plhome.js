import React, { useState } from "react";
import axios from "axios";

const Plhome = () => {
  const [patientData, setPatientData] = useState("");
  const [medicalLiterature, setMedicalLiterature] = useState("");
  const [treatmentPlan, setTreatmentPlan] = useState("");
  const [error, setError] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientData || !medicalLiterature) {
      setError("Patient data and medical literature are required");
      return;
    }

    try {
      // Make POST request to Flask backend
      const response = await axios.post(
        "http://172.18.158.214:5001/personalize_treatment_plan",
        {
          patient_data: patientData,
          medical_literature: medicalLiterature,
        }
      );

      // Set the treatment plan from the response
      setTreatmentPlan(response.data.treatment_plan);
      setError(""); // Clear error message
    } catch (err) {
      setError("Error generating treatment plan. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Personalize Treatment Plan
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 space-y-6 max-w-lg mx-auto"
      >
        <div>
          <label className="block text-lg font-semibold mb-2">
            Patient Data:
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={patientData}
            onChange={(e) => setPatientData(e.target.value)}
            rows="4"
            placeholder="Enter patient data here..."
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">
            Medical Literature:
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={medicalLiterature}
            onChange={(e) => setMedicalLiterature(e.target.value)}
            rows="4"
            placeholder="Enter medical literature here..."
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold w-full hover:bg-blue-700 transition duration-200"
        >
          Generate Treatment Plan
        </button>
      </form>

      {error && <p className="text-red-500 text-center mt-6">{error}</p>}

      {treatmentPlan && (
        <div className="bg-green-100 p-6 mt-8 rounded-lg shadow-md max-w-lg mx-auto">
          <h2 className="text-xl font-bold text-green-700 mb-4">
            Generated Treatment Plan:
          </h2>
          <p className="p-4 bg-white border border-gray-200 rounded-lg">
            {treatmentPlan}
          </p>
        </div>
      )}
    </div>
  );
};

export default Plhome;
