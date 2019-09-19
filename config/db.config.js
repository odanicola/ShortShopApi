const env = require('./env.js');
 
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const operatorsAliases = {
  $like: Op.like,
  $not: Op.not
}
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  define: {
    charset: 'utf8mb4',
  	timestamps: false
  },
  dialect: env.dialect,
  dialectOptions: {
      collate: 'utf8mb4_general_ci',
      useUTC: false, //for reading from database
      dateStrings: true,
      typeCast: function (field, next) { // for reading from database
        if (field.type === 'DATETIME') {
          return field.string()
        }
          return next()
      },
      timezone: 'Etc/GMT-7',
  },
  // operatorsAliases: false,
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  },
  timezone: 'Etc/GMT-7',
  operatorsAliases,
  logging: false
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
//Models/tables
db.m_department        = require('../models/m_department.model.js')(sequelize, Sequelize);
db.m_categories        = require('../models/m_categories.model.js')(sequelize, Sequelize);
db.m_product           = require('../models/m_product.model.js')(sequelize, Sequelize);
db.m_product_category  = require('../models/m_product_category.model.js')(sequelize, Sequelize);
db.m_product_attribute = require('../models/m_product_attribute.model.js')(sequelize, Sequelize);
db.m_attributes        = require('../models/m_attributes.model.js')(sequelize, Sequelize);
db.m_attribute_value   = require('../models/m_attribute_value.model.js')(sequelize, Sequelize);
db.m_reviews           = require('../models/m_reviews.model.js')(sequelize, Sequelize);
db.m_customers          = require('../models/m_customers.model.js')(sequelize, Sequelize);

//Relations
db.m_product.hasOne(db.m_product_category, { foreignKey: 'product_id'})
db.m_product.hasMany(db.m_product_attribute, { foreignKey: 'product_id'})
db.m_product.hasMany(db.m_reviews, { foreignKey: 'product_id'})
db.m_product_category.belongsTo(db.m_categories, { as: 'category', foreignKey: 'category_id'})
db.m_product_attribute.belongsTo(db.m_attribute_value, { as: 'attribute_value',  foreignKey: 'attribute_value_id'})
db.m_categories.hasMany(db.m_product_category, { as: 'product_category', foreignKey: 'category_id'})
db.m_categories.belongsTo(db.m_department, { as:'department', foreignKey: 'department_id'})
db.m_department.hasMany(db.m_categories, { foreignKey: 'department_id'} )
db.m_attributes.hasMany(db.m_attribute_value, { as: 'attribute_value', foreignKey: 'attribute_id'})
db.m_attribute_value.belongsTo(db.m_attributes, { foreignKey: 'attribute_id'})

module.exports = db;
