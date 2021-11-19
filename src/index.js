const express = require("express") ;
const app = express();
const cors = require('cors')

require('dotenv').config()
const PORT = process.env.PORT || 3001 ;
app.use(cors());

// app routers
const signupRouter = require("./routes/signup/signupRouter");
const classroomRouter = require("./routes/classroom/classroomRouter");

app.use("/signup",signupRouter);
app.use("/classroom",classroomRouter);

// Start Server
app.listen(PORT,()=>{
    console.log(`Listening on PORT : ${PORT}`) ;
})