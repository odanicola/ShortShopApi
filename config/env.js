'use strict'

const env = {
    database: 't_short_shop',
    username: 'root',
    password: '',
    host    : '127.0.0.1',
    dialect : 'mariadb',
    pool    : {
      max     : 5,
      min     : 0,
      acquire : 30000,
      idle    : 10000
    },
    server: {
      host: '127.0.0.1',
      port: '3306'
    }
  };
   
  module.exports = env;
  