'use strict';
const db            = require('../config/db.config')
const m_customers   = db.m_customers
const bcrypt        = require('bcryptjs');
const SHA224        = require("sha224");
const md5           = require('md5');
const crypto        = require('crypto'), algorithm = 'aes-192-ccm', key = 'keykeykeykeykeykeykeykey';
const iv            = crypto.randomBytes(12);
const config        = require('../config/config');
const jwt           = require('jsonwebtoken');

exports.register = function (req, res) {
    const data = req.body
    const password = data.password

    if (!data.email || !data.password) {
        res.status(400).json({ error: true, message: "Please provide data"})
    } else {
        m_customers.count(
            {
                where: {
                    email: data.email
                }
            }
        ).then(result => {
            if (result > 0) {
                res.status(404).json("Email already taken!")
            } else {
                const aad = Buffer.from('0123456789', 'hex');
                const cipher = crypto.createCipheriv(algorithm,key, iv, {
                    authTagLength: 16
                })

                cipher.setAAD(aad, {
                    plaintextLength: Buffer.byteLength(password)
                });
                const ciphertext = cipher.update(password, 'utf8');
                cipher.final();

                const crypted = ciphertext.toString('hex')

                m_customers.create({
                    name: data.name,
                    email: data.email,
                    password: crypted,
                }).then( rCreate => {
                    if (rCreate) {
                        m_customers.findOne({
                            where: {
                                email: data.email
                            }, 
                            raw: true
                        }).then(rCustomer => {
                            const token = jwt.sign({ id: rCustomer.id }, config.secret, {
                                expiresIn: 84600
                            });

                            const decoded = jwt.decode(token, { complete: true })
                            const customer = rCustomer 
                            delete customer.password

                            res.status(201).json({customer: rCustomer, accessToken: token, expiresIn: decoded.payload.exp})
                        })
                    }
                })
            }
        })
    }
}