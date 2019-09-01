var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var verifyToken = require('./verify');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var User = require('../models/users');

var jwt = require('jsonwebtoken');
var config = require('../config/config');

exports.register = function(req, res){
    
    var new_user = new User(req.body)
    
    if(!new_user.email || !new_user.password){
        res.status(400).send({ error: true, message: "Please provide data!" })
    }else{
        User.getUser(new_user.email, function(err, userId){
            if (err) return res.status(500).send("There was a problem checking the user.");
            
            if(userId.length > 0){
                res.status(404).send('Email already taken.');
            }else{
                User.createUser(new_user, function(err, user){
                    if (err) return res.status(500).send("There was a problem registering the user.");
        
                    var token = jwt.sign({ id: user._id }, config.secret, {
                        expiresIn: 84600
                    });
            
                    res.status(200).send({ auth: true, token: token });
                })
            }
        });
        
    }
}