//imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const cookieParser = require('cookie-parser')
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv")
const nodemailer = require('nodemailer')
const validator = require("email-validator");


//importing schema
const UserModel = require('./models/signupUsermodel');

//for json used in api 
app.use(express.json());
app.use(cors())
app.use(cookieParser())
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

var transitionfrom;

app.post('/api/transition', async (req, res) => {
    const transitionPin = req.body.transitionPin;
    console.log(req.cookies.email)
    const email = req.cookies.email;
    UserModel.findOne({ email: email })
        .then(user => {
            if (transitionPin == user.otp) {
                if (transitionfrom === 'register') {
                    res.status(223).json({ error: "from register" })
                }
            }
            else if (transitionfrom === 'forget') {
                res.status(223).json({ error: "from forget" })
            }
            else {
                res.status(223).json({ error: "Wrong Transition Pin" })
            }
        })
})

app.post('/api/resend', async (req, res) => {
    console.log(req.cookies.email)
    const otp = otp_sender(req.cookies.email);
    UserModel.findOne({ email: req.cookies.email })
        .then(user => {
            UserModel.findById(user._id, (err, updatedOtp) => {
                updatedOtp.otp = otp;
                updatedOtp.save();
                console.log('saved')
            })
        })
})
function otp_sender(object) {
    const val = Math.floor(1000 + Math.random() * 9000);
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
    return val;
}
// app.use('/api',require('./routes/user'));
app.post('/api/register', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const hassPassword = bcrypt.hashSync(req.body.password, 10);
    const password2 = req.body.password2;
    res.cookie("email", "email")

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
                    console.log('here');
                    const user = new UserModel({
                        name: name,
                        email: email,
                        password: hassPassword,
                        otp: otp_sender(email),
                    })
                    user.save();
                }
            })
    }
})

app.post('/api/login', async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;
    console.log("Data Taken is  " + email + "   " + password)

    UserModel.findOne(({ email: email }))
        .then(user => {
            if (user) {
                // user exists
                const isMatch = bcrypt.compareSync(password, user.password);
                console.log(isMatch)
                if (isMatch) {
                    console.log('password matched')
                    return res.status(222).json({ error: "password matched" })
                }
                else {
                    console.log('incorrect password')
                    return res.status(222).json({ error: "Incorrect Password" })
                }
            }
            else {
                console.log('email not found')
                return res.status(222).json({ error: "Email not found" })
            }
        })
})
app.post('/api/forget', async (req, res) => {
    const email = req.body.email;
    res.cookie("email", email)
    if (!email) {
        return res.status(223).json({ error: 'Please fill the form' })
    };
    UserModel.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(223).json({ error: 'Email not found' })
            }
            else {
                transitionfrom = "forget";
                res.status(223).json({ error: '' })
                otp_sender(email);
            }
        })
})
app.post('/api/newpassword', async (req, res) => {
    const password = req.body.password;
    const password2 = req.body.password2;
    const email = req.cookies.email;
    if (password != password2) {
        console.log("Password not matched")
        return res.status(224).json({ error: "Password not matched" })
    }
    else if (password.length < 6) {
        console.log("Password too short")
        return res.status(224).json({ error: "Password too short" })
    }
    else {
        let hashedPass = bcrypt.hashSync(password, 10)
        res.status(224).json({ error: "" })
        try {
            UserModel.findOne({ email: email })
                .then((user) => {
                    UserModel.findById(user._id, (err, updatedPassword) => {
                        updatedPassword.password = hashedPass;
                        updatedPassword.save();
                        console.log('saved')
                    })
                }
                )
        }
        catch (err) {
            console.log(err)
        }
    }
})
app.get('/nirjal', (req, res) => {
    res.cookie("email", "sunnynirjal@gmail.com")
    res.send("cookooo")
})
//starts the server
app.listen(5000, () => {
    console.log("server started");
})