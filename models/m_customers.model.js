const sequelizePaginate = require('sequelize-paginate')
module.exports = (sequelize, Sequelize) => {
    const m_customers = sequelize.define('customer', {
      customer_id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      credit_card: {
        type: Sequelize.STRING
      },
      address_1: {
        type: Sequelize.STRING
      },
      address_2: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      region: {
        type: Sequelize.STRING
      },
      postal_code: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      shipping_region_id: {
        type: Sequelize.INTEGER
      },
      day_phone: {
        type: Sequelize.STRING
      },
      eve_phone: {
        type: Sequelize.STRING
      },
      mob_phone: {
        type: Sequelize.STRING
      }
    },{
      tableName: 'customer',
      underscored: true
    });
    
    return m_customers;
  }
  