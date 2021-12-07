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
//url of mongodb atlas
const URL = "mongodb+srv://admin:admin@digidb.kumya.mongodb.net/digidb?retryWrites=true&w=majority"
mongoose.connect(URL, {
    useNewUrlParser: "true"
});

const message = {
    message1: ""
}
// app.use('/api',require('./routes/user'));
app.post('/api/register', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;

    if (!name || !email || !password || !password2) {
        message.message1 = "Please fill in all fields";
    }

    //checking password match
    else if (password !== password2) {
        message.message1 = "Password didn't match";
    }

    //checking password length
    else if (password.length < 6) {
        message.message1 = "Password must be 6 character long";
    }
    else if (!validator.validate(email)) {
        message.message1 = "Email not validated";
    }
    else {
        //search the given email in db
        UserModel.findOne({ email: email })
            .then(user => {
                if (user) {
                    // user exists
                    message.message1 = "Email already exist"
                }
                else {
                    var val = Math.floor(1000 + Math.random() * 9000);

                    //making a dchema
                    const user1 = new UserModel({
                        name: name,
                        email: email,
                        password: password,
                        otp: val,
                    })
                    user1.password = bcrypt.hashSync(user1.password, 10);
                    user1.otp = bcrypt.hashSync(user1.otp, 10);
                    try {
                        user1.save();
                        console.log('datasaved');
                        res.send('nirjal');
                    }
                    catch (err) {
                        console.log(err);
                    }
                }

            })
    }
    console.log(message.message1);
    app.get('/message', async (req, res) => {
        res.status(200).json(message);
    })
})
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