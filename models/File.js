const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }

});

//POst Middleware
fileSchema.post("save", async function(doc) { //jo bhi entry humari database mei save hui hai usi ko hum yahan
                                                //doc se refer kar rahe hai
                                                //means this middleware is triggered after a adocument is saved
    try{
        console.log("DOC", doc);

        //transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        //send mail
        let info = await transporter.sendMail({
            from:`Aditya`,
            to: doc.email,
            subject: "New File uploaded on Cloudinary",
            html: `<h2>Hello Jee</h2> <p> File Uploaded View Here: <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`,
        })

        console.log("INFO", info);

    }
    catch(error){
        console.error(error);
    }
})



module.exports = mongoose.model("File", fileSchema);
