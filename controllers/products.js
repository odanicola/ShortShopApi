'use strict';
const db            = require('../config/db.config.js')
const m_product     = db.m_product 
exports.index = function(req, res){
    const page  = req.query.page || 1
    const pageSize = req.query.limit || 10
    const description_length = req.query.description_length || 200
    
    const offset        = parseInt((page-1) * pageSize)
    const limit         = parseInt(offset + pageSize)
    const lengthDesc    = parseInt(description_length)

    m_product.findAndCountAll({
        offset: offset,
        limit: limit
    }).then( result => {
        const rows = {
            paginationMeta: {
                currentPage: page,
                currentPageSize: limit,
                totalPages: Math.ceil(result.count / limit),
                totalRecords: result.count
            },
            rows: result.rows.map(item => {
                return Object.assign({
                    product_id: item.product_id,
                    name: item.name,
                    description: item.description.substring(0,lengthDesc),
                    price: item.price,
                    discounted_price: item.discounted_price,
                    thumbnail: item.thumbnail
                })
            })
        }
        
        res.send(rows)
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
        res.send(result)
    })
}

exports.search = function (req, res) {
    const page  = req.query.page || 1
    const pageSize = req.query.limit || 10
    const description_length = req.query.description_length || 200
    const query_string = req.query.query_string
    const all_words = req.query.all_words
    
    const offset        = parseInt((page-1) * pageSize)
    const limit         = parseInt(offset + pageSize)
    const lengthDesc    = parseInt(description_length)

    const whereObj = {}

    if (all_words == "on") {
        whereObj.where = {
            name: query_string
        }
    } else {
        whereObj.where = {
            name: {
                $like: '%' + query_string + '%'
            }
        }
    }

    m_product.findAndCountAll(whereObj,{
        offset: offset,
        limit: limit
    }).then( result => {
        const rows = {
            paginationMeta: {
                currentPage: page,
                currentPageSize: limit,
                totalPages: Math.ceil(result.count / limit),
                totalRecords: result.count
            },
            rows: result.rows.map(item => {
                return Object.assign({
                    product_id: item.product_id,
                    name: item.name,
                    description: item.description.substring(0,lengthDesc),
                    price: item.price,
                    discounted_price: item.discounted_price,
                    thumbnail: item.thumbnail
                })
            })
        }
        
        res.send(rows)
    })
}