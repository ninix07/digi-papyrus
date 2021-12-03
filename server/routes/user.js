const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const user = express();

user.use(express.json);
user.use(cors);


module.exports = user;

