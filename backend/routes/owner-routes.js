const express = require("express");
const router = express.Router();
const { authToken } = require('../middleware/check-auth');

const ownerController = require('../controllers/owner-controllers');

router.post("/add-hotel", authToken, ownerController.addHotel);

module.exports = router;