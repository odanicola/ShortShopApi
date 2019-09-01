'use strict';
const db                    = require('../config/db.config.js')
const m_categories          = db.m_categories 
const m_product_category    = db.m_product_category
const m_product             = db.m_product
const m_department          = db.m_department

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
        if (result) {
            res.send(result)
        } else {
            res.send({
                code: 404,
                message: "Data not found!"
            })
        }
        
    })
}

exports.inproduct = function(req, res) {
    var data = req.params
    m_product.findOne({
        attributes: ['product_category.category_id','name'],
        where: {
            product_id: data.id
        },
        include: [{
            model: m_product_category,
            as: 'product_category',
            attributes: [],
        }],
        raw: true
    }).then(result => {
        if (result) {
            m_categories.findOne({
                attributes: ['department_id'],
                where: {
                    category_id: result.category_id
                }
            }).then(resultCat => {
                var rows = {
                    category_id: result.category_id,
                    department_id: resultCat.department_id,
                    name: result.name,
                }
                res.send(rows)
            }) 
        } else {
            res.send({
                code: 404,
                message: "Data not found!"
            })
        }
    })
}

exports.indepartment = function(req, res) {
    var data = req.params

    m_department.findOne({
        where: {
            department_id: data.id
        },include: [{
            model: m_categories
        }]
    }).then(resultDept => {
      var categories = resultDept.categories
      res.send({
          rows: categories
      })
    })
}