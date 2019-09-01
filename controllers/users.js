'use strict';
var User = require('../models/users');

exports.index = function(req, res){
     User.getAllUsers(function(err, rows){
         if(err){
             res.json({
                code: 500,
                message: 'error',
                data: err,
             })
         }else{
            res.json({
                code: 200,
                message: 'success',
                data: rows
            })
         }
     });
}

exports.show = function(req, res){
    
}