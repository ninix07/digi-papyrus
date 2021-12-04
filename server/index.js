//imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const bcrypt = require("bcryptjs");
const LocalStratgy = require('passport-local').Strategy;

//importing schema
const UserModel = require('./models/signupUsermodel')

//for json used in api
app.use(express.json());
app.use(cors())

//url of mongodb atlas
const URL = "mongodb+srv://admin:admin@digidb.kumya.mongodb.net/digidb?retryWrites=true&w=majority"
mongoose.connect(URL, {
    useNewUrlParser: "true"
});

// app.use('/api',require('./routes/user'));
app.post('/api/register', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    //search the given email in db
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                // user exists
                console.log("email already exist")
            }
            else {
                //making a dchema
                const user1 = new UserModel({
                    name: name,
                    email: email,
                    password: password,
                })
                user1.password = bcrypt.hash(user1.password, 12);
                try {
                    user1.save();
                    res.send('nirjal');
                }
                catch (err) {
                    console.log(err);
                }
            }
        })
})
app.post('/api/login', async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;

    UserModel.findOne({ email: email })
    .then(user => {
        if (user) {
            // user exists
            const isMatch  = bcrypt.compare(user.password, password);
            if(isMatch){
                console.log("password matched")
            }
            else{
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