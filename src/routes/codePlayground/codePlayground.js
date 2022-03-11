const express = require("express");
const router = express.Router();
const multer = require('multer')
const uploadMiddleware = multer({storage: multer.memoryStorage()})

// Middlewares
const checkIfAuthenticated = require("../../middlewares/checkIfAuthenticated.js");
const checkIfUserOwnsCode = require("../../middlewares/checkIfUserOwnsCode.js");
const checkIfPostExists = require("../../middlewares/checkIfCodeExists.js");

// Handler Functions
const createCm = require("./createClassroom");
const updateClassroomDetails = require("./updateClassroomDetails");
const deleteClassroom = require("./deleteClassroom.js");
const createJoinRequest = require("./createJoinRequest");
const rejectJoinRequest = require("./rejectJoinRequest");
const acceptJoinRequest = require("./acceptJoinRequest");
const getClassroomByID = require("./getClassroomByID");
const getAllClassrooms = require("./getClassrooms");
const removeStudent = require("./removeStudent.js");
const createPost = require("./createPost.js");
const updatePostByID = require("./updatePostByID.js");
const getAllPosts = require("./getAllPosts.js");
const getPostByID = require("./getPostByID.js");
const deletePostByID = require("./deletePostByID.js");
const uploadFile = require("./uploadFile.js");
const deleteFile = require("./deleteFile.js");
const getSubmissions = require("./getSubmissions.js");
const allotPoints = require("./allotPoints.js");
const publishPoints = require("./publishPoints.js");
const getPoints = require("./getPoints.js");
const getJoinRequests = require("./getJoinRequests.js");
const getStudents = require("./getStudents.js");



// TODO validation using external LIB

// router global middleware
router.use(express.urlencoded({ extended: true }));
router.use(checkIfAuthenticated);

// route to create classroom
router.post("/",checkIfUserIsTeacher,createClassroom);

// route to get all classroom
router.get("/", getAllClassrooms);

// route to update classroom details
router.patch(
    "/", 
    checkIfUserIsTeacher,
    checkIfClassroomExists, 
    checkIfUserOwnsCode, 
    updateClassroomDetails
);

// router to delete classroom
router.delete(
    "/", 
    checkIfUserIsTeacher,
    checkIfClassroomExists, 
    checkIfUserOwnsCode, 
    deleteClassroom
);

// route to create join requests
router.post(
    "/join", 
    checkIfUserIsStudent, 
    checkIfClassroomExists, 
    createJoinRequest
);

// route to get all join requests
router.get(
    "/requests", 
    checkIfUserIsTeacher, 
    checkIfClassroomExists, 
    checkIfUserOwnsCode,
    getJoinRequests
);

// route to get all students in a classroom
router.get(
    "/students", 
    checkIfUserIsTeacher, 
    checkIfClassroomExists, 
    checkIfUserOwnsCode, 
    getStudents
);

// route to reject join request
router.post(
    "/student/reject", 
    checkIfUserIsTeacher, 
    checkIfClassroomExists, 
    checkIfUserOwnsCode, 
    rejectJoinRequest
);


// route to accept join request
router.post(
    "/student/accept", 
    checkIfUserIsTeacher, 
    checkIfClassroomExists, 
    checkIfUserOwnsCode, 
    acceptJoinRequest
);

// router.post(
//     "/student/accept/all",
//     checkIfUserIsTeacher,
//     checkIfClassroomExists,
//     checkIfTeacherOwnsClassroom,
//     acceptAllJoinRequests
//     )

// Route to remove student from class
router.delete(
    "/student/remove",
    checkIfUserIsTeacher,
    checkIfClassroomExists,
    checkIfUserOwnsCode,
    removeStudent
);

// Route to create post
router.post(
    "/post",
    checkIfUserIsTeacher,
    checkIfClassroomExists,
    checkIfUserOwnsCode,
    createPost
);

// Route to update individual post
router.patch(
    "/post",
    checkIfUserIsTeacher,
    checkIfClassroomExists,
    checkIfUserOwnsCode,
    updatePostByID
);

// route to get all posts of a classroom
router.get(
    "/post",
    checkIfClassroomExists,
    getAllPosts
);

// route to get individual post of classroom
router.get(
    "/post/:postID",
    checkIfClassroomExists,
    checkIfUserOwnsCode,
    getPostByID
);

// route to delete individual post
router.delete(
    "/post/:postID",
    checkIfClassroomExists,
    checkIfUserOwnsCode,
    deletePostByID
);

// route to upload file
router.post(
    "/upload",
    uploadMiddleware.single("file"),
    checkIfClassroomExists,
    uploadFile
);

// route to delete file
router.delete(
    "/upload",
    uploadMiddleware.single("file"),
    checkIfClassroomExists,
    deleteFile
);

// route to get submission. If teacher, get all submission on the post.
// if student, get only submission of student
router.get(
    "/upload",
    checkIfClassroomExists,
    getSubmissions
);

// todo test 3 API below

// route to allot points to specific student in specific post
router.post(
    "/post/allotPoints",
    checkIfUserIsTeacher,
    checkIfClassroomExists,
    checkIfUserOwnsCode,
    allotPoints
);

// route to set publishPoints as true
router.patch(
    "/post/publishPoints",
    checkIfUserIsTeacher,
    checkIfClassroomExists,
    checkIfUserOwnsCode,
    checkIfPostExists,
    publishPoints
);

// route to get points of individual student on a specific post
router.get(
    "/post/getMarks",
    checkIfClassroomExists,
    checkIfPostExists,
    getPoints
);

// route to get all join requests
router.get(
    "/join",
    checkIfUserIsTeacher,
    checkIfClassroomExists,
    checkIfUserOwnsCode,
    getJoinRequests
);




// route to get a classrom details by classroom id
router.post("/byID",checkIfClassroomExists, getClassroomByID);

module.exports = router;