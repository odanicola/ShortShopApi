'use strict';
const rows = [
    {
        'name' : "Christyan Arden Original Leather CA4124 Black - White Dial (Wanita)",
        'price' : "119.000,00",
        'desc' : "Test",
        'image': "https://live.staticflickr.com/65535/48584506247_9a40584063_k.jpg",
        'specs': "Case Diameter : 30 mm"
    },
    {
        'name' : "Ines",
        'price' : 200000,
        'desc' : "Test",
        'image' : "https://live.staticflickr.com/65535/48584583552_93119c37e1_k.jpg",
        'specs' : "Case Diameter : 30 mm"
    }
]
const db            = require('../config/db.config.js')
const m_watches     = db.m_watches 
exports.index = function(req, res){
    m_watches.findAll().then( result => {
        res.send(result)
    })
}