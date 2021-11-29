const express = require("express");
const router = express.Router();

// Middleware
const checkIfAuthenticated = require("../../middlewares/checkIfAuthenticated.js");

// Handler functions
const getUserProfile = require("./getUserProfile.js");
const updateUserProfile = require("./updateUserProfile.js")

router.use(express.urlencoded({ extended: true }));
router.use(checkIfAuthenticated);

router.get(
    "/profile",
    getUserProfile
);

router.patch(
	"/profile",
	updateUserProfile
);

module.exports = router;