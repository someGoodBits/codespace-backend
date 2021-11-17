const express = require("express") ;
const app = express();
require('dotenv').config()

const PORT = process.env.PORT || 3001 ;

// app routers
const signupRouter = require("./routes/signup-route") ;

app.use("/signup",express.urlencoded(),signupRouter);

// Start Server
app.listen(PORT,()=>{
    console.log(`Listening on PORT : ${PORT}`) ;
})