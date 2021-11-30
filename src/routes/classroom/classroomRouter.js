const express = require("express");
const router = express.Router();
const multer = require('multer')
const uploadMiddleware = multer({storage: multer.memoryStorage()})

// Middlewares
const checkIfAuthenticated = require("../../middlewares/checkIfAuthenticated.js");
const checkIfClassroomExists = require("../../middlewares/checkIfClassroomExists.js");
const checkIfTeacherOwnsClassroom = require("../../middlewares/checkIfTeacherOwnsClassroom.js");
const checkIfUserIsTeacher = require("../../middlewares/checkIfUserIsTeacher.js");
const checkIfUserIsStudent = require("../../middlewares/checkIfUserIsStudent.js");
const checkIfPostExists = require("../../middlewares/checkIfPostExists.js")

// Handler Functions
const createClassroom = require("./createClassroom");
const updateClassroomDetails = require("./updateClassroomDetails");
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
const getJoinRequests = require("./getJoinRequests.js")



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
    checkIfTeacherOwnsClassroom, 
    updateClassroomDetails
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
    "/join", 
    checkIfUserTeacher, 
    checkIfClassroomExists, 
    checkIfTeacherOwnsClassroom,
    getJoinRequests
);


// route to reject join request
router.post(
    "/student/reject", 
    checkIfUserIsTeacher, 
    checkIfClassroomExists, 
    checkIfTeacherOwnsClassroom, 
    rejectJoinRequest
);

// route to accept join request
router.post(
    "/student/accept", 
    checkIfUserIsTeacher, 
    checkIfClassroomExists, 
    checkIfTeacherOwnsClassroom, 
    acceptJoinRequest
);

// router.post(
//     "/student/accept/all",
//     checkIfUserIsTeacher,
//     checkIfClassroomExists,
//     checkIfTeacherOwnsClassroom,
//     acceptAllJoinRequests
//     )

// router.post(
//     "/student/remove",
//     checkIfUserIsTeacher,
//     checkIfClassroomExists,
//     checkIfTeacherOwnsClassroom,
//     removeStudent
// );

router.get(
    "/post",
    checkIfUserIsTeacher,
    checkIfClassroomExists,
    checkIfTeacherOwnsClassroom,
    createPost
);

router.patch(
    "/post",
    checkIfUserIsTeacher,
    checkIfClassroomExists,
    checkIfTeacherOwnsClassroom,
    updatePostByID
);

router.get(
    "/post",
    checkIfClassroomExists,
    getAllPosts
);

router.get(
    "/post/:postID",
    checkIfClassroomExists,
    checkIfTeacherOwnsClassroom,
    getPostByID
);

router.delete(
    "/post/:postID",
    checkIfClassroomExists,
    checkIfTeacherOwnsClassroom,
    deletePostByID
);

router.post(
    "/upload",
    uploadMiddleware.single("file"),
    checkIfClassroomExists,
    uploadFile
);

router.delete(
    "/upload",
    uploadMiddleware.single("file"),
    checkIfClassroomExists,
    deleteFile
);

router.get(
    "/upload",
    checkIfClassroomExists,
    getSubmissions
);
// todo test 3 API below
router.post(
    "/post/allotPoints",
    checkIfUserIsTeacher,
    checkIfClassroomExists,
    checkIfTeacherOwnsClassroom,
    allotPoints
);

router.patch(
    "/post/publishPoints",
    checkIfUserIsTeacher,
    checkIfClassroomExists,
    checkIfTeacherOwnsClassroom,
    checkIfPostExists,
    publishPoints
);

router.get(
    "/post/getMarks",
    checkIfClassroomExists,
    checkIfPostExists,
    getPoints
);

router.get(
    "/join",
    checkIfUserIsTeacher,
    checkIfClassroomExists,
    checkIfTeacherOwnsClassroom,
    getJoinRequests
);




// route to get a classrom details by classroom id
router.post("/byID",checkIfClassroomExists, getClassroomByID);

module.exports = router;