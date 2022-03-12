const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

app.use(cors());

// app routers
const codePlaygroundRouter = require("./routes/codePlayground");
const userRouter = require("./routes/user/userRouter.js.js");

app.use("/api/v1/playground", codePlaygroundRouter);
app.use("/api/v1/user", userRouter);

// Start Server
app.listen(PORT, () => {
    console.log(`Listening on PORT : ${PORT}`);
});
