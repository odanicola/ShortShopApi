'use strict';
const db            = require('../config/db.config.js')
const m_department     = db.m_department 
exports.index = function(req, res){
    m_department.findAll().then( result => {
        res.send(result)
    })
}