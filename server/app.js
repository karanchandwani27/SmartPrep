var express = require('express');
var app = express();
var fs = require("fs");
const mongoose = require('mongoose')

const MONGODB_URI = 'mongodb+srv://user1:admin@cluster0.aradevr.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
  
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', ()=>{
    console.log('connected');
})

app.post('/listUser/:id', function (req, res) {
   // First read existing users.

   console.log("hi");
    res.status(200).json({message: 'done'})
   
})

app.post('/addUser', function (req, res) {
    // First read existing users.
 
    console.log("hi");
     res.status(200).json({message: 'done'})
    
 })

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://localhost", host, port)
})