const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  // operatorsAliases: false,
  define: {
  	timestamps: false
  },
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  },
  timezone: '+07:00'
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
//Models/tables
db.m_department        = require('../models/m_department.model.js')(sequelize, Sequelize);
db.m_categories        = require('../models/m_categories.model.js')(sequelize, Sequelize);

module.exports = db;
