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
var transitionfrom;
app.post('/api/transition', async (req, res) => {
    transitionPin = req.body.transitionPin;
    if (transitionPin == val) {
        if (transitionfrom === 'register') {

            const user1 = new UserModel({
                name: name,
                email: email,
                password: password,
            })
            try {
                user1.save();
                console.log('datasaved');
                res.status(223).json({ error: "from register" })
            }
            catch (err) {
                console.log(err);
            }
        }
        else if (transitionfrom === 'forget') {
            res.status(223).json({ error: "from forget" })
        }
    }
    else {
        res.status(223).json({ error: "Wrong Transition Pin" })
    }

})
app.post('/api/resend', async (req, res) => {
    otp_sender(email)
})
// app.use('/api',require('./routes/user'));
app.post('/api/register', async (req, res) => {
    name = req.body.name;
    email = req.body.email;
    password = bcrypt.hashSync(req.body.password, 10);
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
                    console.log('here');
                    otp_sender(email);
                    transitionfrom = "signup"
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
                console.log('email not gound')
                return res.status(222).json({ error: "Email not found" })
            }
        })
})
app.post('/api/forget', async (req, res) => {
    email = req.body.email;
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
}
)

//starts the server
app.listen(5000, () => {
    console.log("server started");
})