const express = require("express") ;
const app = express();
require('dotenv').config()
const cors = require('cors')
const isAuthenticated = require("./middlewares/authorization-middleware.js");




const PORT = process.env.PORT || 3001 ;
app.use(cors());

// app routers
const signupRouter = require("./routes/signup-route");
const classroomRouter = require("./routes/classroom-route.js");

app.use("/signup",express.urlencoded(),signupRouter);
app.use("/classroom",classroomRouter);

// Start Server
app.listen(PORT,()=>{
    console.log(`Listening on PORT : ${PORT}`) ;
})