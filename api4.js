const express = require("express");
const cors = require("cors");
const App = express();
userinfoApp.use(cors());
App.use(express.json());
const fs = require("fs");

//connect with mongodb database 
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/mern");
const db = mongoose.connection;
db.on("error", (error) => console.log("Error in database connection"));
db.on("open", () => console.log("Database is Connected..."));


const User = require("./userschema");


// CRUD - Create, Read, Update, Delete

// Read / Fetch 
// http://localhost:1234/userlist
App.get("/userlist", async function (req, res) {
    let allUser = await User.find(); // it fetch all data from myuser collection
    res.status(200).json(allUser);
    res.end();
})


// Create / save 
// http://localhost:1234/saveuser
App.post("/saveuser", async function (req, res) {
    let newUser = User({
        "fullname": req.body.name,
        "mobile": req.body.mobile,
        "city": req.body.city,
        "address": req.body.address,
        "email": req.body.email,
        "password": req.body.password
    });
    await newUser.save();
    res.status(200).json({ "message": "New user created" });
    res.end();
})


// Edit 
// http://localhost:1234/
App.get("/userinfo/:id", async function (req, res) {
    let userDetails = await User.findById(req.params.id);
    res.status(200).json(userDetails);
    res.end();
})



// Update 
// http://localhost:1234/updateuser
App.put("/updateuser", async function (req, res) {
    let userDetails = await User.findById(req.body.id); // fetch details from db based on id

    userDetails.fullname = req.body.name;
    userDetails.mobile = req.body.mobile;
    userDetails.city = req.body.city;
    userDetails.address = req.body.address;
    userDetails.email = req.body.email;
    userDetails.password = req.body.password;

    await userDetails.save(); // update in database
    res.status(200).json({ "message": "User Details Updated" });
    res.end();
})


// Delete 
// http://localhost:1234/deleteuser
App.delete("/deleteuser/:id", async function (req, res) {
    let userDetails = await User.findById(req.params.id); // check in db exists or not 
    await userDetails.deleteOne();
    res.status(200).json({ "message": "User Details Deleted" });
   res.end();
})


// http://localhost:1234
App.get("/", function (req, res) {
    res.send("<h1> Welcome to Nodejs </h1>");
    res.end();
})


// http://localhost:1234/book 
App.get("/book", function (req, res) {
    let booklist = ['html', 'css', 'mysql', 'php', 'nodejs', 'react'];
    res.send(booklist);
    res.end();
})


// http://localhost:1234/allbook
App.get("/allbook", function (req, res) {
    let booklist = [
        { name: "HTML", cost: 300 },
        { name: "CSS", cost: 400 },
        { name: "JavaScript", cost: 7878 },
        { name: "PHP", cost: 343 },
        { name: "MySql", cost: 2323 }
    ];
    res.send(booklist);
    res.end();
})

// file read write 
//http://localhost:1234/savemessage

App.post("/savemessage", function (req, res) {
    let userMessage = req.body.message + "\n";
    fs.appendFile("allmessage.txt", userMessage, (error) => {
        if (error) {
            res.status(200).json({ "info": "Error while storing data in a file" });
        } else {
            res.status(200).json({ "info": "Your message save successfully..." });
        }
    })
});

//http://localhost:1234/messagelist

App.get("/messagelist", function (req, res) {
    fs.readFile("allmessage.txt", 'utf8', function (error, fileData) {
        if (error) {
            res.status(200).json({ "info": "Error while reading data from file" });
        } else {
            res.setHeader('Content-Type', 'text/plain');
            res.status(200).send(fileData);
        }
    })
})

//http://localhost:1234/deletemessage
App.post("/deletemessage", function (req, res) {
    fs.writeFile("allmessage.txt", "", function (error) {
        if (error) {
            res.status(200).json({ "info": "Error while deleting message" });
        } else {
            res.status(200).send("All message deleted successfully...");
        }
    })
})


//http://localhost:1234/sendemail
App.post("/sendemail", function (req, res) {
    let toemail = req.body.toemail;
    let subject = req.body.subject;
    let message = req.body.message;

    let nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'youremail@gmail.com',
            pass: 'xxxx bbbb cccc hhhh' // xxxx bbbb cccc hhhh
        }
    });

    let mailOptions = {
        from: 'youremail@gmail.com',
        to: toemail,
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(200).json({ "info": "Error while sending email" });
        } else {
            res.status(200).json({ "info": "your email send successfully..." });
        }
    });
})


App.listen(1234, function () {
    console.log(`Server Started`);
});

