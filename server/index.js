//imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv")
const nodemailer = require('nodemailer')
const validator = require("email-validator");


//importing schema
const UserModel = require('./models/signupUsermodel');
const { findOne } = require('./models/signupUsermodel');

//for json used in api 
app.use(express.json());
app.use(cors())
//url of mongodb atlas.
dotenv.config({ path: './config.env' })
const URL = process.env.URLDB;
mongoose.connect(URL, {
    useNewUrlParser: "true"
});


//for node mailer
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nirjal2003@gmail.com',
        pass: 'nirjal123@'
    }
});

var val;
var name;
var email;
var password;
app.post('/api/transition', async (req, res) => {
    transitionPin = req.body.transitionPin;
    if (transitionPin == val) {
        const user1 = new UserModel({
            name: name,
            email: email,
            password: password,
        })
        user1.password = bcrypt.hashSync(user1.password, 10);
        try {
            user1.save();
            console.log('datasaved');
        }
        catch (err) {
            console.log(err);
        }
    }
    else {
        console.log('Wrong transition pin')
    }

})
app.post('/api/resend', async (req, res) => {
    otp_sender(email)
})
// app.use('/api',require('./routes/user'));
app.post('/api/register', async (req, res) => {
    name = req.body.name;
    email = req.body.email;
    password = req.body.password;
    const password2 = req.body.password2;

    if (!name || !email || !password || !password2) {
        return res.status(221).json({ error: "Please fill in all fields" });
    }

    //checking password match
    else if (password !== password2) {
        return res.status(221).json({ error: "Password didn't match" });;
    }

    //checking password length
    else if (password.length < 6) {
        return res.status(221).json({ error: "Password must be 6 characters long." });
    }
    else if (!validator.validate(email)) {
        return res.status(221).json({ error: "Email not validated." });
    }
    else {
        //search the given email in db
        UserModel.findOne({ email: email })
            .then(user => {
                if (user) {
                    // user exists
                    return res.status(221).json({ error: "Email already exists." });
                }
                else {
                    res.status(221).json({ error: "" });
                    // console.log('here');
                    // otp_sender(email);
                }
            })
    }
})
function otp_sender(object) {
    val = Math.floor(1000 + Math.random() * 9000);
    //sending otp
    transporter.sendMail({
        from: 'nirjal2003@gmail.com',
        to: object,
        subject: 'OTP see OTP',
        html: `<h1>OTP : ${val}</h1>`
    },
        function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response)
            }
        })

}
app.post('/api/login', async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;
    console.log("Data Taken ie  " + email + "   " + password)

    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                // user exists
                const isMatch = bcrypt.compare(user.password, password);
                if (isMatch) {
                    console.log("password matched")
                }
                else {
                    console.log("not matched")
                }
            }
            else {
                console.log("emailnotregistered")
            }
        })
})


//starts the server
app.listen(5000, () => {
    console.log("server started");
})