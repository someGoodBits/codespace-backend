const { firestore } = require("../../../services/firebase-service");

function follow(req,res){

    const time = Date.now();

    const data = {
        who:req.body.who,
        whom:req.body.whom,
        createdAt:time
    }

    firestore
    .collection('follows')
    .add(data)
    .then((docRef)=>{

        res.status(200).json({
            status:'success',
            message:'Followed Successfully'
        })
    })
    .catch(error=>{

        console.error(error);
        res.status(500).json({
            status:'failure',
            message:error.message
        })
    })
}

module.exports = follow;