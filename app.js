var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

var expressValidator = require('express-validator')
app.use(expressValidator())

var methodOverride = require('method-override')
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

app.get('/', function (req, res) {
    res.json({
        text : 'Short Shop API'
    });
});

var routes = require('./routes/router');
routes(app);

module.exports=app;