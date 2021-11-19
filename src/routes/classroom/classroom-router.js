const express = require("express");
const router = express.Router();

// middlewares
const isAuthenticated = require("../../middlewares/authorization-middleware.js");
const isTeacher = require("../../middlewares/isTeacher-middleware.js");
const isStudent = require("../../middlewares/isStudent-middleware.js");
const checkIfClassroomExists = require("../../middlewares/checkIfClassroomExists.js");
const checkIfTeacherOwnsClassroom = require("../../middlewares/checkIfTeacherOwnsClassroom.js");

// handler functions
const createClassroom = require("./createClassroom");
const updateClassroomDetails = require("./updateClassroomDetails");
const createJoinRequest = require("./createJoinRequest");
const rejectJoinRequest = require("./rejectJoinRequest");
const acceptJoinRequest = require("./acceptJoinRequest");
const getClassroomByID = require("./getClassroomByID");
const getAllClassrooms = require("./getClassrooms");

// todo validation using external LIB

// router global middleware
router.use(express.urlencoded({ extended: true }));
router.use(isAuthenticated);

// route to create classroom
router.post("/",isTeacher,createClassroom);

// route to get all classroom
router.get("/", getAllClassrooms);

// route to update classroom details
router.patch(
    "/", 
    isTeacher,
    checkIfClassroomExists, 
    checkIfTeacherOwnsClassroom, 
    updateClassroomDetails
);

// route to create join requests
router.post(
    "/join", 
    isStudent, 
    checkIfClassroomExists, 
    createJoinRequest
);

// route to reject join request
router.post(
    "/student/reject", 
    isTeacher, 
    checkIfClassroomExists, 
    checkIfTeacherOwnsClassroom, 
    rejectJoinRequest
);

// route to accept join request
router.post(
    "/student/accept", 
    isTeacher, 
    checkIfClassroomExists, 
    checkIfTeacherOwnsClassroom, 
    acceptJoinRequest
);

// route to get a classrom details by classroom id
router.get("/:id", getClassroomByID);

module.exports = router;