var express = require('express');
const CryptoJS = require('crypto-js');
const Model = require('./models/model');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var fs = require("fs");
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 
const mongoose = require('mongoose')

const MONGODB_URI = 'mongodb+srv://user1:admin@cluster0.aradevr.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('connected');
})


app.post('/getPassword', async function (req, res) {
    // First read existing users.
    let pass = '';
    let data_pass=[];
    const data = Model.find({ email: req.body.email});
    if((await data).length > 0 ){
        for await (const doc of data) {
            data_pass = doc;
            if(doc['email']==req.body.email){
                pass = CryptoJS.AES.decrypt(doc['password'], "Ngodeinweb").toString(CryptoJS.enc.Utf8);
            }
            break;
        }
    }else{
        res.status(200).json({ status:0, message:'user not found' })
    }
    

    if(pass == req.body.password){
        res.status(200).json({ status:1, message: data_pass })
    }else{
        res.status(200).json({ status:2, message:'password doesnt matched!' })
    }

})

app.post('/registration', async function (req, res) {
    // First read existing users.
    let isDuplicate = 0;
   
    const for_duplicy = Model.find({ name: req.body.name});
    for await (const doc of for_duplicy) {
        if(doc['email']==req.body.email){
            isDuplicate = 1;
        }
        break;
    }
    
    if (!isDuplicate) {
        const enc = CryptoJS.AES.encrypt(req.body.password, "Ngodeinweb");
        const data = new Model({
            name: req.body.name,
            password: enc,
            test: req.body.test,
            email: req.body.email,
            course: req.body.course,
            created_date: Date()
        })
        try {
            const dataToSave = await data.save();
            res.status(200).json({status: 1})
        }
        catch (error) {
            res.status(400).json({ status: 0, message: error.message })
        }
    } else {
        res.status(400).json({ status: 2 ,message: "Email already Registered with us!" })
    }

})

const questionString = fs.readFileSync('./questions.json');
const questionsArray = JSON.parse(questionString);

app.get('/random', (req, res) => {
    const randomQuestion = questionsArray[(Math.floor(Math.random() * questionsArray.length))].question;

    return res.json({
        "question": randomQuestion
    });
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Server listening at http://localhost", host, port)
  
})