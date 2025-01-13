const fs = require("fs");
const csvParser = require("csv-parser");
const Campaign = require("../models/Campaign");
const User = require("../models/User");

const processCSV = async (req, res) => {
  const filePath = req.file.path;
  const userId = req.user.id;

  try {
    const results = [];
    const validPANRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const panSet = new Set();

    const user = await User.findById(userId);

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => {
        if (!data.PAN || !validPANRegex.test(data.PAN)) {
          results.push({ ...data, error: "Invalid PAN Card Number" });
        } else if (panSet.has(data.PAN)) {
          results.push({ ...data, error: "Duplicate PAN Card Number" });
        } else {
          panSet.add(data.PAN);
          results.push({
            PAN: data.PAN,
            userId,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            error: null,
          });
        }
      })
      .on("end", async () => {
        // Filter out records with errors (Invalid or Duplicate PAN)
        const validData = results.filter((row) => !row.error);

        // Check for duplicate PAN numbers in the existing Campaign collection
        const existingPans = await Campaign.find({
          PAN: { $in: validData.map((data) => data.PAN) },
        }).select("PAN");

        const duplicatePans = validData.filter((data) =>
          existingPans.some((existing) => existing.PAN === data.PAN)
        );

        if (duplicatePans.length > 0) {
          return res.status(400).json({
            message: "Duplicate PAN number found",
            duplicatePans,
          });
        }

        const existingEmails = await Campaign.find({
          email: { $in: validData.map((data) => data.email) },
        });

        for (let data of validData) {
          const existingEmailRecord = existingEmails.find(
            (record) => record.email === data.email
          );

          if (existingEmailRecord) {
            await Campaign.findByIdAndUpdate(existingEmailRecord._id, data, {
              new: true,
            });
          } else {
            await Campaign.create(data);
          }
        }

        // Delete the uploaded file
        fs.unlinkSync(filePath);

        // Respond with appropriate message
        res.status(200).json({
          message: validData.length
            ? "CSV processed successfully"
            : "No valid entries found in the CSV file",
          results,
        });
      });
  } catch (err) {
    // Delete the uploaded file in case of error
    fs.unlinkSync(filePath);
    res.status(500).json({ message: "Error processing CSV file" });
  }
};
const deletedata = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const deletedCampaign = await Campaign.findByIdAndDelete(id);

    // Check if the record was found and deleted
    if (!deletedCampaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    // Respond with a success message
    res.status(200).json({
      message: "Campaign deleted successfully",
      deletedCampaign,
    });
  } catch (error) {
    // Error handling for unexpected issues
    console.error("Error deleting campaign:", error);
    res
      .status(500)
      .json({ message: "Error deleting campaign", error: error.message });
  }
};

module.exports = { processCSV, deletedata };
