const express = require("express") ;
const { auth, firestore } = require("../services/firebase-service");
const router = express.Router();
const isAuthenticated = require("../middlewares/authorization-middleware.js");
const isTeacher = require("../middlewares/isTeacher-middleware.js");
const isStudent = require("../middlewares/isStudent-middleware.js");

// todo validation using external LIB


router.post("/",isAuthenticated,express.urlencoded(),(req,res)=>{

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
        // data = {...data,classroomIds : docRef.id}
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

router.get("/",isAuthenticated,express.urlencoded(),(req,res)=>{

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

router.patch("/",isAuthenticated,express.urlencoded(),(req,res)=>{

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

    firestore.collection('classroom').doc(req.body.classroomId).update(data)
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

router.post("/join",isAuthenticated,isStudent,(req,res)=>{
    // check if req already exists
    //  if yes res = failure,message:"already exists"
    // else add to joinRequests {classroomId,req.uid->student id}
    // check error


})

//accept join request API, POST classroom/student/accept
//accept join request API, POST classroom/student/reject
// isTeacher both
// inp->{student:id}
// delete from joinRequests, if accept add in enrolledStudent

// remove student request API, POST classroom/student/remove
// isTeacher
// inp->{student : id} remove student from enrolled student



router.get("/:id",isAuthenticated,express.urlencoded(), (req,res)=>{
    const classroomId = req.params.id;
    firestore.collection('classroom').doc(classroomId).get()
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