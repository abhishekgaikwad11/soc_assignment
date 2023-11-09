const express = require('express')
const mongoose = require('mongoose')
const axios = require('axios');

const bodyParser = require("body-parser");

const url = 'mongodb://localhost/grocerydatabase'

const app = express()
//Read Json Body by using Express
app.use(express.json())

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', function(){
    console.log('mongodb database connected......')
})




const myRouter = require('./routes/grocery')
app.use('/grocery',myRouter)

const userRoutes = require('./routes/user');
app.use("/user", userRoutes);

app.listen(9000, function(){
    console.log('Server started')
})