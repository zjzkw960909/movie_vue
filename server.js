var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var model = require('./model/model');
var upload = require('./model/upload');

app.use(bodyParser.urlencoded({extended: false})); //解析post
app.use(bodyParser.json());//解析json


upload(app);
model(app, 'graph');
model(app, 'graphDetail');

var ip = 3300;
var server = app.listen(ip, () => {
    console.log(`now listen ip = ${ip}`);
});
