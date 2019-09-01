'use strict';
const db            = require('../config/db.config.js')
const m_categories     = db.m_categories 
exports.index = function(req, res){
    m_categories.findAll().then( result => {
        var rows = {
            'rows' : result
        }
        res.send(rows)
    })
}

exports.detail = function(req, res) {
    var data = req.params
    m_categories.findOne(
        {
            where: {
                category_id : data.id
            }
        }
    ).then(result => {
        res.send(result)
    })
}