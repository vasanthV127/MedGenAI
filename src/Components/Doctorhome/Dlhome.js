import React, { useState } from "react";
import axios from "axios";

const Dlhome = () => {
  const [patientInfo, setPatientInfo] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [diagnosis, setDiagnosis] = useState("");

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1: Upload the image
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const uploadResponse = await axios.post(
        "http://localhost:5000/upload_image",
        formData
      );
      const imagePath = uploadResponse.data.filepath;

      // Step 2: Send patient info, symptoms, and the uploaded image path to get diagnosis
      const diagnosisResponse = await axios.post(
        "http://localhost:5000/multimodal_diagnosis",
        {
          patient_info: patientInfo,
          symptoms: symptoms,
          image_path: imagePath,
        }
      );

      setDiagnosis(diagnosisResponse.data.diagnosis);
    } catch (error) {
      console.error("Error fetching diagnosis:", error);
      setDiagnosis("Error occurred while fetching diagnosis.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Multimodal AI Diagnosis
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-semibold mb-2">
              Patient Information:
            </label>
            <textarea
              value={patientInfo}
              onChange={(e) => setPatientInfo(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter patient details"
              rows="4"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Symptoms:</label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter symptoms"
              rows="4"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">
              Medical Image:
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Get Diagnosis
          </button>
        </form>
        {diagnosis && (
          <div className="mt-6">
            <h3 className="text-xl font-bold">Diagnosis:</h3>
            <p className="p-4 bg-gray-100 border border-gray-300 rounded-lg mt-2">
              {diagnosis}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dlhome;
