const express = require("express");
const multer = require("multer");
const { processCSV, deletedata } = require("../controllers/csvController");
const { protect } = require("../middleware/authMiddleware");
const Campaign = require("../models/Campaign");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload-campaign", protect, upload.single("file"), processCSV);
router.delete("/delete/:id", deletedata);

router.get("/campaigns", protect, async (req, res) => {
  try {
    const campaigns = await Campaign.find({ userId: req.user.id }).populate(
      "userId",
      "firstName lastName"
    ); // Populate user data (firstName, lastName)

    const formattedCampaigns = campaigns.map((campaign) => ({
      _id: campaign._id,
      PAN: campaign.PAN,
      firstName: campaign.firstName,
      lastName: campaign.lastName,
      date: campaign.date,
      userFirstName: campaign.userId.firstName,
      userLastName: campaign.userId.lastName,
    }));
    console.log(formattedCampaigns);

    res.status(200).json(formattedCampaigns); // Return formatted data
  } catch (error) {
    res.status(500).json({ message: "Error fetching campaigns" });
  }
});

module.exports = router;
