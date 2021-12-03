const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const user = express();

user.use(express.json);
user.use(cors);

user.post('/register', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2

    const user1 = new UserModel({
        name: name,
        email: email,
        password: password,
    })
    try {
        await user1.save();
        res.send('nirjal');
    }
    catch (err) {
        console.log(err);
    }
})

module.exports = user;

