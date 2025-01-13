const crypto = require("crypto");

// Generate a random 256-bit (32-byte) secret key
const jwtSecret = crypto.randomBytes(32).toString("hex");

console.log("Your JWT Secret Key:", jwtSecret);
