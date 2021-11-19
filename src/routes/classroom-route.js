const express = require("express") ;
const { auth, firestore } = require("../services/firebase-service");
const router = express.Router();
const isAuthenticated = require("../middlewares/authorization-middleware.js");
const isTeacher = require("../middlewares/isTeacher-middleware.js");
const isStudent = require("../middlewares/isStudent-middleware.js");
const checkIfClassroomExists = require("../middlewares/checkIfClassroomExists.js")
const checkIfTeacherOwnsClassroom = require("../middlewares/checkIfTeacherOwnsClassroom.js")

// todo validation using external LIB

router.use(express.urlencoded());
router.use(isAuthenticated);


router.post("/",(req,res)=>{

    if(!req.body.classroomName || typeof req.body.classroomDescription === "string"){
        res.status(400).json({
            status:"FAILURE",
            message : "Invalid entries"
        })
        return;
    }
    var data = {};
    const time = Date.now();

    data = {
        owner:req.user.uid,
        classroomName:req.body.classroomName,
        classroomDescription:req.body.classroomDescription,
        createdAt : time, 
        updatedAt: time
    }

    firestore.collection('classroom').add(data)
    .then((docRef)=>{
        // data = {...data,classroomIDs : docRef.id}
        res.status(200).json({
            status:"success",
            message : data
        })
    }).catch(error =>{
        console.error(error);
        res.status(400).json({
            status:"FAILURE",
            message : error.message
        })
    })
    
});

router.get("/",(req,res)=>{

    firestore.collection('classroom').where("owner","==",req.user.uid).get()
    .then((snapshot)=>{

        res.status(200).json({
            status:"success",
            message : snapshot.docs.map(doc => ({...doc.data(),id:doc.id}))
        })
    }).catch(error =>{
        console.error(error);
        res.status(400).json({
            status:"FAILURE",
            message : error.message
        })
    })
    
});

router.patch("/",(req,res)=>{

    if(!req.body.classroomName || typeof req.body.classroomDescription === "string"){
        res.status(400).json({
            status:"FAILURE",
            message : "Invalid entries"
        })
        return;
    }

    var data = {
        classroomName:req.body.classroomName,
        classroomDescription:req.body.classroomDescription,
        updatedAt: Date.now()
    }

    firestore.collection('classroom').doc(req.body.classroomID).update(data)
    .then((docRef)=>{
        res.status(200).json({
            status:"success",
            message : data
        })
    }).catch(error =>{
        console.error(error);
        res.status(400).json({
            status:"FAILURE",
            message : error.message
        })
    })
})

router.post("/join",isStudent,checkIfClassroomExists,(req,res)=>{

    const classroomID = req.body.classroomID;

    firestore
    .collection('classroom')
    .doc(classroomID).collection('joinRequests')
    .doc(req.user.uid).get()
    .then(doc=>{
        if(doc.exists){
            res.status(400).json({
                status : "failure",
                message : "Join request already exists."
            })
        }
        else{
            firestore
            .collection('classroom')
            .doc(classroomID).collection('joinRequests')
            .doc(req.user.uid).set({
                createdAt : Date.now().toString()
            })
            .then(()=>{
                res.status(400).json({
                    status : "success",
                    message : "Join request sent"
                })
            })
            .catch((error)=>{
                console.error(error);
                res.status(400).json({
                    status : "failure",
                    message : "Unable to create join request."
                })
            });
            
        }
    })

})


router.post("/student/reject",isTeacher,checkIfClassroomExists,checkIfTeacherOwnsClassroom,(req,res)=>{
    // inp -> {studentID}
    const studentID = req.body.studentID
    const classroomID = req.body.classroomID

    if(!studentID){
        res.status(400).json({
            status :"failure",
            message : "Invalid studentID" 
        })
        return;
    }

    if(!classroomID){
        res.status(400).json({
            status :"failure",
            message : "Invalid classroomID" 
        })
        return;
    }

    firestore
    .collection('classroom')
    .doc(classroomID).collection('joinRequests')
    .doc(studentID).delete()
    .then(()=>{
        res.status(200).json({
            status : "success",
            message : "Join request rejected"
        })
    })
    .catch((error)=>{
        console.error(error);
        res.status(500).json({
            status :"failure",
            message : "Unable to reject join request" 
        })
    })
})


router.post("/student/accept",isTeacher,checkIfClassroomExists,checkIfTeacherOwnsClassroom,(req,res)=>{
    const studentID = req.body.studentID
    const classroomID = req.body.classroomID

    if(!studentID){
        res.status(400).json({
            status :"failure",
            message : "Invalid studentID" 
        })
        return;
    }

    if(!classroomID){
        res.status(400).json({
            status :"failure",
            message : "Invalid classroomID" 
        })
        return;
    }

    firestore
    .collection('classroom')
    .doc(classroomID).collection('joinRequests')
    .doc(studentID).get().then((joinReqDoc)=>{
        if(joinReqDoc.exists){
            firestore
            .collection('classroom')
            .doc(classroomID).collection('joinRequests')
            .doc(studentID).delete()
            .then(()=>{
                 firestore
                .collection('enrolledStudents')
                .doc(studentID)
                .get()
                .then((docRef)=>{
                    if(docRef.exists){
                        res.status(400).json({
                            status:"failure",
                            message:"Student already enrolled in class"
                        })
                    }else{
                        firestore
                        .collection('enrolledStudents')
                        .doc(studentID).set({
                            classroomID,
                            studentID
                        }).then(()=>{
                            res.status(200).json({
                                status : "success",
                                message : "Join request accepted"
                            })
                        })
                    }
                })
            })
            .catch((error)=>{
                console.error(error);
                res.status(500).json({
                    status :"failure",
                    message : "Unable to accept join request" 
                })
            })
        } else {
            res.status(400).json({
                status : "failure",
                message : "Unable to find Join request"
            })
        }
    })


    
})



router.get("/:id", (req,res)=>{
    const classroomID = req.params.id;
    firestore.collection('classroom').doc(classroomID).get()
    .then((docRef)=>{
        res.status(200).json({
            status : "success",
            message : docRef.data()
        })

    }).catch((error)=>{
        res.status(400).json({
            status : "FAILURE",
            message : error.message
        })
        
    });

})


module.exports = router ;