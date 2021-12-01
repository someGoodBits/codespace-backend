const express = require("express");
const router = express.Router();

// Middleware
const checkIfAuthenticated = require("../../middlewares/checkIfAuthenticated.js");

// Handler functions
const getUserProfile = require("./getUserProfile.js");
const updateUserProfile = require("./updateUserProfile.js")

router.use(express.urlencoded({ extended: true }));
router.use(checkIfAuthenticated);

// router to get user profile
router.get(
    "/profile",
    getUserProfile
);

// router to update user profile
router.patch(
	"/profile",
	updateUserProfile
);

module.exports = router;