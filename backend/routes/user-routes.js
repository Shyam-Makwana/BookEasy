const express = require("express");
const router = express.Router();
const { authToken, authType } = require('../middleware/check-auth');

const userController = require('../controllers/user-controllers');
const searchController = require('../controllers/search-controllers');
const bookingController = require('../controllers/booking-controllers');
const userProfileControllers = require('../controllers/user-profile-controllers');

router.post("/signup", userController.signup);
router.post("/login", authType, userController.login);
router.post("/reset-password", userController.resetPassword);
router.post("/new-password", userController.newPassword);
router.post("/firebase-auth", authType, userController.firebaseAuth);
router.get("/home", searchController.search);
router.get("/search", searchController.search);
router.get("/hotel/:id", searchController.getHotel);
router.post("/checkout", authToken, bookingController.checkout);
router.post("/pay", bookingController.pay);
router.post("/subscribe", userController.subscribe);
router.get("/dashboard", authToken, userProfileControllers.dashboard);
router.get("/booking-details", authToken, userProfileControllers.bookingDetails);
router.get("/current-bookings", authToken, userProfileControllers.currentBookings);
router.get("/get-profile", authToken, userProfileControllers.getProfile);
router.put("/update-profile", authToken, userProfileControllers.updateProfile);

module.exports = router;