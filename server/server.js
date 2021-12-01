import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";

//App config
const app = express();
const port = process.env.PORT || 5000;
const connect_url = "mongodb+srv://admin:admin@cluster0.ibqem.mongodb.net/digipapyrusdb?retryWrites=true&w=majority"
//Middlewares

//DB config
mongoose.connect(connect_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})

//API Endpoint
app.get('/',(req,res)=>res.status(200).send('Hello theren'))
app.post('/digipapyrus/card',(req,res) =>{
    const dbCard = req.body;
    Cards.create(dbCard,(err,data)=>
    {
        if(err)
        {
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})
app.get('/digipapyrus/card',(req,res)=>{
    Cards.find((err,data)=>
    {
        if(err)
        {
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

//Listener
app.listen(port,()=> console.log(`Listening in local host: ${port}`))
