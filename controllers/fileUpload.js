const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localfileUpload -> Handler Function

exports.localFileUpload = async(req, res) => {
    try{

        //fetch file from request
        const file = req.files.file;

        console.log("FILE AAGYI JEE -> ", file);


        //__dirname indicates the current workiung directory
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}` ; //matlab kis path pr file store karna chahte hai server ke andar
        //matlab jo controllers ke andar files folder bana hai usme save hogi files
        console.log("PATH-> ", path)

        file.mv(path, (err) =>{ //mtlv file ko path ke andar move kr do aur agar koierror nahi aaya toh error ki value 
                                //null hogi aur agar error aaya toh woh print ho jayega
            console.log(err);
        });

        res.json({
            success:true,
            message:"Local File Uploaded Successfully"
        })



    }catch(error){
        console.log("Not able to upload the file on Server")
        console.log(error);
    }
}


function isFileTypeSupported(type, supportedTypes){ //iska matlab ki kya yeh type is supported array ke andar aata hai ya nahi
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    try {
        const options = { folder };
        console.log("temo file path", file.tempFilePath);
        if(quality){
            options.quality = quality;
        }
        options.resource_type = "auto";
        return await cloudinary.uploader.upload(file.tempFilePath, options);
    } 
    catch (error) {
        console.error("Cloudinary upload error:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}


//image upload handler
exports.imageUpload = async(req, res) => {
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }
        if (!file.tempFilePath) {
            return res.status(500).json({
                success: false,
                message: "Temporary file path is missing. Ensure express-fileupload is configured correctly.",
            });
        }

        //file format supported
        console.log("Uploaded to Codehelp");
        const response = await uploadFileToCloudinary(file, "Codehelp"); //codehelp folder mai upload krna hai 
        console.log(response);

        //db mei entry save krni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl: response.secure_url,
            message:'Image Successfully Uploaded'
        })
        
    

    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong",
            error:error.message
            
        })
    }
}


//video upload ka handler
exports.videoUpload = async(req, res) => {
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log(file);

        //Validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

         // Add size check
         const maxSize = 5 * 1024 * 1024; // 5MB in bytes
         if (file.size > maxSize && (fileType === "mp4" || fileType === "mov")) {
             return res.status(413).json({ // 413 Payload Too Large
                 success: false,
                 message: 'Video file size exceeds 5MB limit.',
             });
         }
 

        if (!file.tempFilePath) {
            return res.status(500).json({
                success: false,
                message: "Temporary file path is missing. Ensure express-fileupload is configured correctly.",
            });
        }

        //file format supported
       
        const response = await uploadFileToCloudinary(file, "Codehelp"); //codehelp folder mai upload krna hai 
        console.log("Uploaded to Codehelp");
        console.log(response);

        // db mei entry save krni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl: response.secure_url,
            message:'Video Successfully Uploaded'
        })
        
    

    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong",
            error:error.message
            
        })
    }
}


exports.imageSizeReducer = async(req, res) => {
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }
        if (!file.tempFilePath) {
            return res.status(500).json({
                success: false,
                message: "Temporary file path is missing. Ensure express-fileupload is configured correctly.",
            });
        }

        //file format supported
        console.log("Uploaded to Codehelp");
        const response = await uploadFileToCloudinary(file, "Codehelp", 30); //codehelp folder mai upload krna hai 
        console.log(response);

        //db mei entry save krni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl: response.secure_url,
            message:'Image Successfully Uploaded'
        })
        
    

    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong",
            error:error.message
            
        })
    }
}


