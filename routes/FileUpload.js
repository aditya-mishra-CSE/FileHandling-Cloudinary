const express = require("express");
const router = express.Router();

//importing the handler

const {localFileUpload, imageUpload, videoUpload, imageSizeReducer} = require("../controllers/fileUpload");


//api route
router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload );
router.post("/videoUpload", videoUpload); 
router.post("/imageSizeReducer", imageSizeReducer);


//export
module.exports = router;