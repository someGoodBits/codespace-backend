const express = require("express") ;
const { auth, firestore } = require("../services/firebase-service");
const router = express.Router();
const isAuthenticated = require("../middlewares/authorization-middleware.js");
const isTeacher = require("../middlewares/isTeacher-middleware.js");
const isStudent = require("../middlewares/isStudent-middleware.js");


// Validation, manually
// patch
// join route
// 


router.post("/",isAuthenticated,express.urlencoded(),(req,res)=>{

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
            message : snapshot.docs.map(doc => doc.data())
        })
    }).catch(error =>{
        console.error(error);
        res.status(400).json({
            status:"FAILURE",
            message : error.message
        })
    })
    
});



module.exports = router ;