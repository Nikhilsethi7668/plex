// src/components/CampaignTable.js

import React, { useState, useEffect } from "react";
import { deletedata, getCampaignData } from "../Service/Csvupload"; // Import API function
import { MdDelete } from "react-icons/md";

const CampaignTable = ({ refresh }) => {
    const [campaigns, setCampaigns] = useState();
    const [message, setMessage] = useState("");

    const deleteCampaign = async (id) => {

        try {
            await deletedata(id)
            fetchCampaignData();
            alert("Deleted Successfully Refresh Page")





        } catch (error) {
            alert("Please try again later");

        }

    }

    // Fetch campaign data from the backend
    const fetchCampaignData = async () => {
        try {
            const response = await getCampaignData();
            if (response.length && response[0]) {
                setCampaigns(response[0]); // Set campaigns data if available
            } else {
                setMessage("");
            }
        } catch (error) {
            setMessage("Error fetching campaign data");
            console.error("Error fetching campaigns:", error); // Log the error
        }
    };

    useEffect(() => {
        fetchCampaignData();
    }, [refresh]); // Empty dependency array to fetch data once on mount

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Campaign Data
            </h2>
            {message && (
                <p
                    className={`mt-4 text-sm ${message.toLowerCase().includes("error") ? "text-red-500" : "text-green-500"
                        }`}
                >
                    {message}
                </p>
            )}
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">PAN</th>
                        <th className="border border-gray-300 px-4 py-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Render campaign data if available */}
                    {campaigns && campaigns._id ?

                        <tr>
                            <td className="border border-gray-300 px-4 py-2">
                                {campaigns.firstName + " " + campaigns.lastName || "N/A"}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {campaigns.email || "N/A"}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {campaigns.PAN || "N/A"}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {campaigns.date
                                    ? new Date(campaigns.date).toLocaleDateString()
                                    : "N/A"}
                            </td>
                            <MdDelete className="text-3xl" onClick={() => deleteCampaign(campaigns._id)} />

                        </tr>

                        : (
                            <tr>
                                <td
                                    className="border border-gray-300 px-4 py-2 text-center"
                                    colSpan={4}
                                >
                                    No campaign data available.
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
};

export default CampaignTable;
