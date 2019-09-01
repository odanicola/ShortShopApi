'use strict';
const db            = require('../config/db.config.js')
const m_attributes     = db.m_attributes 
exports.index = function(req, res){
    m_attributes.findAll().then( result => {
        res.send(result)
    })
}

exports.detail = function(req, res) {
    var data = req.params
    m_attributes.findOne(
        {
            where: {
                attribute_id : data.id
            }
        }
    ).then(result => {
        res.send(result)
    })
}