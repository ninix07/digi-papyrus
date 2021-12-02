const express = require('express');
const mongoose = require('mongoose');
const app = express();

const UserModel = require('./models/Users')

app.use(express.json());

mongoose.connect("mongodb+srv://admin:admin@digidb.kumya.mongodb.net/digidb?retryWrites=true&w=majority", {
    useNewUrlParser: "true"
});

app.get('/', async (req, res) => {
    const user1 = new UserModel({
        username: "Nirjal",
        password: "sexy",
    })
    try{
        await user1.save();
        res.send("Data send")
    }
    catch(err){
        console.log(err)
    }
})


app.listen(5001, () => {
    console.log("server started");
})