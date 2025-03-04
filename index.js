//app create
const express = require("express");
const app = express();
require("dotenv").config();

//port find krni hai
const PORT = process.env.PORT || 4000;

//middleware add karni hai 
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/' //You can specify a custom temp directory.
}));

//DB se connect karna hai
const dbConnect = require("./config/database");
dbConnect();

//cloud se connect karna hai 
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mount karna hai
const Upload = require("./routes/FileUpload")
app.use("/api/v1/upload", Upload);

//activate server
app.listen(PORT, ()=> {
    console.log(`Server is successfully running at ${PORT}`);
})

//default route
app.get("/", (req, res) => {
    res.send(`<h1>This is my HOMEPAGE</h1>`)
})