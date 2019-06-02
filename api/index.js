var express = require('express');
var app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const bodyparser = require("body-parser")

//Connection with mongoDB
var db = mongoose.connect('mongodb://localhost:27017/vereda-avenger', { useNewUrlParser: true }, function(err, res){
    if(err) console.log('error')
    console.log('connection succesfull')
})

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
  }

app.use(cors(corsOptions));
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())
var routesApi = require('./routes/index')

app.listen( 3000, () => {
    app.use('/api', routesApi)
})

//error handlers
app.use(function(err, req, res, next) {
    if(err.name === 'UnauthorizedError') {
        res.status(401)
        res.json({
            "Message" : err.name + ": " + err.message
        })
    }
})