const express = require("express") ;
const { auth, firestore } = require("../../services/firebase-service");
const router = express.Router();

router.post("/",express.urlencoded({ extended: true }),(req,res)=>{
    auth.createUser({
        email : req.body.email,
        password : req.body.password,
        displayName : req.body.displayName
    }).then((user)=>{
        if(req.body.role === "TEACHER") {
            auth.setCustomUserClaims(user.uid,{isTeacher : true})

            firestore.doc(`users/${user.uid}`).set({
                role : req.body.role,
                displayName : req.body.displayName
            }).then(()=>{
                res.json({
                    status : "success",
                    message : {...user,isTeacher:true}
                })
            }).catch((error)=>{
                res.status(500).json({
                    status : "failure",
                    message : error.message
                })

                auth.deleteUser(user.uid).then(()=>{
                    console.log("USER DELETED");
                }).catch(error=>{
                    console.error(error.message)
                });
            }) ;


        } else if(req.body.role === "STUDENT"){
            auth.setCustomUserClaims(user.uid,{isStudent : true})
            let enrollmentNumber = req.body.enrollmentNumber || "" ;
            firestore.doc(`users/${user.uid}`).set({
                enrollmentNumber,
                role : req.body.role,
                displayName : req.body.displayName
            }).then(()=>{
                res.json({
                    status : "success",
                    message : {...user,isStudent:true}
                })
            }).catch((error)=>{
                res.status(500).json({
                    status : "failure",
                    message : error.message
                })

                auth.deleteUser(user.uid).then(()=>{
                    console.log("USER DELETED");
                }).catch(error=>{
                    console.error(error.message)
                });
            }) ;
        } else {
            res.status(400).json({
                status : "failure",
                message : "Invalid Role"
            })

            auth.deleteUser(user.uid).then(()=>{
                console.log("USER DELETED");
            }).catch(error=>{
                console.error(error.message)
            });
        }
    }).catch((error)=>{
        res.status(400).json({
            status : "failure",
            message : error.message
        })
    })
});

module.exports = router ;