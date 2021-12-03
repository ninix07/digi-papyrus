const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();

const UserModel = require('./models/signupUsermodel')

app.use(express.json());
app.use(cors())

const URL = "mongodb+srv://admin:admin@digidb.kumya.mongodb.net/digidb?retryWrites=true&w=majority"
mongoose.connect(URL, {
    useNewUrlParser: "true"
});

app.post('/api/db', async (req, res) => {
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

app.listen(5000, () => {
    console.log("server started");
})