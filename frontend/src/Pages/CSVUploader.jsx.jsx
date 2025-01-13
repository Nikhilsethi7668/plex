// src/components/CSVUploader.js

import React, { useState } from "react";
import { uploadFile } from "../Service/Csvupload"; // Import upload function
import CampaignTable from "../Components/CampaignTable";


const CSVUploader = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    // Handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle file upload
    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file first.");
            return;
        }

        try {
            const response = await uploadFile(file);
            if (response && response.message) {
                setMessage(response.message || "File uploaded successfully!");
            } else {
                setMessage("Unexpected response from server.");
            }
        } catch (error) {
            setMessage(error.message || "Error uploading file.");
            console.error("Upload error:", error); // Log the error
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Upload Campaign CSV
                </h2>
                <div className="flex flex-col space-y-4">
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleUpload}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Upload
                    </button>
                </div>
                {message && (
                    <p
                        className={`mt-4 text-sm ${message.toLowerCase().includes("error") ? "text-red-500" : "text-green-500"
                            }`}
                    >
                        {message}
                    </p>
                )}
            </div>

            {/* Display campaign table */}
            <CampaignTable refresh={message} />
        </div>
    );
};

export default CSVUploader;
