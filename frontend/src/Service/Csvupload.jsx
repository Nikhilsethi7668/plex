import axios from "./Api";

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    // Get the token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("No token found, please log in.");
    }

    try {
        const response = await axios.post("/api/csv/upload-campaign", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`, // Add the token to the headers
            },
        });

        return response.data; // Return the data if upload is successful

    } catch (error) {
        // Handle error responses from the server
        if (error.response) {
            const { data } = error.response;

            if (data.message && data.message === "Duplicate PAN number found") {
                // Handle duplicate PAN error
                console.error("Duplicate PAN numbers found:", data.duplicatePans);
                throw new Error("Duplicate PAN numbers found. Please check the uploaded file.");
            }

            // Handle other server-side errors
            console.error("Server error:", data.message || error.response.statusText);
            throw new Error(data.message || "An error occurred while uploading the file.");
        } else if (error.request) {
            // No response from the server
            console.error("No response from server:", error.request);
            throw new Error("No response from the server.");
        } else {
            // Other errors
            console.error("Error setting up the request:", error.message);
            throw new Error("An unexpected error occurred.");
        }
    }
};

export const getCampaignData = async () => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("No token found, please log in.");
    }

    try {
        const response = await axios.get("api/csv/campaigns", {
            headers: {
                Authorization: `Bearer ${token}`, // Add the token to the headers
            },
        });

        return response.data; // Return the data from the API response

    } catch (error) {
        // Handle errors
        if (error.response) {
            // Server responded with an error
            console.error("Error from server:", error.response.data);
            throw new Error(error.response.data.message || "An error occurred while fetching campaign data.");
        } else if (error.request) {
            // No response from the server
            console.error("No response received:", error.request);
            throw new Error("No response from the server.");
        } else {
            // Other errors
            console.error("Error setting up the request:", error.message);
            throw new Error("An unexpected error occurred.");
        }
    }
};
export const deletedata = async (id) => {
    try {
        const response = await axios.delete(`/api/csv/delete/${id}`);
        console.log("Data deleted successfully:", response.data);
    } catch (error) {
        console.error("Error deleting data:", error.response?.data || error.message);
    }

}



