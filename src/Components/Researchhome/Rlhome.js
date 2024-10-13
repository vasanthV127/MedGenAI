import React, { useState } from "react";

const Rlhome = () => {
  const [diseases, setDiseases] = useState("");
  const [numSamples, setNumSamples] = useState(100);
  const [syntheticData, setSyntheticData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://172.18.158.214:5002/generate_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        diseases: diseases.split(","),
        num_samples: numSamples,
      }),
    });
    const data = await response.json();
    setSyntheticData(data);
  };

  const handleDownloadCSV = () => {
    if (syntheticData.length > 0) {
      const csvContent = `data:text/csv;charset=utf-8,${Object.keys(
        syntheticData[0]
      ).join(",")}\n${syntheticData
        .map((row) => Object.values(row).join(","))
        .join("\n")}`;
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "synthetic_data.csv");
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Synthetic Data Generator
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2">
              Enter Diseases (comma-separated):
            </label>
            <input
              type="text"
              value={diseases}
              onChange={(e) => setDiseases(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Diabetes, Hypertension"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">
              Number of Samples:
            </label>
            <input
              type="number"
              value={numSamples}
              onChange={(e) => setNumSamples(e.target.value)}
              min="1"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="100"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Generate Synthetic Data
          </button>
        </form>

        <h2 className="text-2xl font-bold text-center text-gray-700 mt-10">
          Generated Synthetic Data:
        </h2>

        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                {syntheticData.length > 0 &&
                  Object.keys(syntheticData[0]).map((key) => (
                    <th
                      key={key}
                      className="text-left p-3 font-semibold text-gray-700"
                    >
                      {key}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {syntheticData.map((row, index) => (
                <tr key={index} className="border-t border-gray-200">
                  {Object.values(row).map((value, idx) => (
                    <td key={idx} className="p-3 text-gray-600">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {syntheticData.length > 0 && (
          <button
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold mt-6 hover:bg-green-700 transition duration-200"
            onClick={handleDownloadCSV}
          >
            Download as CSV
          </button>
        )}
      </div>
    </div>
  );
};

export default Rlhome;
