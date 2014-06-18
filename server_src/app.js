var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var fs = require('fs');

var app = express();
app.use(bodyParser());

// code to allow cross domain resource sharing
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/', function(req, res) {
	console.log("getting");
    var data = fs.readFileSync('data.txt');
    console.log(data.toString('utf8'));

    res.send(data.toString('utf8'));
});

app.post('/', function(req, res) {
	console.log("posting...");
    var data = req.param("data");
    if(data){
    	console.log("~~~~~~~~~~~~~~ data~~~~~~~~~~~~~~");
    	console.log(data);
    	console.log("~~~~~~~~~~~~~~/data~~~~~~~~~~~~~~");
	    fs.writeFile('data.txt', data, function(err) {
	        if (err)
	            throw err;
	    });

   		res.send("saved");
	}else{
   		res.send("no data");

	}
});

module.exports = app;