const express = require("express");
const router = express.Router();
const multer = require('multer')
const uploadMiddleware = multer({storage: multer.memoryStorage()})

// Middlewares
const checkIfAuthenticated = require("../../middlewares/checkIfAuthenticated.js");
const checkIfUserOwnsCode = require("../../middlewares/checkIfUserOwnsCode.js");
const checkIfCodeExists = require("../../middlewares/checkIfCodeExists.js");

// Handler Functions
const createCode = require("./createCode.js");
const updateCodeByID = require("./updateCodeByID.js");
const getAllCodes = require("./getAllCodes.js");
const getCodeByID = require("./getCodeByID.js");
const deleteCodeByID = require("./deleteCodeByID.js");

// router global middleware
router.use(express.urlencoded({ extended: true }));
router.use(checkIfAuthenticated);

// route to get all classroom
router.get("/", getAllCodes);

// Route to create code
router.post(
    "/code",
    checkIfCodeExists,
    checkIfUserOwnsCode,
    createCode
);

// Route to update individual Code
router.patch(
    "/code",
    checkIfCodeExists,
    checkIfUserOwnsCode,
    updateCodeByID
);

// route to get all codes of a user
router.get(
    "/code",
    checkIfCodeExists,
    getAllCodes
);

// route to get individual code of classroom
router.get(
    "/code/:codeID",
    checkIfCodeExists,
    checkIfUserOwnsCode,
    getCodeByID
);

// route to delete individual code
router.delete(
    "/code/:codeID",
    checkIfCodeExists,
    checkIfUserOwnsCode,
    deleteCodeByID
);

module.exports = router;