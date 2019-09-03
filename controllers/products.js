'use strict';
const db                    = require('../config/db.config.js')
const dateFormat            = require('dateformat')
const m_product             = db.m_product 
const m_product_category    = db.m_product_category
const m_categories          = db.m_categories
const m_department          = db.m_department
const m_reviews             = db.m_reviews

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
    const description_length = req.query.description_length || 200
    const lengthDesc    = parseInt(description_length)

    m_product.findOne(
        {
            where: {
                product_id : data.id
            }
        }
    ).then(result => {
        result.description = result.description.substring(0, lengthDesc)
        res.send(result)
    })
}

exports.category = function (req, res) {
    const data = req.params
    const page  = req.query.page || 1
    const pageSize = req.query.limit || 10
    const description_length = req.query.description_length || 200
    
    const offset        = parseInt((page-1) * pageSize)
    const limit         = parseInt(offset + pageSize)
    const lengthDesc    = parseInt(description_length)

    m_product.findAll({
        include:[{
            model: m_product_category,
            where: {
                category_id: data.id
            },
            attributes: []
        }]
    },{
        offset: offset,
        limit: limit
    }).then(result => {
        const rows = {
            rows: result.map(item => {
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

exports.department = function (req, res) {
    const data = req.params
    const page  = req.query.page || 1
    const pageSize = req.query.limit || 10
    const description_length = req.query.description_length || 200
    
    const offset        = parseInt((page-1) * pageSize)
    const limit         = parseInt(offset + pageSize)
    const lengthDesc    = parseInt(description_length)

    m_product.findAll({
        include: [{
            model: m_product_category,
            attributes: [],
            include: [{
                model: m_categories,
                as: 'category',
                attributes: [],
                include:[{
                    model: m_department,
                    as: 'department',
                    where: {
                        department_id: data.id
                    }
                }]
            }]
        }]
    },{
        offset: offset,
        limit: limit
    }).then(result => {
        const rows = {
            rows: result.map(item => {
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

exports.reviews = function (req, res) {
    const data = req.params

    m_product.findOne(
        {
            attributes: ['name'],
            where:{
                product_id: data.id
            },
            include: [{
                model: m_reviews,
            }]
        }
    ).then(result => {
        const data = result.reviews.map(item => {
            return Object.assign({
                name: result.name,
                review: item.review,
                rating: item.rating,
                created_on: new Date(item.created_on).toISOString().replace(/T/, ' ').replace(/\..+/, '') 
            })
        })
        res.send(data)        
    })
}