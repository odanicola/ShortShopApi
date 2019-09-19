'use strict';
const db            = require('../config/db.config.js')
const m_department     = db.m_department 
exports.index = function(req, res){
    m_department.findAll().then( result => {
        res.status(200).json(result)
    })
}

exports.detail = function(req, res) {
    var data = req.params
    m_department.findOne(
        {
            where: {
                department_id : data.id
            }
        }
    ).then(result => {
        res.status(200).json(result)
    })
}