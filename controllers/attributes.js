'use strict';
const db                    = require('../config/db.config.js')
const m_attributes          = db.m_attributes 
const m_attribute_value     = db.m_attribute_value
const m_product             = db.m_product
const m_product_attribute   = db.m_product_attribute

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

exports.values = function (req, res) {
    var data = req.params
    m_attributes.findOne({
        attributes: ['attribute_id',['name','attribute_name']],
        where: {
            attribute_id : data.id
        },include: [{
            model: m_attribute_value,
            as: 'attribute_value',
            attributes: ['attribute_value_id',['value','value']],
        }]
    }).then(result => {
        var rows = result.attribute_value
        res.send(rows)
    })
}

exports.inproduct = async function (req, res) {
    var data = req.params
    m_product.findOne({
        where: {
            product_id: data.id
        },include: [{
            model: m_product_attribute,
            include: [{
                model: m_attribute_value,
                as: 'attribute_value',
                attributes: ['attribute_value_id','value'],
                include: [{
                    model: m_attributes,
                    attributes: ['name']
                }]
            }]
        }]
    }).then(result => {
        if (result) {
            const rows = result.product_attributes.map(item => {
                return Object.assign({
                    attribute_name: item.attribute_value.value,
                    attribute_value_id: item.attribute_value.attribute_value_id,
                    attribute_value: item.attribute_value.attribute.name
                })
            })

            res.json(rows)
            // res.json(result)
        }
    })
}